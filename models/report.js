
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    schoolName: String,
    academicYear: String,
    totalStudents: Number,
    totalTeachers: Number,
    totalExpenses: Number,
    totalRevenue: Number,
    studentPerformance: [
        {
            studentId: String,
            name: String,
            grade: String,
            totalMarks: Number,
            attendancePercentage: Number
        }
    ],
    teacherPerformance: [
        {
            teacherId: String,
            name: String,
            subject: String,
            totalClassesTaught: Number,
            averageStudentFeedback: Number
        }
    ],
    location: String,
    country: String,
    image: String,
    price: Number
});

module.exports = mongoose.model('Report', reportSchema);
