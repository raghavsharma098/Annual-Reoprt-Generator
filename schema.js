const Joi = require('joi');

// Define your listing schema using Joi
const listingSchema = Joi.object({
    schoolName: Joi.string().required(),
    academicYear: Joi.string().required(),
    totalStudents: Joi.number().integer().min(0).required(),
    totalTeachers: Joi.number().integer().min(0).required(),
    totalExpenses: Joi.number().min(0).required(),
    totalRevenue: Joi.number().min(0).required(),
    studentPerformance: Joi.array().items(
        Joi.object({
            studentId: Joi.string().required(),
            name: Joi.string().required(),
            grade: Joi.string().valid('A', 'B', 'C', 'D', 'F').required(),
            totalMarks: Joi.number().min(0).max(100).required(),
            attendancePercentage: Joi.number().min(0).max(100).required()
        })
    ).required(),
    teacherPerformance: Joi.array().items(
        Joi.object({
            teacherId: Joi.string().required(),
            name: Joi.string().required(),
            subject: Joi.string().required(),
            totalClassesTaught: Joi.number().min(0).required(),
            averageStudentFeedback: Joi.number().min(0).max(5).required()
        })
    ).required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.string().uri().optional(),
});

module.exports = { listingSchema };
