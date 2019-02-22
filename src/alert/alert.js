import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Warning from '../icons/Warning';
import './alert.css';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 10px;
	max-width: 90%;
`;

const LinkWrapper = styled.span`
	display: flex;
	align-items: center;
	padding: 0px 10px;
	height: 34px;
	line-height: 34px;
	border: transparent 1px solid;

	:hover {
		border: #ff1744 1px solid;
		border-radius: 10px;
	}
`;

export default function Alert(props) {
	const { alerts } = props;
	if (!alerts) return null;
	const weatherAlerts = [];

	for (let i = 0; i < alerts.length; i++) {
		weatherAlerts.push(
			<SingleAlert
				key={`weather-alert-${i}`}
				title={alerts[i].title}
				url={alerts[i].uri}
			/>
		);
	}
	return <Wrapper>{weatherAlerts}</Wrapper>;
}

function SingleAlert(props) {
	return (
		<LinkWrapper>
			<Warning color="#ff1744" />
			<a
				className="alert-warning"
				href={props.url}
				target="_blank"
				rel="noopener noreferrer"
			>
				{props.title}
			</a>
		</LinkWrapper>
	);
}

SingleAlert.propTypes = {
	title: PropTypes.string.isRequired,
	url: PropTypes.string
};
