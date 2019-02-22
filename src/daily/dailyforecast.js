import React from 'react';
import PropTypes from 'prop-types';
import getWeatherPalette from '../shared/palette';
import { UnfoldMore } from '../icons/index';
import './dailyforecast.css';

export function generateDailyForecast(data, days = 7) {
	if (days < 1)
		throw new Error("Cannot generate less than one days' worth of forecasts");
	if (data.length < days)
		throw new Error(
			`Cannot parse ${days} days of data, array only contains ${
				data.length
			} entries`
		);

	const container = [];
	for (let i = 1; i <= days; i++) {
		container.push(
			<DailyContainer key={`daily-weather-${i}`} data={data[i]} />
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

export default function DailyForecast(props) {
	const dailyForecast = generateDailyForecast(props.daily.data, 7);
	return <div className="daily-forecast-wrapper">{dailyForecast}</div>;
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
				precipType: PropTypes.string
			})
		)
	}).isRequired
};

export function DailyContainer(props) {
	const { weather, weatherMsg } = getWeatherPalette(props.data.icon);
	const day = getDay(props.data.time);
	return (
		<div className="daily-forecast-container" aria-label="Click to see details">
			<img className="daily-forecast-img" src={weather} alt={weatherMsg} />
			<span className="daily-forecast-day daily-forecast-text">{day}</span>
			<div className="daily-forecast-details">
				<span className="daily-forecast-detail-header">
					{'Low of: '}
					<span className="daily-forecast-detail-text">
						{`${props.data.temperatureMin.toFixed(0)}\u00b0`}
					</span>
				</span>

				<span className="daily-forecast-detail-header">
					{'High of: '}
					<span className="daily-forecast-detail-text">
						{`${props.data.temperatureMax.toFixed(0)}\u00b0`}
					</span>
				</span>

				<img
					className="daily-forecast-detail-unfold"
					src={UnfoldMore}
					alt="click to see details"
				/>
			</div>
		</div>
	);
}
