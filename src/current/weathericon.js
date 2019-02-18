import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getWeatherPalette from '../shared/palette';

const Img = styled.img`
	height: 80%;
`;

export default function WeatherIcon(props) {
	const { weather, weatherMsg } = getWeatherPalette(props.icon);

	return <Img src={weather} alt={weatherMsg} />;
}

WeatherIcon.propTypes = {
	icon: PropTypes.string.isRequired
};

WeatherIcon.defaultProps = {
	icon: 'clear-day'
};
