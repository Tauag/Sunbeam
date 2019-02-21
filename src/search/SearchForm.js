import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './SearchForm.css';
import Search from '../icons/Search';
import Clear from '../icons/Clear';

const Form = styled.form`
	display: flex;
	border: ${props => (props.focused ? '1px black' : '1px #757578')} solid;
	border-radius: 10px;
	margin: 0px 5px 0px 5px;
	overflow: hidden;
	padding-left: 10px;
	box-shadow: ${props =>
		props.focused ? '0 2px 4px rgba(0, 0, 0, 0.25) !important;' : 'none'};

	&:hover {
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
	}
`;
const Span = styled.span`
	font-size: 12px;
	font-weight: ${props => (props.focused ? '500' : '400')};
	color: ${props => (props.focused ? 'black' : '#757578')};
	min-height: 15px;
	text-align: left;
	padding: 0px 42px 2px 11px;
	margin: 0px 5px 0px 5px;
`;

export default function SearchForm(props) {
	const [focused, setFocused] = useState(false);
	const ref = useRef(null);
	const clear = e => {
		props.onClear(e);
		ref.current.focus();
	};
	const trigger = props.value.length > 0;

	return (
		<div className="search-form-wrapper">
			<Span className={trigger && 'fadein-animate'} focused={focused}>
				{trigger > 0 && props.placeholder}
			</Span>
			<Form
				focused={focused}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				onSubmit={props.onSubmit}
			>
				<input
					ref={ref}
					className="search-input"
					type="text"
					value={props.value}
					onChange={props.onChange}
					placeholder={props.placeholder}
					aria-required={true}
					aria-label={props.placeholder}
				/>
				<label className="search-form-clear search-form-icon">
					<div onClick={clear} aria-label="Clear Search Entry">
						{trigger && (
							<Clear className="fadein-animate clear-icon" color="#707070" />
						)}
					</div>
				</label>
				<label
					className="search-form-icon search-form-submit"
					onClick={props.onSubmit}
					aria-label="Execute Location Search"
				>
					<Search color="white" />
				</label>
			</Form>
		</div>
	);
}

SearchForm.propTypes = {
	value: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onClear: PropTypes.func.isRequired
};

SearchForm.defaultProps = {
	placeholder: ''
};
