import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';
import DailyForecastDetail from './dailyforecastdetails';
import getWeatherPalette from '../shared/palette';
import { UnfoldMore, UnfoldLess } from '../icons/index';
import './dailyforecast.css';

const DetailContainer = styled.div`
	width: 100%;
	height: 65px;
	display: flex;
	flex-flow: row nowrap;
	border-radius: 10px;
	overflow: hidden;
	font-size: 12pt;
	background-color: ${props => (props.expanded ? '#e0e0e0' : '#fff')};

	&:hover {
		background-color: #e0e0e0;
	}
`;

export function generateDailyForecast(daily, days = 7) {
	if (days < 1)
		throw new Error("Cannot generate less than one days' worth of forecasts");
	if (daily.length < days)
		throw new Error(
			`Cannot parse ${days} days of data, array only contains ${
				daily.length
			} entries`
		);

	const container = [];
	for (let i = 1; i <= days; i++) {
		container.push(
			<DailyContainer key={`daily-weather-${i}`} day={daily[i]} />
		);
	}

	return container;
}

export function getDay(timestamp) {
	const day = new Date(timestamp * 1000).getDay();

	switch (day) {
		case 0:
			return 'Sun';
		case 1:
			return 'Mon';
		case 2:
			return 'Tue';
		case 3:
			return 'Wed';
		case 4:
			return 'Thu';
		case 5:
			return 'Fri';
		case 6:
			return 'Sat';
		default:
			return 'Err';
	}
}

function DailyForecast(props) {
	const dailyForecast = generateDailyForecast(props.daily.data, 7);
	return props.daily.data ? (
		<div className="daily-forecast-wrapper">{dailyForecast}</div>
	) : null;
}

DailyForecast.propTypes = {
	daily: PropTypes.shape({
		summary: PropTypes.string,
		icon: PropTypes.string,
		data: PropTypes.arrayOf(
			PropTypes.shape({
				time: PropTypes.number.isRequired,
				summary: PropTypes.string.isRequired,
				icon: PropTypes.string.isRequired,
				precipProbability: PropTypes.number.isRequired,
				temperatureMin: PropTypes.number.isRequired,
				temperatureMax: PropTypes.number.isRequired,
				uvIndex: PropTypes.number.isRequired,
				precipType: PropTypes.string
			})
		)
	}).isRequired
};

export function DailyContainer(props) {
	const [expanded, setExpanded] = useState(false);
	const { weather, weatherMsg } = getWeatherPalette(props.day.icon);
	const day = getDay(props.day.time);

	return (
		<div className="daily-forecast-detail-wrapper">
			<DetailContainer
				expanded={expanded}
				aria-label="Click to see details"
				onClick={() => {
					setExpanded(!expanded);
				}}
			>
				<img className="daily-forecast-img" src={weather} alt={weatherMsg} />
				<span className="daily-forecast-day daily-forecast-text">{day}</span>
				<div className="daily-forecast-details">
					<span className="daily-forecast-detail-header">
						{'Low of: '}
						<span className="daily-forecast-detail-text">
							{`${props.day.temperatureMin.toFixed(0)}\u00b0`}
						</span>
					</span>

					<span className="daily-forecast-detail-header">
						{'High of: '}
						<span className="daily-forecast-detail-text">
							{`${props.day.temperatureMax.toFixed(0)}\u00b0`}
						</span>
					</span>

					{expanded ? (
						<img
							className="daily-forecast-detail-unfold"
							src={UnfoldLess}
							alt="click to close details"
						/>
					) : (
						<img
							className="daily-forecast-detail-unfold"
							src={UnfoldMore}
							alt="click to see details"
						/>
					)}
				</div>
			</DetailContainer>
			<Transition in={expanded} timeout={500}>
				{state => <DailyForecastDetail show={state} day={props.day} />}
			</Transition>
		</div>
	);
}

export default DailyForecast;
