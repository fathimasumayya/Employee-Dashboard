import React, { useState, useEffect } from "react";
import axios from "axios";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get("http://localhost:3001/employees");
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  const handleCreate = async () => {
    const response = await axios.post("http://localhost:3001/employees", {
      name,
      email,
      phone,
    });
    setEmployees([...employees, response.data]);
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setName(employee.name);
    setEmail(employee.email);
    setPhone(employee.phone);
  };

  const handleUpdate = async () => {
    const response = await axios.put(
      `http://localhost:3001/employees/${editingEmployee._id}`,
      {
        name,
        email,
        phone,
      }
    );
    setEmployees(
      employees.map((emp) =>
        emp._id === editingEmployee._id ? response.data : emp
      )
    );
    setEditingEmployee(null);
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/employees/${id}`);
    setEmployees(employees.filter((emp) => emp._id !== id));
  };

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name} - {employee.email} - {employee.phone}
            <button
              className="btn btn-primary w-20 rounded-0"
              onClick={() => handleEdit(employee)}
            >
              Edit
            </button>
            <button
              className="btn btn-warning w-20 rounded-0"
              onClick={() => handleDelete(employee._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      {editingEmployee ? (
        <button
          className="btn btn-primary w-20 rounded-0"
          onClick={handleUpdate}
        >
          Update
        </button>
      ) : (
        <button
          className="btn btn-success w-20 rounded-0"
          onClick={handleCreate}
        >
          Create
        </button>
      )}
    </div>
  );
};

export default Employee;
