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

const ForecastTimestamps = styled.span`
	width: ${props => (2 / props.maxTicks) * 100}%;
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

const Img = styled.img`
	height: 100%;
	margin: auto;

	@media (min-width: 769px) {
		display: ${props => (props.counter < 2 ? 'none' : '')};
	}

	@media (max-width: 768px) {
		display: ${props => (props.counter < 3 ? 'none' : '')};
	}
`;

function errorCheck(data, maxHours) {
	if (data.length < maxHours)
		throw new Error(
			`Cannot generate a ${maxHours} hour forecast bar, data is of length ${
				data.length
			}`
		);
	else if (maxHours < 1) {
		throw new Error('Cannot generate a forecast bar that is less than 1 hour');
	}
}

export function generateHourlyForecastBar(data, maxHours = 12) {
	errorCheck(data, maxHours);

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
					<Img src={weather} alt={weatherMsg} counter={weatherCounter} />
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
			<Img src={weather} alt={weatherMsg} counter={weatherCounter} />
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

export function extractHour(timestamp) {
	let merdiem = 'AM';
	let hour = new Date(timestamp * 1000).getHours();
	if (hour > 11) merdiem = 'PM';
	if (hour === 0 || hour === 12) hour = 12;
	else hour = hour % 12;

	return { hour, merdiem };
}

export function generateTimestamps(data, maxHours = 12, tickMarks = 12) {
	errorCheck(data, maxHours);
	if (tickMarks > maxHours)
		throw new Error(
			'Number of tick marks cannot be greater than number of availiable hours'
		);

	const container = [];

	let { hour, merdiem } = extractHour(data[0].time);
	container.push(
		<Timestamp
			key={`timestamp-${0}`}
			maxTicks={tickMarks}
			time={`${hour}${merdiem}`}
			temp={`${data[0].temperature.toFixed(0)}\u00b0`}
		/>
	);

	for (let i = 2; i < tickMarks; i += 2) {
		let { hour, merdiem } = extractHour(data[i].time);

		container.push(
			<Timestamp
				key={`timestamp-${i}`}
				maxTicks={tickMarks}
				time={`${hour}${merdiem}`}
				temp={`${data[0].temperature.toFixed(0)}\u00b0`}
			/>
		);
	}
	return container;
}

function Timestamp(props) {
	return (
		<ForecastTimestamps maxTicks={props.maxTicks}>
			<span className="hourly-timestamp-time">{props.time}</span>
			<span className="hourly-timestamp-temp">{props.temp}</span>
		</ForecastTimestamps>
	);
}

export default function HourlyForecast(props) {
	const forecastContainer = generateHourlyForecastBar(props.hourly.data, 24);
	const forecastTickMarks = generateHourlyTickMarks(24);
	const forcastTimestamps = generateTimestamps(props.hourly.data, 24, 24);

	return (
		<div className="hourly-forecast-wrapper">
			<span className="hourly-forecast-summary">{props.hourly.summary}</span>
			<div className="hourly-forecast-bar">{forecastContainer}</div>
			<div className="hourly-forecast-tickmarks">{forecastTickMarks}</div>
			<div className="hourly-forcast-timestamps">{forcastTimestamps}</div>
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
