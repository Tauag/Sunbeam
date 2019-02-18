import React, { Component } from 'react';
import axios from 'axios';
import Location from './search/Location';
import WeatherView from './display/weatherview';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			coordinates: { lat: 40.7127753, lng: -74.0059728 },
			data: {}
		};
	}

	componentDidMount() {
		this.handleDarkSkyCall(this.state.coordinates);
	}

	setLatLng = coordinates => {
		const { lat, lng } = this.state;

		if (coordinates.lat !== lat && coordinates.lng !== lng) {
			this.handleDarkSkyCall(coordinates).catch(error => {
				this.handleError('darksky', error);
			});
		}
	};

	handleError = (errorSource, errorObj) => {
		console.log(errorObj);
		// Need to display some sort of error message on the application
		// geocode
		// geolocate
		// weather
		// failed response
		// missing features
	};

	handleDarkSkyCall(coordinates) {
		const { lat, lng } = coordinates;

		return new Promise((resolve, reject) => {
			axios(`${process.env.REACT_APP_SUNBEAMAPI}/weather?lat=${lat}&lng=${lng}`)
				.then(response => {
					const data = response.data;
					this.setState({ data, coordinates }, () => {
						resolve();
					});
				})
				.catch(error => {
					this.handleError('darksky', error);
					reject();
				});
		});
	}

	render() {
		return (
			<div className="app">
				<Location
					address="New York, NY, USA"
					setCoordinates={this.setLatLng}
					onError={this.handleError}
				/>
				<WeatherView data={this.state.data} />
			</div>
		);
	}
}

export default App;
