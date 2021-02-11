# WX Dashboard
This is an app I wrote to learn more about react and the yarn system. It retrieves the data from an "ambient weather" weather station and displays it on the screen. It refreshes the data once a minute.

This app has two components:
- frontend - A react app that is browser rendered
- backend - An express app that retrieves API data and controls routes serving the react app as static, webpack optimized javsascript files

As a learning tool, I put each of these in their own directory trees and each tree has it's own node/yarn workspace and package.json config. The root workspace installs all of the dependencies for both the backend workspace and the frontend workspace.

## Custom configuration  
The express server will make API calls to the ambient weather API and will need the .env file to contain the needed settings:  
In the ./backend/ folder, rename the `.env.sample` file to `.env` and replace the variables in the file with your settings.

## Node module installation:
In the root of the directory just run  
`yarn`

This will install the modules for both the backend and frontend trees.   

Build the static files for the front end react app  
`yarn workspace frontend build`

Start the express server  
`yarn workspace backend start`



