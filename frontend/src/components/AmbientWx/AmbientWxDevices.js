import React, { Component } from 'react';
import WxElement from './wxElement';
import Error from './Error';
import axios from 'axios';
import './AmbientWxDevices.css';

class AmbientWxDevice extends Component {

    constructor(props) {
        super(props);
        this.intervalID = 60000;
        this.baseUrl = new URL(`${props.api.protocol}://${props.api.host}:${props.api.port}`)
        this.apiVersion = `v${props.api.apiVersion}`
        this.endpoint = props.api.devices.endpoint;
        this.state = {
            devices: [],
            error: false,
        };
    }

    componentDidMount() {
        this.getData();
    }

    componentWillUnmount() {
        // stop getData() from continuing to run even after unmounting this component
        clearTimeout(this.intervalID);
    }

    getData = () => {
        axios.get(`${this.baseUrl}${this.apiVersion}/${this.endpoint}`)
            .then((response) => {
                const devices = response.data;
                this.setState({ devices });
                this.props.handler(new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' })
                    .format(new Date(response.data[0].lastData.date)));
                this.intervalID = setTimeout(this.getData.bind(this), 60000);
            })
            .catch((error) => {
                console.log(error);
                this.setState({
                    error: true
                })
            });
    }

    // So now we have the dataset, let's build a dashboard. render() calls renderItems() 
    renderItems() {
        if (!this.state.error) {
            const dashboard = this.state.devices.map((device) => {
                return (
                    [
                        <WxElement
                            key={'tempinf'}
                            wxBgColor={'red lighten-3'}
                            wxType={'Indoor Temp'}
                            wxElement={[[`${device.lastData.tempinf}°F`, "digital-large"], [`${device.lastData.humidityin}% Hum`, "digital"]]}
                        />,
                        <WxElement
                            key={'tempf'}
                            wxBgColor={'purple lighten-5'}
                            wxType={'Outdoor Temp'}
                            wxElement={[[`${device.lastData.tempf}°F`, "digital-large"], [`${device.lastData.humidity}% Hum`, "digital"]]}
                        />,
                        <WxElement
                            key={'feelsLike'}
                            wxBgColor={'red accent-1'}
                            wxType={'Feels Like'}
                            wxElement={[[`${device.lastData.feelsLike}°F`, "digital-large"]]}
                        />,
                        <WxElement
                            key={'uv'}
                            wxBgColor={'red lighten-3'}
                            wxType={'UV Radiation Index'}
                            wxElement={[[device.lastData.uv, "digital-large"]]}
                        />,
                        <WxElement
                            key={'solarradiation'}
                            wxUnits={'W/m^2'}
                            wxBgColor={'red lighten-3'}
                            wxType={'Solar Radiation'}
                            wxElement={[[device.lastData.solarradiation, "digital-large"]]}
                        />,
                        <WxElement
                            key={'winddir'}
                            wxUnits={'°'}
                            wxBgColor={'green lighten-3'}
                            wxType={'Wind Speed'}
                            // wxElement={[[`${device.lastData.winddir}°`, "digital-large"], [`${device.lastData.windspeedmph} MPH`, "digital-large"]]}
                            wxElement={[[`${device.lastData.windspeedmph} MPH`, "digital-large"], [`Vector ${device.lastData.winddir}°`, "digital"]]}
                        />

                    ]
                )

            });
            return dashboard
        } else {
            return <Error />
        }
    }

    render() {
        return (
            <div className="row">
                {this.renderItems()}
            </div>
        );
    }
}

export default AmbientWxDevice;