# Project Title

This repository contains a Node.js API that allows users to add new schools to a MySQL database and retrieve a list of schools sorted by proximity to a given latitude and longitude.

This API provides two key functionalities:

1.Upload New Schools:

->Allows users to add new school entries to the database.
->The API ensures that all provided information is valid and prevents duplicate entries.

2.Retrieve Nearby Schools:

->Enables users to fetch a list of schools based on proximity to a specified latitude and longitude.  
 ->The results are sorted by distance, helping users find the closest schools easily.

## Table of Contents

- Features
- Technologies Used
- Installation
- Environment Variables
- Database Setup
- Running the Application
- API Documentation
- Error Handling
- Postman Collection
- Contributing

## Features

- **Add New School**: Add a new school to the database with name, address, latitude, and longitude.
- **Get All Schools**: Retrieve a list of all schools in the database.
- **Get Nearby Schools**: Retrieve a list of schools sorted by proximity to a user-provided latitude and longitude.

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [MySQL](https://www.mysql.com/) (version 5.7 or higher)
- [Git](https://git-scm.com/)

To initiate Node run this command in terminal->

```bash
  npm init
```

To initiate MySql run this command in terminal

```bash
  npm i mysql2
```

## Technologies Used

- **Node.js**
- **Express.js**
- **MySQL**
- **Validator.js**
- **Helmet**
- **XSS-Clean**
- **HPP**
- **Express-Rate-Limit**
  ->You can install all this dependencies using npm.

## Steps

**1.Clone the Repository:**

```bash
git clone https://github.com/kunalcode12/SchoolManagementAPI.git
```

**and change directory into the project using**

```bash
cd school-management-api
```

**2.Install Dependencies:**

```bash
   npm install
```

**and Run the Server**

```bash
   npm start
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT=3000`

`HOST=your-database-host`

`PORT_DATABASE=your-database-port`

`USER=your-database-username`

`DATABASE_PASSWORD=your-database-password`

`DATABASE=your-database-name`

`CONNECTION_LIMIT=10`

`QUEUE_LIMIT=0`

## Documentation

**Base URL**

Local Development: http://localhost:3000

Production: https://school-management-api-one.vercel.app

## Endpoints

**1. Get All Schools**

**Endpoint**:

```http
  GET /api/v1/listSchools
```

Method:GET

Description: Retrieves a list of all schools in the database.

- **Example Request**
  GET "https://school-management-api-one.vercel.app/api/v1/listSchools"

- **Response**

![App Screenshot](https://i.imgur.com/Ix6H59o.png)

**2. Get All Schools Near User By User Given Latitude And Longitude**

**Endpoint**:

```http
  GET /api/v1/listSchools/:latitude,:longitude/unit/:unit
```

**Query Parameters->**

**lat,lng (required)**: A comma-separated string representing the latitude and longitude of the user. For example, 40.7128,-74.0060.

Latitude and longitude should be in valid range.Otherwise you will get error.

Latitude valid range:Range: -90 to 90

Longitud valid range: -180 to 180

**unit (required):** The unit of measurement for the distance. Accepted values are km (kilometers) or mi (miles).

Method:GET

Description: Retrieves a list of all schools from the database in Sorted order according to user given latitude and longitude. And the unit is only valid in km or mi.

- **Example Request**
  GET "https://school-management-api-one.vercel.app/api/v1/listSchools/89.7767,120.5678/unit/km"

- **Response**
  ![App Screenshot](https://i.imgur.com/RjoUlbo.png)

![App Screenshot](https://i.imgur.com/DULrJsF.png)

- **INVALID Request Example**

GET "https://school-management-api-one.vercel.app/api/v1/listSchools/95.7767,205.5678/unit/km"

Latitude=95.7767(invalid)

Longitude=205.5678(invalid)

- **Response**
  ![App Screenshot](https://i.imgur.com/h3pu5w0.png)

**3. UPLOAD SCHOOLS On Database**

**Endpoint**:/api/v1/addSchool

```http
  POST /api/v1/addSchool
```

Method:POST

- **Example Request**
  POST "https://school-management-api-one.vercel.app/api/v1/addSchool"

- **Request Body**

The request should include the following JSON object and all fields below is required:

![App Screenshot](https://i.imgur.com/WLx2IiU.png)

->**Name** should be valid string which should include these below fields in it as that is generally a school name.

Fields= [
"High School",
"Elementary School",
"Public School",
"Middle School",
"Academy",
"Primary School",
"Secondary School",
"International School",
"Christian School",
"Catholic School",
"Islamic School",
"Prep School",
"school",
"School",
]

->**Address** should be a valid string containing:

Atleast 1 space ,1 Number,1 letter,

No invalid characters,

Should not have many repitations,

and it length should be greater then 5.

- **Response**
  ![App Screenshot](https://i.imgur.com/4r7fcEa.png)

**INVALID Request Examples:**

**_For Invalid Name->_**

POST "https://school-management-api-one.vercel.app/api/v1/addSchool"

- **Request Body**
  ![App Screenshot](https://i.imgur.com/TdDkt20.png)

- **Response**
  ![App Screenshot](https://i.imgur.com/uTAwdmY.png)

**_For Invalid Address->_**

POST "https://school-management-api-one.vercel.app/api/v1/addSchool"

- **Request Body**
  ![App Screenshot](https://i.imgur.com/SIWNDoW.png)

- **Response**
  ![App Screenshot](https://i.imgur.com/v5rLjpF.png)

**_If School Already Exist in Database or Uploading the Same School Again->_**

POST "https://school-management-api-one.vercel.app/api/v1/addSchool"

- **Request Body**
  ![App Screenshot](https://i.imgur.com/lfZLLTL.png)

- **Response**
  ![App Screenshot](https://i.imgur.com/DD14cLe.png)

**_For Invalid Latitude And Longitude->_**

POST "https://school-management-api-one.vercel.app/api/v1/addSchool"

- **Request Body**
  ![App Screenshot](https://i.imgur.com/ebCFl9k.png)

- **Response**
  ![App Screenshot](https://i.imgur.com/79peBmr.png)

## For TESTING

You can use below provided Postman link->

```http
  https://www.postman.com/kunal01230321/workspace/api/collection/34883131-3044660c-3dd5-44e3-bdc0-ca0e27273f40?action=share&creator=34883131
```
