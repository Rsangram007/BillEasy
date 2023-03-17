const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const cors= require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
//app.use("/api")
mongoose
  .connect(
    "mongodb+srv://Rsangram890:hPZbgpmJvegZil8Q@cluster0.osqcdhn.mongodb.net/Jaykisan?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(
    () => console.log("MongoDb is connected"),
    (err) => console.log(err)
  );

const { Department, Employee } = require("./models/models");


app.get("/",async(req,res)=>{
  res.send("Hello")
})



app.post("/employees", async (req, res) => {
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
app.post("/departments", async (req, res) => {
  const { name, location, employeeCount } = req.body;
  const department = new Department({ name, location, employeeCount });
  await department.save();
  res.send(department);
});

// get employee data with join from department table
app.get("/api/employees/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id).populate(
    "departmentId"
  );
  if (!employee)
    return res.status(404).send("Employee with given ID not found.");
  res.send(employee);
});

// get all employee details in a department based on time range filter along with department filter
app.get("/employees-by-department", async (req, res) => {
  const { departmentId, from, to } = req.query;
  const employees = await Employee.find({
    departmentId,
    dateOfJoining: { $gte: new Date(from), $lte: new Date(to) },
  });
  res.send(employees);
});

// // if (process.env.NODE_ENV == 'production') {
// //   const path = require('path')


//   app.get("*", function (_, res) {
//       res.sendFile(
//           path.join(__dirname, "../client/build/index.html"),
//           function (err) {
//               if (err) {
//                   res.status(500).send(err)
//               }
//           }
//       )
//   })
// //}




app.listen(3000, () => {
  console.log("API server is running on port 3000");
});
