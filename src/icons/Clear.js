import React from 'react';

export default function Clear(props) {
	const { width, height, color, backgroundColor, ...others } = props;
	return (
		<div {...others} style={{ height: `${height}px`, width: `${width}px` }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width={width}
				height={height}
				viewBox="0 0 24 24"
			>
				<path
					d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
					fill={color}
				/>
				<path d="M0 0h24v24H0z" fill="none" />
			</svg>
		</div>
	);
}

Clear.defaultProps = {
	color: 'black',
	width: '24',
	height: '24'
};
