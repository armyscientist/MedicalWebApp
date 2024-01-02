To get started with the project, developers can refer this documentation, which includes information on the project's architecture, functionality, terminologies, purpose, scope, and a usage guide. The documentation also provides instructions for setting up and running the MedicalWebApp on a local development environment.

# MedicalWebApp
The MedicalWebApp is a web-based application that simplifies medical record management and improves communication between healthcare providers and patients. It allows users to search for medical utilities in various hospitals based on their needs and provides hospitals with a dashboard to manage utility counts. The application is designed to be flexible and can accommodate different hospital policies. We have implemented good practices to optimize search processing, performing CRUD operations, fast data transfer, and delivery of search results, as well as enhance user experience.


# Installation
To run the front end and backend of the MedicalWebApp project, follow these steps:

## Frontend:
1. Navigate to the 'MedicalWebApp/web_app' directory.
2. Open a terminal and run the command npm install to install the required dependencies.
3. After the installation is complete, run the command npm start to start the development server.
4. The frontend will be accessible at http://localhost:3000 in your browser.

## Backend:
1. Open the file MedicalWebApp/db_api/app.py in a text editor.
2. Make sure you have the necessary dependencies installed which are listed in the file named requirements.txt present in the folder db_api. You can install these dependencies using pip:
```
   pip install -r requirements.txt
```
3. Set up the MySQL database. Make sure you have MySQL installed and running on your local machine. Create a new database named medicalwebappserver.
4. In the connectDB() function in app.py, update the connection parameters to match your MySQL configuration. Modify the host, user, passwd, and database values accordingly.
5. Run the Flask application. In the terminal, navigate to the MedicalWebApp/db_api directory and run the following command:
```
python app.py
```
You can now access the server by opening a web browser and entering the URL http://localhost:5000, where 5000 is the port number specified in the app.py file then you would enter http://localhost:5000 in the browser.

# Testing
Test the backend endpoints. You can use tools like Postman or cURL to send HTTP requests to the backend endpoints and verify their functionality. Here are some example endpoints you can test:
- GET /hospital-login: This endpoint handles hospital login. You can provide the hospital_id, hospital_email, and password as query parameters to test the login functionality.
- GET /top-utility-list: This endpoint retrieves the top utility list. It does not require any parameters.
- GET /utility-list: This endpoint retrieves the utility list. You can provide the hospital_id as a query parameter to get the utility list for a specific hospital.
- GET /search: This endpoint handles hospital search based on hospital name and utility ID. You can provide the hospital_name and/or utility_id as query parameters to search for hospitals.

Before running the backend, you need to manually create the MySQL database and tables. You can use the SQL queries provided in the app.py file to create the necessary tables. Here is an example of how to create the tables:

# Database
CREATE TABLE `hospital_info` (
  `hospital_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `hospital_name` text NOT NULL,
  `building_no` varchar(30) DEFAULT NULL,
  `street` varchar(30) DEFAULT NULL,
  `area` varchar(30) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state` varchar(30) NOT NULL,
  `pincode` char(6) NOT NULL,
  `phone_appointment` varchar(15) NOT NULL,
  `phone_ambulance` varchar(15) NOT NULL,
  `phone_inquiry` varchar(15) DEFAULT NULL,
  `phone3_alternate` varchar(15) DEFAULT NULL,
  `phone4_incharge` char(15) DEFAULT NULL,
  `incharge_name` varchar(30) DEFAULT NULL,
  `gmap` text,
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`hospital_id`),
  UNIQUE KEY `phone_appointment` (`phone_appointment`),
  UNIQUE KEY `phone_ambulance` (`phone_ambulance`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `hospital_login` (
  `hospital_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `hospital_email` varchar(100) DEFAULT NULL,
  `password` text NOT NULL,
  `last_updated` datetime DEFAULT NULL,
  `last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`hospital_id`),
  UNIQUE KEY `hospital_email` (`hospital_email`),
  CONSTRAINT `hospital_login_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital_info` (`hospital_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `utility_count` (
  `hospital_id` smallint unsigned NOT NULL,
  `utility_id` smallint unsigned NOT NULL,
  `count` smallint unsigned DEFAULT '0',
  `total` smallint unsigned DEFAULT '0',
  `last_updated` datetime DEFAULT NULL,
  PRIMARY KEY (`hospital_id`,`utility_id`),
  KEY `utility_id` (`utility_id`),
  CONSTRAINT `utility_count_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital_info` (`hospital_id`) ON DELETE CASCADE,
  CONSTRAINT `utility_count_ibfk_2` FOREIGN KEY (`utility_id`) REFERENCES `utility_info` (`utility_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `utility_info` (
  `utility_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `utility_name` varchar(30) NOT NULL,
  PRIMARY KEY (`utility_id`),
  UNIQUE KEY `utility_name` (`utility_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

# API Documentation
The API documentation for the MedicalWebApp can be found in the following file:

File: MedicalWebApp/db_api/app.py

Here is an overview of the API endpoints, request/response formats, and authentication/authorization requirements:

1. Endpoint: /hospital-login
- Method: GET
- Description: Handles hospital login requests.
- Request Format: GET request with hospital ID, email, and password as query parameters.
- Response Format: JSON response indicating the login status.

2. Endpoint: /top-utility-list
- Method: GET
- Description: Retrieves the top utility list.
- Request Format: GET request.
- Response Format: JSON response containing the top utility list.

3. Endpoint: /utility-list
- Method: GET
- Description: Retrieves the utility list based on hospital ID.
- Request Format: GET request with hospital ID as a query parameter.
- Response Format: JSON response containing the utility list.

4. Endpoint: /search
- Method: GET
- Description: Searches hospitals based on hospital name and utility ID.
- Request Format: GET request with hospital name and utility ID as query parameters.
- Response Format: JSON response containing the search results.

5. Endpoint: /test
- Method: GET
- Description: For testing purposes.
- Request Format: GET request.
- Response Format: JSON response with dummy data.

Authentication/Authorization Requirements:
- The API endpoints may require authentication/authorization based on the specific requirements of the MedicalWebApp. Please refer to the code implementation for details on how authentication/authorization is handled.

Please note that this is a high-level overview of the API documentation. For more detailed information, please refer to the code implementation in the specified file.

# Testing

1. You can test these endpoints using tools like Postman or cURL by sending HTTP requests to the corresponding URLs.
2. If you create test cases in the same folder as app.py that uses in-built ```unittest``` library, then navigate to folder db_api and run the following command on terminal :
```
python <test_filename.py>
```
3. You find report of test case run on the terminal.
