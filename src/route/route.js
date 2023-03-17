const router = require("express").Router()
const { Department, Employee } = require("../models/models");
// get all employee details in a department based on time range filter along with department filter
router.get("/employees-by-department", async (req, res) => {
    const { departmentId, from, to } = req.query;
    const employees = await Employee.find({
      departmentId,
      dateOfJoining: { $gte: new Date(from), $lte: new Date(to) },
    });
    res.send(employees);
  });


  router.post("/employees", async (req, res) => {
    const { firstName, lastName, email, departmentId, dateOfJoining, salary } =
      req.body;
    const employee = new Employee({
      firstName,
      lastName,
      email,
      departmentId,
      dateOfJoining,
      salary,
    });
    await employee.save();
    res.send(employee);
  });
  
  // create a new department
  router.post("/departments", async (req, res) => {
    const { name, location, employeeCount } = req.body;
    const department = new Department({ name, location, employeeCount });
    await department.save();
    res.send(department);
  });
  
  // get employee data with join from department table
  router.get("/api/employees/:id", async (req, res) => {
    const employee = await Employee.findById(req.params.id).populate(
      "departmentId"
    );
    if (!employee)
      return res.status(404).send("Employee with given ID not found.");
    res.send(employee);
  });


module.exports=router