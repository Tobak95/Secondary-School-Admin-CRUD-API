Secondary-School-Admin-Crud-API

PROJECT DESCRIPTION:

 The API enables creating new students, retrieving all students or a single student by ID, updating student information, and deleting a student record. Passwords are securely hashed with bcrypt, and all requests requiring authorization must include a valid JWT in the Authorization header. 
   For example, the delete operation accepts a DELETE request to /api/students/:studentId and, if the student exists, responds with a success message confirming the deletion; otherwise, it returns a not-found error.

The secondary Crud Admin Crud API backend application connected to MongoDB that allows administrators to manage secondary school student records through full CRUD operations. The Student Management API is a Node.js and Express.js backend application connected to MongoDB that allows administrators to manage secondary school student records through full CRUD operations. It features JWT-based authentication to ensure only logged-in users can access the system and role-based authorization so that only admins can create, update, or delete student data.


. The server is configured via environment variables for the port, MongoDB URI, and JWT secret, and can be started after installing dependencies with npm install by running npm start.



INSTALLATION AND SETUP INSTRUCTION:

1. npm install
2. npm i mongoose
3. npm i dotenv
4. npm i jsonwebtoken
5. npm i cors
6. npm i bcrypt
7. npm i express
8. npm i nodemon

2. .env file
   PORT: 7890
   MONGO_URL
   JWT_SECRET

3. Starting Server: npm run dev



API FOR:       ADMIN & USER 
API FEATURES : REGISTRATION and LOGIN

   REQUEST =>         ROUTE =>               Description
|--------------|------------------------|----------------------|
|   POST       | /api/auth/register     | register a user/admin 
|   POST       | /api/auth/login        | login a user/admin   |




API FOR:       ADMIN (PROTECTED ROUTES)
API FEATURES: CRUD FEATURES
1. Create Student: (The admin have the access to create student for registration)
2. Read Student:   (By this function, the admin can get all student or a single student)
3. Update Student: (The admin also have the access to update Student class grades and data information(s))
4. Delete Student: (The admin can also erase the data of any student that is no longer a student or member of the given school)


   REQUEST =>         ROUTE =>               Description
|--------------|--------------------------|---------------------------------------|

|  POST        | "/api/student/create"    | Register a student
|  GET         | "/api/student/get"       | Get all the total number of student
|  PATCH       | "/api/student/:studentId"| Updating a student INFO with an Id
|  DELETE      | "/api/student/:studentId:| Deleting a student Account