# 🌟 Annual Report Generator 🌟

## 📖 Overview

The **Annual Report Generator** is a user-friendly web application designed to help educational institutions generate detailed annual reports. The app allows users to input data about their college or school, such as student performance, teacher performance, revenue, expenses, etc., and then generates a structured annual report. Built using **HTML**, **CSS**, **JavaScript**, **MongoDB**, **Express**, and **Node.js**, this application offers an intuitive interface for users to manage their reports and feedback.

---

## 🛠 Features

- **User Authentication**: Users can log in or register to save and manage their annual reports.
- **Report Generation**: Generate detailed annual reports by entering information about school statistics, performance, finances, etc.
- **Top Ranking Colleges**: View a list of top-ranking colleges based on various metrics such as total revenue, student performance, teacher performance, etc.
- **Responsive Design**: The application is mobile-friendly, ensuring ease of use across devices.
- **Data Persistence**: All user data, including reports and comments, are stored in a **MongoDB** database.

---

## 🔧 Technologies Used

### Frontend
- **HTML**
- **CSS**
- **JavaScript (Vanilla JS)**
- **Bootstrap** (for responsive design)

### Backend
- **Node.js**
- **Express.js**
- **MongoDB** (for data storage)
- **Mongoose** (for MongoDB interaction)

### Authentication
- **Express-session** (for session management)

### Other Tools
- **EJS** (Embedded JavaScript templates for rendering dynamic HTML)

---

## 🏃‍♂️ Getting Started

### Prerequisites

To run this project locally, make sure you have the following installed:

- **Node.js** and **npm** (Node Package Manager)
- **MongoDB** (or use MongoDB Atlas for a cloud database)

Once the prerequisites are installed, you can proceed with running the application as described above.

---

## 💻 Usage

### Home Page

Upon visiting the home page, users can see the navigation links and choose to either:

- **Login** (if they already have an account)
- **Register** (if they don’t have an account)

### Generating Reports

Once logged in, users can access the **Generate Report** page, where they can input various details like:

- **College Name**
- **Academic Year**
- **Total Students**
- **Total Teachers**
- **Total Revenue**
- **Total Expenses**
- **Student and Teacher Performance Data**

After filling out the form, the user can submit the data, which is then stored in **MongoDB**, and the generated report is displayed on the page.

### Top Ranking Colleges

After generating reports, users can view the **Top Ranking Colleges** based on various criteria such as:

- **Total Revenue**
- **Student Performance** (average marks or attendance percentage)
- **Teacher Performance** (average classes taught, feedback score)

The rankings are generated dynamically, and users can access them from the **Ranking** page. This helps institutions compare their performance with others in various categories.

### Logout

Users can log out of their session at any time, and their session data will be cleared.

---

## 🧑‍💻 Authentication

This app uses **Express-session** to handle user authentication, where users need to **log in** to generate reports and comment on them. The **Passport.js** strategy is used for authentication.

### User Authentication Flow:

1. **Registration**: A new user can create an account by providing their email and password.
2. **Login**: Existing users can log in using their credentials.
3. **Session Management**: Sessions are maintained to ensure that users remain logged in during their session.
4. **Logout**: Users can log out, which will destroy the session and redirect them to the login page.

---

## 👨‍💻 Contributing

If you’d like to contribute to this project, feel free to fork the repository and submit a pull request. Please follow the steps below:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## 🏆 Acknowledgments

- **Node.js**, **Express.js**, **MongoDB**, and **Mongoose** for the backend.
- **Bootstrap** for the responsive UI design.
- **EJS** for server-side rendering of dynamic pages.
- **Font Awesome** for the icons used in the UI.
- **Stack Overflow** for solutions and tips during development.

---

## 📄 License

This project is licensed under the **MIT License**.

## DashBoard:
<img src="https://github.com/user-attachments/assets/edf30a9d-006c-4651-a7ed-31c4fd44ac22" alt="Dashboard Screenshot" width="300">

## Login/Register Interface:
<img src="https://github.com/user-attachments/assets/ab532502-ca47-4ad0-aa2e-9b36ba2bfd8a" alt="Login/Register Screenshot" width="300">

## Generate Report:
<img src="https://github.com/user-attachments/assets/7118194d-b6fe-41d5-8221-fd84d422bede" alt="Generate Report Screenshot" width="300">

## Generated Report:
<img src="https://github.com/user-attachments/assets/8ae3447c-af08-4525-bac2-a03e527b31e3" alt="Generated Report Screenshot" width="300">

## Tips and Tricks:
<img src="https://github.com/user-attachments/assets/e39080df-4097-41d6-9071-8a0f8ea20514" alt="Tips and Tricks Screenshot" width="300">






