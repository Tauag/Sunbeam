import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Weather from '../icons/weatherstate';

const Img = styled.img`
	height: 80%;
`;

export default function WeatherIcon(props) {
	const { weather, weatherMsg } = getIcon(props.icon);

	return <Img src={weather} alt={weatherMsg} />;
}

WeatherIcon.propTypes = {
	icon: PropTypes.string.isRequired
};

WeatherIcon.defaultProps = {
	icon: 'clear-day'
};

function getIcon(icon) {
	switch (icon) {
		case 'clear-day':
			return { weather: Weather.ClearDay, weatherMsg: 'clear day' };
		case 'clear-night':
			return { weather: Weather.ClearNight, weatherMsg: 'clear night' };
		case 'rain':
			return { weather: Weather.Rainy, weatherMsg: 'rain' };
		case 'snow':
			return { weather: Weather.Snowy, weatherMsg: 'snow' };
		case 'sleet':
			return { weather: Weather.Sleet, weatherMsg: 'sleet' };
		case 'wind':
			return { weather: Weather.Windy, weatherMsg: 'wind' };
		case 'fog':
			return { weather: Weather.Foggy, weatherMsg: 'fog' };
		case 'cloudy':
			return { weather: Weather.Cloudy, weatherMsg: 'cloudy' };
		case 'partly-cloudy-day':
			return {
				weather: Weather.PartlyCloudyDay,
				weatherMsg: 'partly cloudly daytime'
			};
		case 'partly-cloudy-night':
			return {
				weather: Weather.PartlyCloudyNight,
				weatherMsg: 'partly cloudly nighttime'
			};
		case 'hail':
			return { weather: Weather.Hail, weatherMsg: 'hail' };
		case 'thunderstorm':
			return { weather: Weather.Thunderstorm, weatherMsg: 'thunderstorm' };
		case 'tornado':
			return { weather: Weather.Tornado, weatherMsg: 'tornado' };
		default:
			// Eventually I will put in a default icon
			throw new Error(`${icon} does not exist in icon library`);
	}
}
