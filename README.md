EXPANDED README FILE: SKATER PATCH APP

OVERVIEW

This application is meant to assist skaters and staff at the skate rink in managing the amount of time skaters use their ice-time or patch time. The application has two dashboards, one for admin and the other for the skater. Only a superuser can grant admin access via the application internally. In the future, a superuser portal and applicable front-end mechanism will be built to manage this. For now, Thundercloud is used to affect updates on the backend where the routes and controllers are set up for this change of role.

USER INSTRUCTIONS

SKATER ROLE:

To register as a Skater (default role):

Register as a user with an email and password.
Upon successful registration, log in with the details you used to register. This will take you to the skater dashboard where you can see the relevant information.
Currently, only four fields are available in the registration process to limit skaters' access to their data. In the future, a portal will be developed for them to upload an image.
You can log a new user, and the skater profile will only have the name presented. This is correct, as the admin will populate the rest of the data.
For a full mock user, you can use:
Email: miemie@test.com
Password: 123
Log out and then log back in using the pre-authorized admin user login.

ADMIN ROLE:

Log in with predefined authorized user:

Email: admin@skate.com
Password: 123

Click on "Update User." Here, the admin can load all the details of the skater into the database and update their own details. Users who have just registered will have their details prepopulated when the admin searches for them using the dropdown list. Once you have updated the user's details, click "Update" to update the database.

Admin can also delete users, and additional safety measures will be implemented to prevent accidental deletions. This is a basic prototype of what can eventually become a powerful and useful tool for admin staff and skaters who are still using paper-based spreadsheets.

TECHNICAL INSTRUCTIONS AND INSTALLATION

Navigate to the root directory and run npm install to install the required dependencies for both the root directory as well as for the server directory and for client/frontend directory.

Then run npm start from the root directory which hosts both the server and the client directores, which will start both servers for ease of use and to assist with deployment on PaaS.
Visit http://localhost:8080/ to verify that the server is active, and http://localhost:3000/ for the application.

SECURITY

All new users have JWTs assigned to their profiles, and the secret is saved in an external .env file. These JWTs contain user IDs and roles and are validated with each fetch request. Tokens are currently stored in localStorage but will be moved to cookies for enhanced security before production. Only superusers can grant admin access to ensure manual approval. I will add extra routes for the coaches and the eventualy owner or superuser to make it easier for them to update skater's profiles to that of admin.

TESTING

JEST FRONT END
Please navigate to cd frontend in the client directory and nmp test to test for both the unit and the snapshot test which are both successful. See screenshots included. The test files are saved in the components directory and unit testing on the back button - client/frontend/src/components/LogoutButton.test.js
The snapshot test is saved client/frontend/src/App.test.js. 

MOCHA/CHAI/SUPERTEST SERVER TEST
Importantly, the server must be killed prior to running the test of you will encounter an error stating that there is already an instance of the open server which will fail there unit
test as this test is testing to see if the server reaches a desired endpoint.

DATABASE CLUSTER

I am on a free tier on MongoDB and initially created a CarDataBase CLuster, which still has relevent data on it for a previous project we did in the course. I'd like to be able to use 
that project on showcase so instead of deleting it, I created my new User Database on the same cluster to retain functionality of the previous project's data. 

GITHUB

The repo for this proect can be found at GitHub  - https://github.com/neilbenjamin/skaterpatchapp

HEROKU & DEPLOYMENT

I don't want to pay for something that I don't enjoy. I am looking at various hosting and deployment options and might go with Azure. 

MENTOR FEEDBACK

Thank You Moipati Thoobe for the valuable feedback which I hope I have managed to correct on with this resubmission. I have included the feedback document in the screenshots folder for ease of reference. 

ACCREDITATION AND SOLUTIONS

Solutions courtesy of Hyperion Dev, ThunderClient, Postman, YouTube, OpenAI, and Google.

WIREFRAME DOCUMENT

Wireframe images for both mobile and desktop are attached to illustrate the app's envisioned design and functionality, including user/admin login and logout in a basic mobile prototype format.

SYSTEM ARCHITECTURE

The Skater's Patch Time Application will be built using React for the UI, Express for the server, Node.js for the backend runtime, MongoDB for database storage, and Bootstrap for basic styling. All endpoints will be tested with Thunderclient in VSC.

User Authentication will be managed by JWT and token generation.

Middleware Roles & Responsibilities will be set up to manage skater and admin-user roles.

Controllers will manage data links to the database, and models/schema structures will define the BSON.

UI Components like headers and footers will be reused where required.

Updates can be global (update all records) or individual (update specific records). Admin can choose which to update for simplicity.

SYSTEM REQUIREMENTS SPECIFICATIONS

Usability: The primary users will be skaters, parents, staff, and owners of the ice rink. The app aims to simplify the process of tracking skaters' patch time and purchases, replacing paper systems with a digital solution. Future components may include email notifications and online payment integration.

Reliability: Testing will be conducted to ensure system stability and minimal downtime.

Performance: The app will primarily fetch JSON objects, minimizing the use of media and video content. Data will be stored remotely for efficiency.

Security: Valuable passwords and authentication keys will be stored in a separate .ENV file. Hosting on HTTPS with SSL certificates will enhance security.

This README provides an overview of the Skater Patch App, its functionality, and technical details for installation and deployment. For further details and development updates, refer to the app's documentation.

Workign run build command on render: npm run install-server && npm run install-client && npm run build-client

original root working deployment scrits :
    {
  "name": "carinventory",
  "version": "1.0.0",
  "description": "root-directory package",
  "main": "index.js",
  "scripts": {
    "start": "concurrently \"npm run start-server\" \"npm run start-client\"",
    "install-server": "cd server && npm install",
    "start-server": "cd server && npm start",
    "install-client": "cd client && npm install",
    "build-client": "cd client && npm run build",
    "start-client": "cd client && npm run start",
    "start-dev": "cd server && nodemon server.js"
  },
  "author": "neil_benjamin",
  "license": "ISC",
  "dependencies": {
    "install": "^0.13.0",
    "npm": "^10.2.2"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
