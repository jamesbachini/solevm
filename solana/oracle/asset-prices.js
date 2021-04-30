const fetch = require('node-fetch');

const marketData = {};

const round = (num,decimals=8,down=false) => {
	if (typeof num !== 'number') num = parseFloat(num);
	const multiplier = 10 ** decimals;
	let roundedNumber = Math.round(num * multiplier) / multiplier;
	if (down) roundedNumber = Math.floor(num * multiplier) / multiplier;
	return Number(roundedNumber);
}

const updatePrices = async () => {
	const res1Promise = fetch(`https://api.binance.com/api/v3/ticker/24hr`).catch(err => utils.errorLog(err));
	const res1 = await res1Promise;
	const json = await res1.json().catch(err => utils.errorLog(err));
	if (!json) return false;
	json.forEach((coinData) => {
		if (!coinData.symbol || coinData.symbol.substr(coinData.symbol.length - 4) !== 'USDT') return false;
		const sym = coinData.symbol.split('USDT').join('');
		if (!marketData[sym]) return false;
		marketData[sym].price = round(coinData.lastPrice);
	});
	return false;
}

updatePrices();