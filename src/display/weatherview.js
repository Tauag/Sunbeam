import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CurrentCard from '../current/currentcard';
import Alert from '../alert/alert';
import HourlyForecast from '../hourly/hourlyforecast';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
	width: 100%;
	margin: 20px 0px 20px 0px;
	overflow: hidden;
`;

export default function WeatherView(props) {
	const data = props.data;

	// function convertUnixToDate(unixTime) {
	// 	const date = new Date(unixTime * 1000);
	// 	return date.toLocaleDateString();
	// }

	return Object.keys(data).length > 0 ? (
		<Wrapper>
			<Alert alerts={data.alerts} />
			<CurrentCard current={data.currently} />
			<HourlyForecast hourly={data.hourly} />
		</Wrapper>
	) : (
		<Wrapper> No Data </Wrapper>
	);
}

WeatherView.propTypes = {
	data: PropTypes.object.isRequired
};
