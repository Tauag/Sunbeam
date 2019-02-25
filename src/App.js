import React, { useReducer, createContext, useLayoutEffect } from 'react';
import { handleDarkSkyCall } from './shared/getdata';
import Location from './search/Location';
import WeatherView from './display/weatherview';
import './App.css';

export const CoordinatesContext = createContext();

const initialState = {
	coordinates: { lat: 40.7127753, lng: -74.0059728 },
	data: {}
};

function reducer(state, action) {
	switch (action.type) {
		case 'UPDATE COORDINATES':
			return { ...state, coordinates: action.payload };
		case 'UPDATE DATA':
			return { ...state, data: action.payload };
		default:
			return state;
	}
}

function handleError(errorSource, errorObj) {
	return true; // placeholder
	/* Need to display some sort of error message on the application
	geocode
	geolocate
	weather
	failed response
	missing features */
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);

	useLayoutEffect(() => {
		handleDarkSkyCall(
			state.coordinates,
			data => {
				dispatch({ type: 'UPDATE DATA', payload: data });
			},
			handleError
		).catch(() => {
			return true;
		});
	}, [state.coordinates]);

	return (
		<div className="app">
			<Location
				address="New York, NY, USA"
				setCoordinates={coords => {
					dispatch({ type: 'UPDATE COORDINATES', payload: coords });
				}}
				onError={handleError}
			/>
			<CoordinatesContext.Provider value={state.coordinates}>
				<WeatherView data={state.data} />
			</CoordinatesContext.Provider>
		</div>
	);
}

export default App;
