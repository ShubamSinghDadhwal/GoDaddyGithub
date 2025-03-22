import React from 'react';
import './styles.css';

const NoData = (({ msg = '' }) => {
	return (
		<section className="noDataWrapper">
			<div className='noDataTxt'>
				{msg || 'Sorry! No data found.'}
			</div>
		</section>
	);
});

export { NoData };
