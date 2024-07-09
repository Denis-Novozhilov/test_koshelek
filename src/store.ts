import { makeAutoObservable } from 'mobx';

class CurrencyStore {
	/**
	 *  Закомментированы дополнительные валюты
	 *  для проверки удобства работы с компонентом
	 *  и проверки удобства масштабирования
	 */

	currencies = [
		{ label: 'USD', id: 'usd' },
		{ label: 'EUR', id: 'eur' },
		// { label: 'RUB', id: 'rub' },
		// { label: 'CNY', id: 'cny' },
		// { label: 'AMD', id: 'amd' },
	];

	exchangeRates: Record<string, number> = {
		usd: 1,
		eur: 1.07,
		// rub: 0.014,
		// cny: 0.15,
		// amd: 0.0026,
	};

	values: Record<string, string> = {
		usd: '',
		eur: '',
		// rub: '',
		// cny: '',
		// amd: '',
	};

	debounceTimer: number | null = null;

	constructor() {
		makeAutoObservable(this);
	}

	setValue(currency: string, value: string) {
		const parsedValue = parseFloat(value);
		if (!isNaN(parsedValue)) {
			const limitedValue = parsedValue.toFixed(2);
			this.values[currency] = limitedValue.length > 17 ? limitedValue.slice(0, 17) : limitedValue;

			for (const key in this.values) {
				if (key !== currency) {
					const rate = this.exchangeRates[currency] / this.exchangeRates[key];
					const convertedValue = (parsedValue * rate).toFixed(2);
					this.values[key] =
						convertedValue.length > 17 ? convertedValue.slice(0, 17) : convertedValue;
				}
			}
		} else {
			for (const key in this.values) {
				this.values[key] = '';
			}
		}
	}

	debounceSetValue(currency: string, value: string) {
		if (this.debounceTimer) {
			clearTimeout(this.debounceTimer);
		}
		this.debounceTimer = window.setTimeout(() => {
			this.setValue(currency, value);
		}, 500);
	}
}

const currencyStore = new CurrencyStore();
export default currencyStore;
