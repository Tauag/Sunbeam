import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import getWeatherPalette from '../shared/palette';
import './hourlyforecast.css';

const ForecastHour = styled.span`
	width: ${props => (props.hours / props.maxHours) * 100}%;
	height: 50px;
	background-color: ${props => props.color};
	overflow: hidden;
`;

const ForecastTicks = styled.span`
	width: ${props => (1 / props.maxHours) * 100}%;
	height: ${props => (props.extended ? '100%' : '50%')};
	align-self: flex-start;
	margin-left: ${props => (1 / (props.maxHours * 2)) * 100}%;
	border-left: #7f7f81 1px solid;
`;

export function generateHourlyForecastBar(data, maxHours = 12) {
	if (data.length < maxHours)
		throw new Error(
			`Cannot generate a ${maxHours} hour forecast bar, data is of length ${
				data.length
			}`
		);
	else if (maxHours < 1) {
		throw new Error('Cannot generate a forecast bar that is less than 1 hour');
	}

	const container = [];
	var weatherIcon = data[0].icon;
	var weatherSummary = data[0].summary;
	var weatherCounter = 1;

	for (let i = 1; i < maxHours; i++) {
		let icon = data[i].icon;
		let { color, weather, weatherMsg } = getWeatherPalette(weatherIcon);
		if (icon !== weatherIcon) {
			container.push(
				<ForecastHour
					key={`hourly-part-${i}`}
					hours={weatherCounter}
					maxHours={maxHours}
					color={color}
					aria-label={weatherSummary}
				>
					{weatherCounter > 1 && (
						<img
							className="hourly-forecast-img"
							src={weather}
							alt={weatherMsg}
						/>
					)}
				</ForecastHour>
			);

			weatherIcon = icon;
			weatherSummary = data[i].summary;
			weatherCounter = 1;
		} else {
			weatherCounter += 1;
		}
	}

	let { color, weather, weatherMsg } = getWeatherPalette(weatherIcon);
	container.push(
		<ForecastHour
			key={`hourly-img-${maxHours}`}
			hours={weatherCounter}
			maxHours={maxHours}
			color={color}
			aria-label={weatherSummary}
		>
			{weatherCounter > 1 && (
				<img className="hourly-forecast-img" src={weather} alt={weatherMsg} />
			)}
		</ForecastHour>
	);

	return container;
}

export function generateHourlyTickMarks(maxHours = 12) {
	const container = [];
	for (let i = 0; i < maxHours; i++) {
		container.push(
			<ForecastTicks
				key={`tick-${i}`}
				maxHours={maxHours}
				extended={i % 2 === 0}
			/>
		);
	}

	return container;
}

export default function HourlyForecast(props) {
	const forecastContainer = generateHourlyForecastBar(props.hourly.data, 24);
	const forecastTickMarks = generateHourlyTickMarks(24);

	return (
		<div className="hourly-forecast-wrapper">
			<span className="hourly-forecast-summary">{props.hourly.summary}</span>
			<div className="hourly-forecast-bar">{forecastContainer}</div>
			<div className="hourly-forecast-tickmarks">{forecastTickMarks}</div>
		</div>
	);
}

HourlyForecast.propTypes = {
	hourly: PropTypes.shape({
		summary: PropTypes.string.isRequired,
		data: PropTypes.arrayOf(
			PropTypes.shape({
				time: PropTypes.number.isRequired,
				icon: PropTypes.string.isRequired,
				temperature: PropTypes.number.isRequired
			})
		)
	}).isRequired
};
