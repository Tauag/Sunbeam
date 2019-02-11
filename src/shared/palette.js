import * as Weather from '../icons/weatherstate';

export default function getWeatherPalette(weatherType) {
	switch (weatherType) {
		case 'clear-day':
			return {
				weather: Weather.ClearDay,
				weatherMsg: 'clear day',
				color: '#ffc107',
				fontColor: 'black'
			};
		case 'clear-night':
			return {
				weather: Weather.ClearNight,
				weatherMsg: 'clear night',
				color: '#ffc107',
				fontColor: 'black'
			};
		case 'rain':
			return {
				weather: Weather.Rainy,
				weatherMsg: 'rain',
				color: '#66656B',
				fontColor: 'white'
			};
		case 'snow':
			return {
				weather: Weather.Snowy,
				weatherMsg: 'snow',
				color: '#00e5ff',
				fontColor: 'white'
			};
		case 'sleet':
			return {
				weather: Weather.Sleet,
				weatherMsg: 'sleet',
				color: '#00a0b2',
				fontColor: 'white'
			};
		case 'wind':
			return {
				weather: Weather.Windy,
				weatherMsg: 'wind',
				color: '#89888C',
				fontColor: 'white'
			};
		case 'fog':
			return {
				weather: Weather.Foggy,
				weatherMsg: 'fog',
				color: '#5f5f62',
				fontColor: 'white'
			};
		case 'cloudy':
			return {
				weather: Weather.Cloudy,
				weatherMsg: 'cloudy',
				color: '#89888C',
				fontColor: 'white'
			};
		case 'partly-cloudy-day':
			return {
				weather: Weather.PartlyCloudyDay,
				weatherMsg: 'partly cloudly daytime',
				color: '#a09fa3',
				fontColor: 'white'
			};
		case 'partly-cloudy-night':
			return {
				weather: Weather.PartlyCloudyNight,
				weatherMsg: 'partly cloudly nighttime',
				color: '#a09fa3',
				fontColor: 'white'
			};
		case 'hail':
			return {
				weather: Weather.Hail,
				weatherMsg: 'hail',
				color: '#00a0b2',
				fontColor: 'white'
			};
		case 'thunderstorm':
			return {
				weather: Weather.Thunderstorm,
				weatherMsg: 'thunderstorm',
				color: '#66656B',
				fontColor: 'white'
			};
		case 'tornado':
			return {
				weather: Weather.Tornado,
				weatherMsg: 'tornado',
				color: '#b2102f',
				fontColor: 'white'
			};
		default:
			// Eventually I will put in a default icon
			throw new Error(`${weatherType} is not a supported Weather Type`);
	}
}
