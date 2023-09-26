import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import UpdateStudent from './UpdateStudent';

const AdminHome = ()  => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [statusCode, setStatusCode] = useState(0); // Assuming an initial value of 0
  const [message, setMessage] = useState(' ');  // status message
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // called once after intial render
    fetchStudents();
  }, [] )


  const fetchStudents = () => {
		//TODO complete this method to fetch students and display list of students
    fetch('http://localhost:8080/students')
      .then(response => response.json()) 
      .then(data => {
        // sets list of students
        setStudents(data);
      })
    .catch(err => console.log(err));
  }

  // add student
  const  addStudent = (newStudent) => {
    setMessage('');
    console.log("start addStudent"); 
    
    fetch('http://localhost:8080/student',{ 
      method: 'POST',
      headers: {  'Content-Type': 'application/json', }, 
      body: JSON.stringify(newStudent)
    })
      .then(res => {
        if (res.ok) {
          console.log("addStudent ok");
          setMessage("Student added.");
          fetchStudents(); // Fetch students again to update the list
        } else {
          console.log('error addStudent ' + res.status);
          setMessage("Error. "+res.status);
        }})
      .catch(err => {
        console.error("exception addStudent "+ err);
        setMessage("Exception. "+err);
    })
  }

  // update student
  const  updateStudent = (editedStudent) => {
    setMessage('');
    console.log("start updateStudent"); 
    
    fetch(`http://localhost:8080/student/${editedStudent.student_id}`,{ 
      method: 'PUT',
      headers: {  'Content-Type': 'application/json', }, 
      body: JSON.stringify(editedStudent)
    })
      .then(res => {
        console.log(editedStudent);
        if (res.ok) {
          console.log("updateStudent ok");
          setMessage("Student updated.");
          fetchStudents(); // Fetch students again to update the list
        } else {
          console.log('error updateStudent ' + res.status);
          setMessage("Error. "+res.status);
        }})
      .catch(err => {
        console.error("exception updateStudent "+ err);
        setMessage("Exception. "+err);
    })
  }

  // delete a Student
  const deleteStudent = (studentId) => {
    setMessage('');
    console.log('start deleteStudent', studentId);
    
    fetch(`http://localhost:8080/student/${studentId}`, {
      method: 'DELETE',
    })
    .then(res => {
      if (res.ok) {
        console.log("delete ok");
        setMessage("Student deleted.");
        fetchStudents(); // Fetch students again to update the list
      } else {
        console.log('error deleteStudent ' + res.status);
        setMessage('Error. ' + res.status);
      }
    })
    .catch( (err) => {
      console.log("exception deleteStudent "+err);
      setMessage("Exception. "+err);
    });
  } 

  const headers = ['Student ID', 'Name', 'Email', 'Status Code', 'Status']; 

  return (
    <div> 
      <div margin="auto" >
        <h3>Student List</h3>
        <h4>{message}</h4>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <table>
            <thead>
              <tr>
                {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.statusCode}</td>
                  <td>{student.status}</td>
                  <td><UpdateStudent student={student} updateStudent={updateStudent} /></td>
                  <td><button type="button" margin="auto" onClick={() => deleteStudent(student.student_id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AddStudent addStudent={addStudent} />
      </div>
    </div>
  )
}

export default AdminHome;