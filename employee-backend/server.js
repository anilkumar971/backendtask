const express = require('express');
const app = express();
const PORT = 5000;


let employees = [
    { id: 1, name: "Doe", email: "john@example.com" },
    { id: 2, name: " Smith", email: "jane@example.com" },
];


app.use(express.json());

app.get('/employees', (req, res) => {
    res.json(employees);
});

// Get employee by ID
app.get('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const employee = employees.find(emp => emp.id === id);
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
});

// Create a new employee
app.post('/employees', (req, res) => {
    const { name, email } = req.body;
    const newEmployee = { id: employees.length + 1, name, email };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
});

// Update an employee's details
app.put('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;
    const employee = employees.find(emp => emp.id === id);

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    employee.name = name || employee.name;
    employee.email = email || employee.email;
    res.json(employee);
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = employees.findIndex(emp => emp.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    employees.splice(index, 1);
    res.json({ message: 'Employee deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
