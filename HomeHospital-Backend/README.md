<h1 style='color: purple'> Home Hospital Backend</h1>
Here is all of the source code for the server application used to power the HomeHospital application, used to help manage hospital waiting rooms. 

<h2 style='color: purple'> Instructions</h2>
Make sure to have node and npm installed on your system.

Create a file in the folder <mark style="background-color: purple;color: white">HomeHospital-Backend</mark>. with the title of `.env` and add the following variables with the appropriate values to connect to the DB and set environment variables
```
APP_PORT= // port for application to run on
MONGO_URI= // connection string to connect to the MongoDB database
ACCESSTOKEN_TEST_SECRET= // secret value needed to sign the access key
REFRESHTOKEN_TEST_SECRET= // secret value needed to sign the access key
EMAIL_HOST= // Email host
EMAIL_USERNAME= // email address
EMAIL_PASSWORD= // password for email address
FROM_EMAIL= // from email address
```
Run the following commands to install and run the node dependencies
```
npm install
```
<h2 style='color: purple'>  Run the application</h2>

To run the application in a development environment, run the following command. If you don't have *nodemon* installed, run `npm i nodemon`
```
npm run dev
```
Start the application
```
npm run start
```
