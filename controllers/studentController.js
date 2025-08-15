const STUDENT = require("../models/studentSchema");

const createStudent = async (req, res) => {
  const { userId } = req.user;

  const { firstName, lastName, gender, classGrade } = req.body;

  if (!firstName || !lastName || !gender || !classGrade) {
    res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const student = await STUDENT.create({
      firstName,
      lastName,
      gender,
      classGrade,
      admin: userId,
    });
    res.status(201).json({
      success: true,
      message: "Student Successfully Registered",
      data: student,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllStudent = async (req, res) => {
  try {
    const student = await STUDENT.find().sort("-createdAt");
    res
      .status(200)
      .json({ success: true, count: student.length, data: student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await STUDENT.findByIdAndUpdate(studentId, req.body, {
      runValidators: true,
      new: true,
    });

    if (!student) {
      return res.status(404).json({ success: false, message: error.message });
    }
    return res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteStudent = async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await STUDENT.findByIdAndDelete(studentId);

    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student Not Found" });
    }
    return res.status(200).json({
      success: true,
      message: "Student data has been deleted successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createStudent,
  getAllStudent,
  updateStudent,
  deleteStudent,
};
