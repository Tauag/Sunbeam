import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchForm from './SearchForm';
import MyLocation from '../icons/MyLocation';
import './Location.css';

export default class Location extends Component {
	constructor(props) {
		super(props);
		this.state = {
			address: props.address,
			busy: false
		};
	}

	setGeoData = (address, coordinates, callback) => {
		this.setState({ address: address, busy: false }, () => {
			this.props.setCoordinates(coordinates);
			if (callback) callback();
		});
	};

	handleGeoCodeCall = () => {
		return new Promise((resolve, reject) => {
			axios
				.get(
					`${process.env.REACT_APP_SUNBEAMAPI}/locate?address=${
						this.state.address
					}`
				)
				.then(response => {
					if (response.data.status === 'OK') {
						const data = response.data.results[0];
						this.setGeoData(
							data.formatted_address,
							data.geometry.location,
							resolve
						);
					} else {
						this.props.onError('geocode', response.data);
						reject();
					}
				})
				.catch(error => {
					this.setState({ busy: false, address: 'Error' });
					this.props.onError('geocode', error);
					reject();
				});
		});
	};

	handleIPStackCall = () => {
		return new Promise((resolve, reject) => {
			axios
				.get(`${process.env.REACT_APP_SUNBEAMAPI}/find_ip`)
				.then(response => {
					const data = response.data;
					const formattedAddress = `${data.city}, ${data.region_code}, ${
						data.country_code
					}`;
					this.setGeoData(
						formattedAddress,
						{
							lat: data.latitude,
							lng: data.longitude
						},
						resolve
					);
				})
				.catch(error => {
					this.setState({ busy: false, address: 'Error' });
					this.props.onError('ipstack', error);
					reject();
				});
		});
	};

	handleDetectLocation = () => {
		if (this.state.busy) return;
		this.handleIPStackCall().catch(e => {
			return true;
		});
	};

	onChange = e => {
		if (this.state.busy) return;
		this.setState({ address: e.target.value });
	};

	onClear = e => {
		e.preventDefault();
		if (this.state.busy) return;
		this.setState({ address: '' });
	};

	onSubmit = e => {
		e.preventDefault();
		if (this.state.busy) return;
		this.setState({ busy: true }, () => {
			this.handleGeoCodeCall().catch(e => {
				return true;
			});
		});
	};

	render() {
		const { address, busy } = this.state;
		return (
			<div className="location-form-wrapper">
				<button
					className="location-detect-location"
					onClick={this.handleDetectLocation}
				>
					<MyLocation aria-label="Detect My Location" />
				</button>
				<div className="location-bar-wrapper" aria-busy={busy}>
					<SearchForm
						value={busy ? 'Loading...' : address}
						placeholder=""
						onChange={this.onChange}
						onClear={this.onClear}
						onSubmit={this.onSubmit}
					/>
				</div>
			</div>
		);
	}
}

Location.propTypes = {
	address: PropTypes.string.isRequired,
	setCoordinates: PropTypes.func.isRequired,
	onError: PropTypes.func.isRequired
};
