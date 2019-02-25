import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { handleDarkSkyCall } from '../shared/getdata';
import HourlyForecast from '../hourly/hourlyforecast';
import { CoordinatesContext } from '../App';
import './dailyforecastdetails.css';

const MoreDetailWrapper = styled.div`
	max-height: ${props => (props.expanded ? 300 : 0)}px;
	transition: max-height 0.5s;
	border-bottom: ${props =>
		props.bottomBorder !== 'exited' ? '#e0e0e0 1px solid' : 'none'};
	margin-bottom: ${props => (props.bottomBorder ? 10 : 0)}px
	overflow: hidden;
	font-size: 14pt;

	@media (max-width: 768px) {
		font-size: 12pt;
	}
	@media (max-width: 550px) {
		font-size: 10pt;
	}
`;

function DailyForecastDetail(props) {
	const [hourly, setHourly] = useState({});
	const coordinates = useContext(CoordinatesContext);
	const flag = props.show === 'entering' || props.show === 'entered';

	useEffect(() => {
		handleDarkSkyCall({ ...coordinates, time: props.day.time }, data => {
			if (data.hourly) setHourly(data.hourly);
		});
	}, [coordinates.lat, coordinates.lng]);

	return (
		<MoreDetailWrapper expanded={flag} bottomBorder={props.show}>
			{props.show !== 'exited' ? (
				<div className="daily-detail-container">
					<span className="daily-detail-summary">{props.day.summary}</span>
					<div className="daily-detail-banner">
						<span className="daily-detail-header">
							Humidity:{' '}
							<span className="daily-detail-body">
								{(props.day.humidity * 100).toFixed(0)}%
							</span>
						</span>
						<span className="daily-detail-header">
							Wind Speed:{' '}
							<span className="daily-detail-body">
								{props.day.windSpeed.toFixed(0)}mph
							</span>
						</span>
						<span className="daily-detail-header">
							UV Index:{' '}
							<span className="daily-detail-body">{props.day.uvIndex}</span>
						</span>
					</div>
					<div className="daily-detail-hourly-wrapper">
						{hourly.data ? (
							<HourlyForecast disableSummary hourly={hourly} />
						) : null}
					</div>
				</div>
			) : null}
		</MoreDetailWrapper>
	);
}

DailyForecastDetail.propTypes = {
	show: PropTypes.string.isRequired,
	day: PropTypes.shape({
		time: PropTypes.number.isRequired,
		summary: PropTypes.string.isRequired,
		icon: PropTypes.string.isRequired,
		precipProbability: PropTypes.number.isRequired,
		temperatureMin: PropTypes.number.isRequired,
		temperatureMax: PropTypes.number.isRequired,
		uvIndex: PropTypes.number.isRequired,
		precipType: PropTypes.string
	}).isRequired
};

export default DailyForecastDetail;
