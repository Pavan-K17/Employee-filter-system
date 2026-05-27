import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [employees, setEmployees] = useState([]);

  const [filters, setFilters] = useState({
    department: "",
    status: "",
    city: "",
    search: ""
  });

  const fetchEmployees = async () => {

    try {

      const response = await axios.post(
        "http://localhost:9090/api/employees/filter?page=0&size=20",
        filters
      );

      setEmployees(response.data.content);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {

    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >

      {/* FILTER SIDEBAR */}

      <div
        style={{
          width: "250px",
          padding: "20px",
          borderRight: "1px solid #ddd",
          backgroundColor: "#f8f8f8"
        }}
      >

        <h2>Filters</h2>

        {/* SEARCH */}

        <div style={{ marginBottom: "20px" }}>

          <label>Search</label>

          <input
            type="text"
            name="search"
            placeholder="Search name/city"
            value={filters.search}
            onChange={handleChange}
            style={inputStyle}
          />

        </div>

        {/* DEPARTMENT */}

        <div style={{ marginBottom: "20px" }}>

          <label>Department</label>

          <select
            name="department"
            value={filters.department}
            onChange={handleChange}
            style={inputStyle}
          >

            <option value="">All</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>

          </select>

        </div>

        {/* STATUS */}

        <div style={{ marginBottom: "20px" }}>

          <label>Status</label>

          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            style={inputStyle}
          >

            <option value="">All</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>

          </select>

        </div>

        {/* CITY */}

        <div style={{ marginBottom: "20px" }}>

          <label>City</label>

          <select
            name="city"
            value={filters.city}
            onChange={handleChange}
            style={inputStyle}
          >

            <option value="">All</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>

          </select>

        </div>

        {/* BUTTON */}

        <button
          onClick={fetchEmployees}
          style={buttonStyle}
        >
          Apply Filters
        </button>

      </div>

      {/* EMPLOYEE TABLE */}

      <div
        style={{
          flex: 1,
          padding: "20px"
        }}
      >

        <h1>Employee Dashboard</h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px"
          }}
        >

          <thead>

            <tr
              style={{
                backgroundColor: "#222",
                color: "white"
              }}
            >

              <th style={thStyle}>ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Department</th>
              <th style={thStyle}>Salary</th>
              <th style={thStyle}>Experience</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>City</th>

            </tr>

          </thead>

          <tbody>

            {employees.map((employee) => (

              <tr key={employee.id}>

                <td style={tdStyle}>{employee.id}</td>
                <td style={tdStyle}>{employee.name}</td>
                <td style={tdStyle}>{employee.department}</td>
                <td style={tdStyle}>{employee.salary}</td>
                <td style={tdStyle}>{employee.experience}</td>
                <td style={tdStyle}>{employee.status}</td>
                <td style={tdStyle}>{employee.city}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

/* STYLES */

const inputStyle = {

  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};

const buttonStyle = {

  width: "100%",
  padding: "12px",
  backgroundColor: "#ff9900",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold"
};

const thStyle = {

  padding: "12px",
  textAlign: "left"
};

const tdStyle = {

  padding: "12px",
  borderBottom: "1px solid #ddd"
};

export default App;