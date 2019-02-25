import axios from 'axios';

export function handleDarkSkyCall(data, dispatch, handleError = () => {}) {
	const { lat, lng, time } = data;

	return new Promise((resolve, reject) => {
		axios(
			`${process.env.REACT_APP_SUNBEAMAPI}/weather?lat=${lat}&lng=${lng}${
				time ? `&time=${time}` : ''
			}`
		)
			.then(response => {
				const data = response.data;
				if (data.status && data.status === 'FAILED') {
					handleError('darksky', response.data);
					reject();
					return;
				}
				dispatch(data);
				resolve();
			})
			.catch(error => {
				handleError('darksky', error);
				reject();
			});
	});
}
