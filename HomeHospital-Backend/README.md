<h1 style='color: purple'> Home Hospital Backend</h1>
Here is all of the source code for the server application used to power the HomeHospital application, used to help manage hospital waiting rooms. 

<h2 style='color: purple'> Instructions</h2>
Make sure to have node and npm installed on your system.

Create a file in the folder <mark style="background-color: purple;color: white">HomeHospital-Backend</mark>. with the title of `.env` and add the following variables with the appropriate values to connect to the DB and set environment variables
```
MONGO_URI= // MOngoDB connection string
APP_PORT= // Port the app listens on (4000 Suggested)
ACCESSTOKEN_TEST_SECRET= // Secret for the token key
REFRESHTOKEN_TEST_SECRET= // Secret for the token key
RESET_TOKEN_SECRET= // Secret for the token key
EMAIL_HOST= // Email host address
EMAIL_USERNAME= // Emails username
EMAIL_PASSWORD= // Emails password
FROM_EMAIL= // From email address
PATIENTACCESSTOKEN_SECRET= // Secret for the token key
PATIENTREFRESHTOKEN_SECRET= // Secret for the token key
EMPLOYEEACCESSTOKEN_SECRET= // Secret for the token key
EMPLOYEEREFRESHTOKEN_SECRET= // Secret for the token key
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

Generate JSdocs
```
jsdoc -r ./src -d ./docs
```
