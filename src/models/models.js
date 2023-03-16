const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  employeeCount: { type: Number, default: 0 },
});

const employeeSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  departmentId: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  dateOfJoining: { type: Date, required: true },
  salary: { type: Number, required: true },
});

const Department = mongoose.model("Department", departmentSchema);
const Employee = mongoose.model("Employee", employeeSchema);
module.exports = { Department, Employee };
