# Xenoblade Chronicles 2 Guide App

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*

This project is a completion guide for some of the key elements in the game Xenoblade Chronicles 2. The application will provide guidance on finding and/or unlocking elements such as:

* Blades
* Blade skills
* Driver skills
* Quests
* Heart 2 hearts
* Named monsters

The project also gives users the abilty to avoid spoilers in the game as there will be a way to hide elements which are unavailable to the user based on their progress in the story and already obtained data.

Finally, the application will also allow the users to track the exact number of things unlocked and collected, all in one place to give a quick view of collection progress.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This script also runs the server, which is also made in the project. While having server and client side of the application is not necessarily the best practice, in this instance, the server side is very simple and small.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Run database locally

Needed technology:
* Node
* MySQL
* MySQL-Server - sude apt-get install mysql-server

To run locally, first start the database server using the command:

`sudo service mysql start`

Then go to the MySQL Workbench. Connect to the local database using the Standard Connection Method and the details:

* Hostname: localhost
* Port: 3306
* Username: root

Next, in a terminal, go to the main directory of the project code and  run:

`npm run start`

The database tables will be automatically created.

To populate them, import the data from the JSON files.