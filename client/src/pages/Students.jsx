import React, { useState, useEffect } from "react";
import { FaUserPlus, FaSearch, FaEdit, FaTrash, FaSave } from "react-icons/fa";
import axios from "axios";
import Settings from "./Settings";
import { FaQrcode } from "react-icons/fa";

import { Link } from "react-router-dom";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [creatingNew, setCreatingNew] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isStatusVisible, setIsStatusVisible] = useState(false);
  const [validationError, setValidationError] = useState(""); // State for validation error

  // Fetch students from the API on component mount
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/students")
      .then((response) => {
        console.log("Students:", response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const isFormValid = Object.values(students).every((field) => field !== "");

    if (!isFormValid) {
      setValidationError("Please fill out all fields.");
      return;
    }

  // Fetch students from the API on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = (search = "") => {
    axios
      .get(`http://127.0.0.1:8000/api/students/search?search=${search}`)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    fetchStudents(value);
  };

  const handleAddRow = () => {
    setStudents([
      ...students,
      {
        student_name: "",
        student_id: "",
        serial_number: "",
        pc_brand: "",
        pc_color: "",
        phoneNumber: "",
        email: "",
        status: "in",
      },
    ]);
    setEditingIndex(students.length);
    setCreatingNew(true);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const updatedStudents = [...students];
    updatedStudents[index] = { ...updatedStudents[index], [name]: value };
    setStudents(updatedStudents);
  };

  const handleSave = (index) => {
    const student = students[index];

    const formData = {
      student_id: student.student_id,
      serial_number: student.serial_number,
      pc_brand: student.pc_brand,
      pc_color: student.pc_color,
      student_name: student.student_name,
      phoneNumber: student.phoneNumber,
      email: student.email,
      status: student.status,
    };

    if (creatingNew) {
      axios
        .post("http://127.0.0.1:8000/api/students/register", formData)
        .then((response) => {
          const updatedStudents = [
            ...students.slice(0, index),
            response.data,
            ...students.slice(index + 1),
          ];
          setStudents(updatedStudents);
          setEditingIndex(null);
          setCreatingNew(false);
        })
        .catch((error) => {
          console.error("Error creating student:", error);
        });
    } else {
      axios
        .put(`http://127.0.0.1:8000/api/students/${editId}`, formData)
        .then(() => {
          setStudents((prevStudents) =>
            prevStudents.map((student, i) =>
              i === index ? { ...student, ...formData } : student
            )
          );
          setEditingIndex(null);
        })
        .catch((error) => {
          console.error("Error updating student:", error);
        });
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    const editId = students[index].student_id;
    setEditId(editId);
    setCreatingNew(false);
  };

  const handleDelete = (index) => {
    const studentId = students[index].student_id;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`http://127.0.0.1:8000/api/students/${studentId}`)
      .then(() => {
        const updatedStudents = students.filter((_, i) => i !== index);
        setStudents(updatedStudents);
      })
      .catch((error) => {
        console.error("Error deleting student:", error);
      });
  };

  return (
    <div className="navbar min-h-screen p-4">
      <div className="flex items-center justify-end mb-8 space-x-2">
        <FaUserPlus
          className=" text-2xl cursor-pointer hover:text-blue-400 transition duration-300"
          title="Add New"
          aria-label="Add New Student"
          onClick={handleAddRow}
        />
        <div className="relative flex items-center navbar rounded-lg border border-blue-500">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 navbar rounded-lg placeholder-blue-300 w-64 h-10 flex-1 border-none outline-none focus:border-blue-500 focus:ring-0 transition duration-300"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <FaSearch className=" ml-2 cursor-pointer h-10 mr-2" />
        </div>
      </div>
 {/* Display validation error message */}
 {validationError && (
        <p className="text-red-500 text-center mb-4">{validationError}</p>
      )}
      <div className="navbar p-6 rounded-lg shadow-lg relative">
        <div className="overflow-x-auto">
          <div className="shadow-2xl p-2 rounded-lg">
            <table className="min-w-full text-left navbar border-collapse">
              <thead>
                <tr className="border-b border-blue-500">
                  <th className="p-3 border-b border-blue-500">#</th>
                  <th className="p-3 border-b border-blue-500">Name</th>
                  <th className="p-3 border-b border-blue-500">ID Number</th>
                  <th className="p-3 border-b border-blue-500">
                    PC Serial Number
                  </th>
                  <th className="p-3 border-b border-blue-500">PC Brand</th>
                  <th className="p-3 border-b border-blue-500">PC Color</th>
                  <th className="p-3 border-b border-blue-500">Phone NO</th>
                  <th className="p-3 border-b border-blue-500">Email</th>
                  <th className="p-3 border-b border-blue-500">Status</th>{" "}
                  {/* New Status Column */}
                  <th className="p-3 border-b border-blue-500">Action</th>
                  {/* <th className="p-3 border-b border-blue-500">Qrcode</th> */}
                  {/* //Qrcomponents */}
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  students
                    .filter((student) =>
                      (student.student_name || '')
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    
    //                 students.filter((student) => 
    // (student.student_name || '').toLowerCase().includes(searchTerm.toLowerCase())
    //               );
                  
                    .map((student, index) => (
                      <tr
                        key={student.id || index}
                        className={`navbar border-b border-blue-500 ${
                          index === editingIndex ? "bg-[#002B6C]" : ""
                        }`}
                      >
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="student_name"
                            value={student.student_name}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="student_id"
                            value={student.student_id}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="serial_number"
                            value={student.serial_number}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="pc_brand"
                            value={student.pc_brand}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="pc_color"
                            value={student.pc_color}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="text"
                            name="phoneNumber"
                            value={student.phoneNumber}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="email"
                            name="email"
                            value={student.email}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          />
                        </td>
                        <td className="p-2">
                          <select
                            name="status"
                            value={student.status}
                            onChange={(event) =>
                              handleInputChange(event, index)
                            }
                            className="navbar p-2 rounded-lg border-none w-full"
                            disabled={index !== editingIndex}
                          >
                            <option value="in">In</option>
                            <option value="out">Out</option>
                          </select>
                        </td>
                        <td className="p-2 flex justify-start space-x-2">
                          {index === editingIndex ? (
                            <button
                              onClick={() => handleSave(index)}
                              className="text-green-300"
                            >
                              Save
                            </button>
                          ) : (
                            <FaEdit
                              className="text-yellow-300 cursor-pointer hover:text-yellow-400"
                              onClick={() => handleEdit(index)}
                            />
                          )}
                          <FaTrash
                            className="text-red-300 cursor-pointer hover:text-red-400"
                            onClick={() => handleDelete(index)}
                          />
                          <td className="p-2 flex justify-start space-x-2">
                            <Link to={`/qrpage/${student.serial_number}`}>
                              <FaQrcode title="Generate QR Code" />
                            </Link>
                          </td>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
