import React, { useEffect, useState } from 'react'
import "./App.css"

const App = () => {

  const [employeData, setEmployeData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentEmployees = employeData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(employeData.length / rowsPerPage);


  const fetchData = async () => {
    try {
      const res = await fetch(" https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      const data = await res.json()
      setEmployeData(data)
    } catch (error) {
      console.error(error)
      alert("failed to fetch data")
    }
  }
  useEffect(() => {
    fetchData()
  }, [])
  
  return (
    <main>
      <h1>Employee Data table</h1>
      <table>
        <thead>
        <tr className='table-head' >
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
        </thead>
        <tbody>
        {currentEmployees.map((employee, index) => (
          <tr className='table-data' key={index}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.role}</td>
        </tr>
        ))}
        </tbody>
      </table>

      <div className='Paginatin'>
        <button 
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => prev - 1)}
        >Previous</button>
        <span>{currentPage}</span>
        <button
        disabled={currentPage === totalPages }
        onClick={() => setCurrentPage(next => next + 1)}
        >Next</button>
      </div>
    </main>
  )
}

export default App