
import axios from 'axios';

export default async function handler(req, res) {
    const { query } = req;
    const { ids = '', vs_currencies = 'usd', days = '7' } = query;

    try {
        const priceResponse = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
            params: {
                ids,
                vs_currencies,
                include_market_cap: 'true',
                include_24hr_vol: 'true',
                include_24hr_change: 'true',
            },
        });

        const chartResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${ids}/market_chart`, {
            params: {
                vs_currency: vs_currencies,
                days,
            },
        });

        res.status(200).json({
            price: priceResponse.data,
            chart: chartResponse.data,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
