const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Defining the schema for the school annual report
const schoolAnnualReportSchema = new Schema({
  schoolName: {
    type: String,
    required: true,
  },
  academicYear: {
    type: String,
    required: true,  // e.g., "2023-2024"
  },
  totalStudents: {
    type: Number,
    required: true,
    min: 0,
  },
  totalTeachers: {
    type: Number,
    required: true,
    min: 0,
  },
  totalExpenses: {
    type: Number,
    required: true,
    min: 0,
  },
  totalRevenue: {
    type: Number,
    required: true,
    min: 0,
  },
  studentPerformance: [
    {
      studentId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      grade: {
        type: String,
        required: true,
        enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],  // Grading scale
      },
      totalMarks: {
        type: Number,
        required: true,
        min: 0,
      },
      attendancePercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
    }
  ],
  teacherPerformance: [
    {
      teacherId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      totalClassesTaught: {
        type: Number,
        required: true,
        min: 0,
      },
      averageStudentFeedback: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
    }
  ],
  additionalNotes: {
    type: String,
    default: "",  // Optional field
  },
  image: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
        : v,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

// Creating the model for school annual report schema
const SchoolAnnualReport = mongoose.model("SchoolAnnualReport", schoolAnnualReportSchema);

module.exports = SchoolAnnualReport;
