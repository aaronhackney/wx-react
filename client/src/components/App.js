import './App.css';
import AmbientWxDevice from './AmbientWx/AmbientWxDevices'
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api: {                                // This is the nginx listener information that automatically
        protocol: 'http',                   // adds the apiKey and applicationKey to each request
        port: '3001',                       // So we don't have to expose them in browser-side code
        host: 'wx.hacksbrain.com',          // See the "README.md" for details
        devices: { endpoint: 'devices' },
        apiVersion: '1',
      },
      lastUpdated: 'Never'                  // Placeholder for the top menu bar to indicate the data set date
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
