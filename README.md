# XongoLab-practical

Practical Task: React and Node.js Application
=============================================

Full-stack application using **React** (frontend) and **Node.js** (backend). The application includes a **Login Module** and a **Customer Management Module** with additional features for enhanced functionality and user experience.

Features
--------

### Core Task Features

1.  **Login Module**
    
    *   Authentication for user login using MongoDB database and backend Node-express.
        
2.  **Customer Module**
    
    *   **Customer Listing**: View all customers with options to search and sort.
        
    *   **Add/Edit/Delete Customer**: Manage customer details efficiently.
        
    *   **Protected Routes**: Access to the Customer Module is restricted to authenticated users.
        

### Additional Features Implemented

1.  **Signup Module for Super Admin**
    
    *   Super Admin can register and log in to manage customer data.
        
2.  **Pagination**
    
    *   Implemented for customer listings to handle large datasets effectively.
        
3.  **Validation**
    
    *   Basic validations for customer fields like name and email format.
        
4.  **Error Handling with Toastify**
    
    *   Integrated **Toastify** to display success and error messages (e.g., failed login, invalid input).
        
5.  **Logout Functionality**
    
    *   Users can securely log out, and all session data is cleared from local storage.
        
6.  **File Upload with Multer**
    
    *   Used **Multer** to manage file uploads in the backend.
        

Technology Stack
----------------

### Frontend

*   **React.js**
    
*   **React Router** for navigation and route protection.
    
*   **Axios** for API calls.
    
*   **Toastify** for notifications.
    

### Backend

*   **Node.js** and **Express.js** for creating the REST API.
    
*   **MongoDB** for the database.
    
*   **Multer** for handling file uploads.
    

Installation and Setup
----------------------

```sh
git clone https://github.com/Nijeshpatel11/XongoLab-practical.git 
cd practical-task
npm install
```
**Frontend**
```sh
cd frontend
npm install
npm start
```
For server setup, you need to add your MongoDB database URL in env file..

**Backend**
```sh
cd backend
npm install
npm start
```
    
    

API Endpoints
-------------

### Authentication

*   **POST /api/auth/login**: User login.
    
*   **POST /api/auth/register**: Super Admin signup.
    

### Customer Management

*   **GET /api/customers**: Get a paginated list of customers.

*   **GET /api/customers/:id**: Get a customer by id.
    
*   **POST /api/customers**: Add a new customer.
    
*   **PUT /api/customers/:id**: Update customer details.
    
*   **DELETE /api/customers/:id**: Delete a customer.
  
*   **PATCH /api/customers/:id/status**: Update customer status.
    

Highlights
----------

1.  **Responsive Design**
    
    *   The application design follows the provided Figma file and is responsive across devices.
        
2.  **Error Handling**
    
    *   Both backend and frontend handle errors gracefully, ensuring a smooth user experience.
        
3.  **Optimized Code**
    
    *   Used reusable components in React and followed best practices in structuring the backend routes.
        
## Demo 

Demo Presentation Link :- https://drive.google.com/file/d/1caVvOJ2bC6Nxdsbzsp8QFjbE86Q7aATU/view?usp=sharing

    
