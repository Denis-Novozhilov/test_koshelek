import React from 'react';
import { observer } from 'mobx-react-lite';
import currencyStore from '../store';
import CurrencyInput from './CurrencyInput';

const CurrencyConverter: React.FC = observer(() => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		if ((/^\d*\.?\d*$/.test(value) || value === '') && value.length <= 18) {
			currencyStore.values[id] = value;
			currencyStore.debounceSetValue(id, value);
		}
	};

	return (
		<div className="flex flex-col justify-start gap-4 items-center">
			<div className="flex flex-col sm:flex-row justify-center items-center min-w-[220px] animate-fadeIn">
				{currencyStore.currencies.map((innerCurrency, index) => (
					<CurrencyInput
						key={`${innerCurrency.id}-${index}`}
						label={innerCurrency.label}
						id={innerCurrency.id}
						value={currencyStore.values[innerCurrency.id]}
						onChange={handleInputChange}
					/>
				))}
			</div>
		</div>
	);
});

export default CurrencyConverter;
