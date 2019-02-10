import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './currentcard.css';
import WeatherIcon from './weathericon';

const Banner = styled.div`
	flex-direction: ${props => props.flexDirection};
	justify-content: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	height: 100%;

	@media (min-width: 501px) {
		display: ${props => (props.small ? 'none' : 'flex')};
	}
	@media (max-width: 500px) {
		display: ${props => (props.small ? 'flex' : 'none')};
	}
`;

export function fToC(temp) {
	return ((temp - 32) * (5 / 9)).toFixed(0);
}

export default function CurrentCard(props) {
	const {
		temperature,
		summary,
		icon,
		humidity,
		windSpeed,
		uvIndex
	} = props.current;

	const displayTemp =
		props.unit === 'c' ? fToC(parseFloat(temperature)) : temperature.toFixed(0);

	return (
		<div className="current-card-set">
			<div className="current-card-wrapper">
				<WeatherIcon icon={icon} />
				<div className="current-card-info">
					<span className="current-card-temp">{displayTemp}&#176;</span>
					<span className="current-card-weather">{summary}</span>
				</div>
				<Banner flexDirection="column">
					<BannerItem title="Humidity" body={`${humidity * 100}%`} />
					<BannerItem title="Wind Speed" body={`${windSpeed.toFixed(0)}mph`} />
					<BannerItem title="UV Index" body={`${uvIndex}`} />
				</Banner>
			</div>
			<Banner flexDirection="row" small>
				<BannerItem title="Humidity" body={`${humidity * 100}%`} />
				<BannerItem title="Wind Speed" body={`${windSpeed.toFixed(0)}mph`} />
				<BannerItem title="UV Index" body={`${uvIndex}`} />
			</Banner>
		</div>
	);
}

CurrentCard.propTypes = {
	current: PropTypes.shape({
		temperature: PropTypes.number.isRequired,
		summary: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		humidity: PropTypes.number.isRequired,
		windSpeed: PropTypes.number.isRequired,
		uvIndex: PropTypes.number.isRequired
	}).isRequired,
	unit: PropTypes.string
};

CurrentCard.defaultProps = {
	unit: 'f'
};

function BannerItem(props) {
	return (
		<div className="current-card-banner-component">
			<span className="current-card-banner-body current-card-banner-subtitle">
				{`${props.title}: `}
			</span>
			<span className="current-card-banner-body">{props.body}</span>
		</div>
	);
}

BannerItem.propTypes = {
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired
};
