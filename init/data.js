const sampleListings = [
    {
      schoolName: "Green Valley Academy",
      academicYear: "2023-2024",
      totalStudents: 845,
      totalTeachers: 45,
      totalExpenses: 12500,
      totalRevenue: 15000,
      studentPerformance: [
        {
          studentId: "S0012",
          name: "Alice Johnson",
          grade: "A",
          totalMarks: 92,
          attendancePercentage: 95,
        },
        {
          studentId: "S0013",
          name: "Benjamin Lee",
          grade: "B+",
          totalMarks: 85,
          attendancePercentage: 89,
        },
      ],
      teacherPerformance: [
        {
          teacherId: "T0042",
          name: "Mr. Stephen Carter",
          subject: "Physics",
          totalClassesTaught: 72,
          averageStudentFeedback: 5,
        },
        {
          teacherId: "T0037",
          name: "Ms. Sarah Mitchell",
          subject: "English",
          totalClassesTaught: 68,
          averageStudentFeedback: 4,
        },
      ],
      additionalNotes: "The school had significant improvements in science and math this year.",
      image: "https://images.unsplash.com/photo-1610742310561-b897aa9d9cfb?crop=entropy&fit=crop&w=800&h=600",
      location: "Green Valley",
      country: "United States",
    },
    {
      schoolName: "Riverfront High School",
      academicYear: "2023-2024",
      totalStudents: 920,
      totalTeachers: 50,
      totalExpenses: 16000,
      totalRevenue: 18000,
      studentPerformance: [
        {
          studentId: "S0101",
          name: "Sophia Turner",
          grade: "A-",
          totalMarks: 89,
          attendancePercentage: 98,
        },
        {
          studentId: "S0102",
          name: "Oliver Smith",
          grade: "B",
          totalMarks: 80,
          attendancePercentage: 92,
        },
      ],
      teacherPerformance: [
        {
          teacherId: "T0011",
          name: "Mr. James O'Connor",
          subject: "Mathematics",
          totalClassesTaught: 88,
          averageStudentFeedback: 4,
        },
        {
          teacherId: "T0023",
          name: "Ms. Emily White",
          subject: "History",
          totalClassesTaught: 75,
          averageStudentFeedback: 4.5,
        },
      ],
      additionalNotes: "Significant growth in the arts program. A focus on extracurricular activities.",
      image: "https://images.unsplash.com/photo-1605226335209-3c5e46b3ad4b?crop=entropy&fit=crop&w=800&h=600",
      location: "Riverfront",
      country: "Canada",
    },
    {
      schoolName: "Sunshine International School",
      academicYear: "2023-2024",
      totalStudents: 1100,
      totalTeachers: 60,
      totalExpenses: 22000,
      totalRevenue: 25000,
      studentPerformance: [
        {
          studentId: "S0510",
          name: "Liam Davies",
          grade: "B+",
          totalMarks: 85,
          attendancePercentage: 94,
        },
        {
          studentId: "S0511",
          name: "Emma Robinson",
          grade: "A",
          totalMarks: 91,
          attendancePercentage: 96,
        },
      ],
      teacherPerformance: [
        {
          teacherId: "T0082",
          name: "Mrs. Helen Peterson",
          subject: "Chemistry",
          totalClassesTaught: 85,
          averageStudentFeedback: 4.8,
        },
        {
          teacherId: "T0095",
          name: "Mr. Michael Clark",
          subject: "Computer Science",
          totalClassesTaught: 78,
          averageStudentFeedback: 4.6,
        },
      ],
      additionalNotes: "Great progress in STEM fields, and a new student wellness program was introduced.",
      image: "https://images.unsplash.com/photo-1612067434854-91f334f2c1a2?crop=entropy&fit=crop&w=800&h=600",
      location: "New Delhi",
      country: "India",
    },
    {
      schoolName: "Blue Ridge High School",
      academicYear: "2023-2024",
      totalStudents: 750,
      totalTeachers: 40,
      totalExpenses: 13000,
      totalRevenue: 15000,
      studentPerformance: [
        {
          studentId: "S0205",
          name: "Daniel Lee",
          grade: "C+",
          totalMarks: 75,
          attendancePercentage: 87,
        },
        {
          studentId: "S0206",
          name: "Mia Wong",
          grade: "B",
          totalMarks: 80,
          attendancePercentage: 91,
        },
      ],
      teacherPerformance: [
        {
          teacherId: "T0075",
          name: "Mr. Brian Evans",
          subject: "Geography",
          totalClassesTaught: 62,
          averageStudentFeedback: 4,
        },
        {
          teacherId: "T0083",
          name: "Ms. Linda Thomas",
          subject: "Physical Education",
          totalClassesTaught: 70,
          averageStudentFeedback: 4.3,
        },
      ],
      additionalNotes: "The school is focusing on improving sports facilities and environmental awareness.",
      image: "https://images.unsplash.com/photo-1592741262883-c8d1e7f8eeb3?crop=entropy&fit=crop&w=800&h=600",
      location: "Blue Ridge",
      country: "Australia",
    },
    {
      schoolName: "Oakwood College",
      academicYear: "2023-2024",
      totalStudents: 500,
      totalTeachers: 25,
      totalExpenses: 11000,
      totalRevenue: 12000,
      studentPerformance: [
        {
          studentId: "S0303",
          name: "Chloe Black",
          grade: "A",
          totalMarks: 93,
          attendancePercentage: 99,
        },
        {
          studentId: "S0304",
          name: "Ethan Miller",
          grade: "B-",
          totalMarks: 76,
          attendancePercentage: 85,
        },
      ],
      teacherPerformance: [
        {
          teacherId: "T0028",
          name: "Dr. Mark Johnson",
          subject: "Philosophy",
          totalClassesTaught: 55,
          averageStudentFeedback: 4.7,
        },
        {
          teacherId: "T0032",
          name: "Ms. Rebecca Ford",
          subject: "Sociology",
          totalClassesTaught: 60,
          averageStudentFeedback: 4.5,
        },
      ],
      additionalNotes: "The college is introducing new courses in artificial intelligence and sustainability.",
      image: "https://images.unsplash.com/photo-1501746885289-b193fc8f575d?crop=entropy&fit=crop&w=800&h=600",
      location: "Oakwood",
      country: "United Kingdom",
    },
    {
      schoolName: "Techno Scholars Academy",
      academicYear: "2023-2024",
      totalStudents: 650,
      totalTeachers: 35,
      totalExpenses: 9500,
      totalRevenue: 11000,
      studentPerformance: [
        {
          studentId: "S0407",
          name: "Ava Clarke",
          grade: "B+",
          totalMarks: 88,
          attendancePercentage: 93,
        },
        {
          studentId: "S0408",
          name: "James Harris",
          grade: "C",
          totalMarks: 70,
          attendancePercentage: 89,
        },
      ],
      teacherPerformance: [
        {
          teacherId: "T0113",
          name: "Mr. Liam Brooks",
          subject: "Engineering",
          totalClassesTaught: 60,
          averageStudentFeedback: 4.3,
        },
        {
          teacherId: "T0122",
          name: "Ms. Julia Carter",
          subject: "Design Technology",
          totalClassesTaught: 55,
          averageStudentFeedback: 4.2,
        },
      ],
      additionalNotes: "Focus on enhancing tech labs and bringing more industry collaboration.",
      image: "https://images.unsplash.com/photo-1617088368495-00cf8b5b2f83?crop=entropy&fit=crop&w=800&h=600",
      location: "San Francisco",
      country: "United States",
    },
  ];
  
  
  module.exports = { data: sampleListings };