import React from 'react';

interface CurrencyInputProps {
	label: string;
	id: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ label, id, value, onChange }) => (
	<div className="flex flex-col p-4 justify-center items-center">
		<label htmlFor={id} className="m-1 font-bold blue-gradient_text">
			{label}
		</label>
		<input
			type="text"
			id={id}
			value={value}
			onChange={onChange}
			className="p-2 w-[160px] border border-gray-300 rounded"
			inputMode="decimal"
			pattern="^\d*\.?\d*$"
			title="Введите числовое значение"
			maxLength={18}
		/>
	</div>
);

export default CurrencyInput;
