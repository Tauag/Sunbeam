import React from 'react';
import { shallow } from 'enzyme';
import Location, { checkIPStackObject } from './Location';
import { IPStackData } from '../__test_data__';

describe('Render and Value Tests for Location', () => {
	var coordinates = { lat: 0, lng: 0 };
	var errorMsg = '';
	function setCoordinates(coords) {
		coordinates = coords;
	}
	function onError(error, erroObj) {
		errorMsg = error;
	}
	const wrapper = shallow(
		<Location
			address="Test Address"
			setCoordinates={setCoordinates}
			onError={onError}
		/>
	);
	const instance = wrapper.instance();

	test('Location and SearchForm correctly renders', () => {
		expect(wrapper.exists()).toBe(true);
		expect(instance).toBeInstanceOf(Location);
		expect(wrapper.find('.location-bar-wrapper>SearchForm').exists()).toBe(
			true
		);
	});

	test('setGeoData function sets Location state and calls setCoordinates prop', () => {
		expect(wrapper.state('address')).not.toBe('Changed Address');
		expect(coordinates).not.toEqual({ lat: 1, lng: 1 });
		instance.setGeoData('Changed Address', { lat: 1, lng: 1 });
		expect(wrapper.state('address')).toBe('Changed Address');
		expect(coordinates).toEqual({ lat: 1, lng: 1 });
	});

	test('handleGeoCodeCall sets Location state and calls setCoordinates prop', () => {
		expect(wrapper.state('address')).not.toBe('New York, NY, USA');
		expect(coordinates).not.toEqual({ lat: 40.7127753, lng: -74.0059728 });
		instance.handleGeoCodeCall().then(
			() => {
				expect(wrapper.state('address')).toBe('New York, NY, USA');
				expect(coordinates).toEqual({ lat: 40.7127753, lng: -74.0059728 });
			},
			error => {
				expect(error).toBe('Promise was rejected');
			}
		);
		expect.assertions(4);
	});

	test('handleIPStackCall sets Location state and calls setCoordinates prop', () => {
		expect(wrapper.state('address')).not.toBe('Paris, IDF, FR');
		expect(coordinates).not.toEqual({ lat: 48.8574, lng: 2.3795 });
		instance.handleIPStackCall().then(
			() => {
				expect(wrapper.state('address')).toBe('Paris, IDF, FR');
				expect(coordinates).toEqual({ lat: 48.8574, lng: 2.3795 });
			},
			error => {
				expect(error).toBe('Promise was rejected');
			}
		);
		expect.assertions(4);
	});
});

describe('IPStack Error Check Function', () => {
	test('Valid Data', () => {
		expect(checkIPStackObject(IPStackData)).toBe(true);
	});

	test('Invalid Data', () => {
		const invalidTestData = {
			city: null,
			region_code: null,
			country_code: null,
			latitude: null,
			longitude: null
		};

		expect(checkIPStackObject(invalidTestData)).toBe(false);
	});
});
