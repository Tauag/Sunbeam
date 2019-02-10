import { IPStackData, WeatherData, LocationData } from '../__test_data__';

function returnMockData(url) {
	if (url.includes('/locate')) return LocationData;
	else if (url.includes('api.ipstack.com/check')) return IPStackData;
	else if (url.includes('/weather')) return WeatherData;
	else return {};
}

module.exports = {
	get: url => {
		return Promise.resolve({ data: returnMockData(url) });
	}
};
