# WX Dashboard
This is an app I wrote to learn more about react, express, and a monorepo build. It retrieves the data from an "ambient weather" weather station and displays it on the screen. It refreshes the data once a minute.

This app has two components:
- frontend - A react app that is browser rendered
- backend - An express app that retrieves API data and controls routes serving the react app as static, webpack optimized javsascript files

As a learning tool, I put each of these in their own directory trees and each tree has it's own node/yarn workspace and package.json config. The root workspace installs all of the dependencies for both the backend workspace and the frontend workspace.

## Custom configuration  
### Backend  
The express server will make API calls to the ambient weather API and will need the .env file to contain the needed settings:
In the ./backend/ folder, rename the `.env.sample` file to `.env` and replace the variables in the file with your settings.
| Variable | Sample Value                 | Meaning                                      |
| -------- | ---------------------------- | -------------------------------------------- |
| FQDN     | api.ambientweather.net       | Remote API FQDN                              |
| ENDPOINT | /v1/devices                  | Remote API endpoint                          |
| PROTO    | https                        | Protocol used to call remote API             |
| APIKEY   | abc123456789                 | ambientweather.net API Key                   |
| APPKEY   | xyz098765432                 | ambientweather.net APP ID                    |
| PORT     | 8080                         | Port listening for connections from frontend |
| ORIGIN   | http://react.mysite.com:8080 | frontend URL (CORS)                          |

### Frontend  
The react server will need to know the backend hostname and port. In the ./frontend/ folder, rename the `.env.sample` file to `.env` and replace the variables in the file with your settings. 
| Variable              | Sample Value       | Meaning                 |
| --------------------- | ------------------ | ----------------------- |
| BUILD_PATH            | ../dist            | React webpack location  |
| REACT_APP_PORT        | 8082               | React webapp port       |
| REACT_APP_PROTO       | http               | Front end protocol      |
| REACT_APP_HOST        | api.hacksbrain.com | FQDN of the react app   |
| REACT_APP_ENDPOINT    | devices            | express server endpoint |
| REACT_APP_API_VERSION | 1                  | API version             |


## Node module installation:
In the root of the directory just run  
`yarn`

This will install the modules for both the backend and frontend trees.   

Build the static files for the front end react app  
`yarn workspace frontend build`

Start the express server  
`yarn workspace backend clean`  
`yarn workspace backend build`  
`yarn workspace backend start-dev`  
`yarn workspace backend start-prod`




