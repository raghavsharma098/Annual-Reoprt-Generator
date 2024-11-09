const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");
const Listing = require("./models/listing.js");
const Report = require('./models/report');
const Chart = require('chart.js');
const session = require('express-session');
const User = require('./models/user'); 


const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// Set up EJS view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({
    secret: 'your-secret-key', // Change this for production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use((req, res, next) => {
    res.locals.session = req.session;  // Make session available in all views
    next();
  });
app.use(express.json());  

// Connect to MongoDB
async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => console.log("MongoDB connection successful"))
  .catch(err => console.log(err));

// Middleware for listing validation
const validatelisting = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const errmsg = error.details.map(el => el.message).join(",");
    throw new ExpressError(400, errmsg);
  }
  next();
};

// Routes

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Wanderlust!");
});

// Display all listings
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("index.ejs", { allListings });
}));

app.get("/dashboard", (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirect to login if not logged in
    }
    // Example data to display on the graph
    const performanceData = {
      studentMarks: [75, 80, 85, 70, 90],
      studentAttendance: [85, 90, 88, 80, 95],
      teacherFeedback: [4.5, 4.7, 4.3, 4.6, 4.2]
    };
  
    // Tips & tricks data (This can be dynamic based on the performance data)
    const tips = [
      "Increase student engagement through interactive lessons.",
      "Improve teacher feedback by conducting regular reviews.",
      "Monitor financial health regularly to avoid unexpected expenses.",
      "Encourage attendance by setting up flexible study sessions."
    ];
  
    res.render("dashboard", { tips, performanceData });
});

app.get("/register", (req, res) => {
    res.render("register");
  });
  
  app.post("/register", wrapAsync(async (req, res) => {
    const { email, password, userId } = req.body;
  
    // Create a new user
    const newUser = new User({ email, password, userId });
    await newUser.save();
  
    // Redirect to login page after registration
    res.redirect("/login");
  }));
  
  // Login route
  app.get("/login", (req, res) => {
    res.render("login");
  });
  
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Here you would check the user credentials in your database
    const user = await User.findOne({ email: email });
  
    if (user && user.password === password) { // Replace with your password checking logic
      req.session.userId = user._id;  // Store userId in session
      res.redirect('/dashboard');  // Redirect to the dashboard or home page
    } else {
      res.redirect('/register');
    }
  });
  
  
  // Logout route
  app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect('/dashboard');
      }
      res.redirect('/login');
    });
  });
  
  

// Render form to create new listing
app.get("/listings/new", (req, res) => {
  res.render("new.ejs");
});

// Show details of a single listing
app.get("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("show.ejs", { listing });
}));

// Render form to edit a listing
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("edit.ejs", { listing });
}));

// Post a new listing and create a report
app.post("/listings", validatelisting, wrapAsync(async (req, res) => {
  const newReport = new Report(req.body);
  const savedReport = await newReport.save();
  console.log(savedReport);
  res.redirect(`/reports/${savedReport._id}`);
}));

// Edit an existing listing
app.put("/listings/:id", validatelisting, wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, req.body);
  res.redirect(`/listings/${id}`);
}));

app.post('/generateReport', wrapAsync(async (req, res) => {
    const { schoolName, academicYear, totalStudents, totalTeachers, totalExpenses, totalRevenue, studentPerformance, teacherPerformance, location, country,imageUrl } = req.body;

    // Parse the studentPerformance and teacherPerformance inputs (JSON strings)
    let parsedStudentPerformance, parsedTeacherPerformance;
    try {
        parsedStudentPerformance = JSON.parse(studentPerformance);  // Parse JSON string into array
        parsedTeacherPerformance = JSON.parse(teacherPerformance);  // Parse JSON string into array
    } catch (error) {
        return res.status(400).send("Invalid data format. Please provide valid JSON.");
    }

    // Calculate averages and other report data
    const studentPerformanceAvg = calculateStudentPerformance(parsedStudentPerformance);
    const teacherPerformanceAvg = calculateTeacherPerformance(parsedTeacherPerformance);
    const financialHealth = calculateFinancialHealth(totalRevenue, totalExpenses);

    // Create performanceData object to pass to the EJS view
    const performanceData = {
        studentMarks: parsedStudentPerformance.map(student => student.totalMarks),
        studentAttendance: parsedStudentPerformance.map(student => student.attendancePercentage),
        teacherFeedback: parsedTeacherPerformance.map(teacher => teacher.averageStudentFeedback)
    };

    // Example Tips (these could be dynamic based on performance)
    const tips = [
        "Focus on improving teacher feedback scores by regular evaluations.",
        "Provide additional resources for students struggling with attendance.",
        "Consider increasing the number of extracurricular activities to improve student engagement."
    ];

    // College report data
    const collegeReport = {
        schoolName,
        academicYear,
        totalStudents,
        totalTeachers,
        location,
        country,
        studentPerformanceAvg,
        teacherPerformanceAvg,
        financialHealth,
        collegeGrade: assignCollegeGrade(studentPerformanceAvg, teacherPerformanceAvg, financialHealth),
        imageUrl,
    };

    // Pass performance data and tips to the EJS view
    res.render('report', { report: collegeReport, performanceData, tips });
}));

