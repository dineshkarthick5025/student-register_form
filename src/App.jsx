// src/App.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import './App.css';
import qrCodeImage from './payment with qr.jpg'; // Import your QR code image

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    regNo: '',
    workshopPaid: 'no',
    semFeePaid: 'no'
  });

  // Fetch data from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'students'), (snapshot) => {
      const studentList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setStudents(studentList);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'students'), {
        name: formData.name,
        regNo: formData.regNo,
        workshopPaid: formData.workshopPaid,
        semFeePaid: formData.semFeePaid,
        createdAt: new Date()
      });
      // Reset form
      setFormData({
        name: '',
        regNo: '',
        workshopPaid: 'no',
        semFeePaid: 'no'
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Update here (register no: 54 to 64)</h1>
      
      <div className="form-container">
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Registration Number:</label>
            <input
              type="text"
              name="regNo"
              value={formData.regNo}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Workshop Amount Paid:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="workshopPaid"
                  value="yes"
                  checked={formData.workshopPaid === 'yes'}
                  onChange={handleChange}
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="workshopPaid"
                  value="no"
                  checked={formData.workshopPaid === 'no'}
                  onChange={handleChange}
                /> No
              </label>
            </div>
            {/* QR Code is ALWAYS visible in the form */}
            <div className="qr-code-container">
              <p>Scan this QR code to make payment:</p>
              <img src={qrCodeImage} alt="Payment QR Code" className="qr-code" />
            </div>
          </div>
          
          <div className="form-group">
            <label>Semester Fee Paid proof submitted?:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="semFeePaid"
                  value="yes"
                  checked={formData.semFeePaid === 'yes'}
                  onChange={handleChange}
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="semFeePaid"
                  value="no"
                  checked={formData.semFeePaid === 'no'}
                  onChange={handleChange}
                /> No
              </label>
            </div>
          </div>
          
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
      
      <div className="table-container">
        <h2>Records</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Reg No.</th>
              <th>Workshop Paid</th>
              <th>Sem Fee Paid</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.regNo}</td>
                <td className={student.workshopPaid === 'yes' ? 'paid' : 'not-paid'}>
                  {student.workshopPaid}
                </td>
                <td className={student.semFeePaid === 'yes' ? 'paid' : 'not-paid'}>
                  {student.semFeePaid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;