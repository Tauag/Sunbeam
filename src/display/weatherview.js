import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CurrentCard from '../current/currentcard';
import Alert from '../alert/alert';
import HourlyForecast from '../hourly/hourlyforecast';
import DailyForecast from '../daily/dailyforecast';

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

const HourlyWrapper = styled.div`
	width: 90%;
	max-width: 900px;
`;

function WeatherView(props) {
	const data = props.data;

	return Object.keys(data).length > 0 ? (
		<Wrapper>
			<Alert alerts={data.alerts} />
			<CurrentCard current={data.currently} />
			<HourlyWrapper>
				<HourlyForecast hourly={data.hourly} />
			</HourlyWrapper>
			<DailyForecast daily={data.daily} />
		</Wrapper>
	) : (
		<Wrapper> No Data </Wrapper>
	);
}

WeatherView.propTypes = {
	data: PropTypes.object.isRequired
};

export default WeatherView;
