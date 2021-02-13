import './App.css';
import AmbientWxDevice from './AmbientWx/AmbientWxDevices'
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: {                                    // This is the backend listener
        protocol: process.env.REACT_APP_PROTO,
        port: process.env.REACT_APP_PORT,
        host: process.env.REACT_APP_API,
        devices: { endpoint: process.env.REACT_APP_ENDPOINT },
        apiVersion: process.env.REACT_APP_API_VERSION,
      },
      lastUpdated: 'Never'                      // Placeholder for the top menu bar to indicate the data set date
    };
  }


  // method to allow the AmbientWxDevices component to update the state.lastUpdated value after the API call
  handler = (lastUpdatedDate) => this.setState({ lastUpdated: lastUpdatedDate });


  render() {

    return (

      <div className="container-fluid">
        <div className="navbar">
          <nav>
            <div className="nav-wrapper title amber accent-1">
              wx.hacksbrain.com
            </div>
          </nav>
        </div>
        <div className="row last-updated" >
          Last Updated: {this.state.lastUpdated}
        </div>
        <div className="row">
          <div className="col s12">
            <AmbientWxDevice api={this.state.api} handler={this.handler} />
          </div>
        </div>
      </div>
    );
  }

}

export default App;
