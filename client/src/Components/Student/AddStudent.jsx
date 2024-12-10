import React, { useState } from 'react';


const AddNewStudentForm = ({ isOpen, onClose }) => {
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentID, setStudentID] = useState('');
  const [pcSerial, setPcSerial] = useState('');
  const [pcBrand, setPcBrand] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = { studentName, studentEmail, studentID, studentPassword, pcSerial, pcBrand };

    
    console.log('Submitting:', newStudent);
   
    onClose(); 
  };

  if (!isOpen) return null; 


return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#001F3D] text-black p-6 rounded-lg shadow-lg w-[470px]">
        <h2 className="text-xl text-[#CCFFFF]  mb-4">Add New Student for PC Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF] font-bold">Student Full Name:</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              className="border-none rounded-md p-2 w-96"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF]  font-bold">Student Email:</label>
            <input 
              type="email"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              required
              className="border-none rounded-md p-2 w-96"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF]  font-bold">Student ID:</label>
            <input
              type="text"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              required
              className="border-none rounded-md p-2 w-96"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF]  font-bold">Student Pc Serial:</label>
            <input
              type="password"
              value={pcSerial}
              onChange={(e) => setPcSerial(e.target.value)}
              required
              className="border-none rounded-md p-2 w-96"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-[#CCFFFF]  font-bold">Student Pc Brand:</label>
            <input
              type="password"
              value={ pcBrand }
              onChange={(e) => setPcBrand(e.target.value)}
              required
              className="border-none rounded-md p-2 w-96"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-[#005F8F] p-2 rounded-md w-28 font-semibold text-[#CCFFFF]">Add Student</button>
            <button type="button" onClick={onClose} className="bg-[#005F8F] p-1 w-28  font-semibold rounded-md text-[#CCFFFF]">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewStudentForm ;

