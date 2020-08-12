# Simple MERN Stack 

This application allows users to create/read/update/delete notes. This project was developed with MERN Stack (MongoDB, ExpressJS, ReactJS and NodeJS).

## INSTALATION

1. prepare database
2. Add environment Variables: ./.env
3. install the required modules in backend: cd backend - npm install 
4. install the required modules in frontend: cd client - npm install

## RUN PROJECT

From backend folder write in console:

npm run server-dev - to run the backend server  
npm run client-dev - to run the frontend server  
npm run start-dev - to run backend and frontend servers

## STRUCTURE

- frontend : frontend server
    - src : all client files
        - components: it contains all reactjs components (create note, create user, navigation, notes list)
        - config: it contains required variables to run the project
        - app: handle routes of the application
        - index: file that handles all frontend side application
- backend : backend server
    - src : all backend files
        - controllers: make requests to the database (taking into account the model)
        - models: database schemes
        - routes: handles requests made by the client (call the controller)
        - database: connection to the database
        - index: file that handles all application
        - server: configurations of the backend server


## DESCRIPTION

**Actions:**

- User can Create notes 
- User can Read notes 
- User can Update notes 
- User can Delete notes 

**Process that the application does to show data in the views:** 

- User fill forms and send information to the server (HTTP)
- Server listens to the route
- Depending on the path, route call the controller 
- The controller obtains the required data through the previously created model
- Server respond the required data 

## TO IMPROVE

- add testing
- stylize pages