app.post('/dashboard', wrapAsync(async (req, res) => {
    const { schoolName, academicYear, totalStudents, totalTeachers, totalExpenses, totalRevenue, studentPerformance, teacherPerformance, location, country } = req.body;

    // Parse the studentPerformance and teacherPerformance inputs (JSON strings)
    let parsedStudentPerformance, parsedTeacherPerformance;
    try {
        parsedStudentPerformance = JSON.parse(studentPerformance);  // Parse JSON string into array
        parsedTeacherPerformance = JSON.parse(teacherPerformance);  // Parse JSON string into array
    } catch (error) {
        return res.status(400).send("Invalid data format. Please provide valid JSON.");
    }

    // Calculate averages and other report data
    const studentPerformanceAvg = calculateStudentPerformance(parsedStudentPerformance);
    const teacherPerformanceAvg = calculateTeacherPerformance(parsedTeacherPerformance);
    const financialHealth = calculateFinancialHealth(totalRevenue, totalExpenses);

    // Create performanceData object to pass to the EJS view
    const performanceData = {
        studentMarks: parsedStudentPerformance.map(student => student.totalMarks),
        studentAttendance: parsedStudentPerformance.map(student => student.attendancePercentage),
        teacherFeedback: parsedTeacherPerformance.map(teacher => teacher.averageStudentFeedback)
    };

    // Example Tips (these could be dynamic based on performance)
    const tips = [
        "Focus on improving teacher feedback scores by regular evaluations.",
        "Provide additional resources for students struggling with attendance.",
        "Consider increasing the number of extracurricular activities to improve student engagement."
    ];

    // College report data
    const collegeReport = {
        schoolName,
        academicYear,
        totalStudents,
        totalTeachers,
        location,
        country,
        studentPerformanceAvg,
        teacherPerformanceAvg,
        financialHealth,
        collegeGrade: assignCollegeGrade(studentPerformanceAvg, teacherPerformanceAvg, financialHealth)
    };

    // Pass performance data and tips to the EJS view
    res.render('report', { report: collegeReport, performanceData, tips });
}));

  
  

// Calculate average student performance
function calculateStudentPerformance(studentPerformance) {
    if (studentPerformance.length === 0) return { avgMarks: 0, avgAttendance: 0 };
  
    const totalMarks = studentPerformance.reduce((acc, student) => acc + (student.totalMarks || 0), 0);
    const totalAttendance = studentPerformance.reduce((acc, student) => acc + (student.attendancePercentage || 0), 0);
    const avgMarks = totalMarks / studentPerformance.length;
    const avgAttendance = totalAttendance / studentPerformance.length;
  
    return { avgMarks, avgAttendance };
  }
  

// Calculate teacher performance
function calculateTeacherPerformance(teacherPerformance) {
    if (!teacherPerformance || teacherPerformance.length === 0) {
      return { avgClassesTaught: 0, avgFeedback: 0 };
    }
  
    const totalClassesTaught = teacherPerformance.reduce((acc, teacher) => acc + (teacher.totalClassesTaught || 0), 0);
    const totalFeedback = teacherPerformance.reduce((acc, teacher) => acc + (teacher.averageStudentFeedback || 0), 0);
  
    const avgClassesTaught = totalClassesTaught / teacherPerformance.length;
    const avgFeedback = totalFeedback / teacherPerformance.length;
  
    return { avgClassesTaught, avgFeedback };
  }
  
// Calculate financial health
function calculateFinancialHealth(totalRevenue, totalExpenses) {
    const profit = totalRevenue - totalExpenses;
    return profit >= 0 ? 'Profitable' : 'Loss';
  }
  
// Assign college grade based on performance
function assignCollegeGrade(studentPerformanceAvg, teacherPerformanceAvg, financialHealth) {
  let grade = 'C'; // Default grade is C

  if (
    studentPerformanceAvg.avgMarks >= 80 && studentPerformanceAvg.avgAttendance >= 90 &&
    teacherPerformanceAvg.avgFeedback >= 4.5 && financialHealth === 'Profitable'
  ) {
    grade = 'A+';
  } else if (
    studentPerformanceAvg.avgMarks >= 70 && studentPerformanceAvg.avgAttendance >= 80 &&
    teacherPerformanceAvg.avgFeedback >= 4.0 && financialHealth === 'Profitable'
  ) {
    grade = 'A';
  } else if (
    studentPerformanceAvg.avgMarks >= 60 && studentPerformanceAvg.avgAttendance >= 75 &&
    teacherPerformanceAvg.avgFeedback >= 3.5 && financialHealth === 'Profitable'
  ) {
    grade = 'B';
  } else if (
    studentPerformanceAvg.avgMarks >= 50 && studentPerformanceAvg.avgAttendance >= 70 &&
    teacherPerformanceAvg.avgFeedback >= 3.0 && financialHealth === 'Profitable'
  ) {
    grade = 'C';
  } else {
    grade = 'D'; // If none of the above conditions are met, assign grade 'D'
  }

  return grade;
}

// Route to render the form for entering new college data
app.get("/newListing", (req, res) => {
  res.render("newListingForm");
});

// Route to display the form for generating a report
app.get("/generateReport", (req, res) => {
    res.render("newReportForm"); // This will render the newReportForm.ejs file
  });
  

// Display a specific report
app.get("/reports/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const report = await Report.findById(id);
  if (!report) {
    throw new ExpressError(404, "Report not found.");
  }
  res.render("report", { report });
}));

// Delete a listing
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}));

// Error handling for undefined routes
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Global error handler
app.use((err, req, res, next) => {
  const { statuscode = 500, message = "Something Went Wrong" } = err;
  res.status(statuscode).render("error.ejs", { message });
});

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
