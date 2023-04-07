Steps to Install and Run:

1. Open Terminal on Frontend folder directory and type "npm install" to install all dependencies.

2. Open Terminal on Backend folder directory and type "npm install" to install all dependencies.

3. Create a .env file on the Backend Folder.

4. Create a database on MongoDB account.

5. Create this parameters on the .env file:
      TEST_DB_URI=mongodb+srv://<username>:<password>@cluster0.ae0aurl.mongodb.net/<database>?retryWrites=true&w=majority
      PORT = 5000
                              -replace username, password and database with your own
6. To run the Backend Server, open the terminal on the Backend folder and type "npm start".

7. To run the Frontend, open the terminal on the Frontend folder and type "npm start".

8. When creating an admin account, register it as a normal user first then change the role index on the users collection.
