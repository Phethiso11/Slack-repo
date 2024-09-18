const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');

const app = express();
const port = 5001;

const cache = new NodeCache({ stdTTL: 300 }); // Cache for 5 minutes

app.use(cors());

app.get('/api/coins/markets', async (req, res) => {
    try {
        const { vs_currency = 'usd', order = 'market_cap_desc', per_page = 10, page = 1 } = req.query;
        const cacheKey = `markets_${vs_currency}_${order}_${per_page}_${page}`;
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return res.json(cachedData);
        }

        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: { vs_currency, order, per_page, page },
        });

        cache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching markets:', error.message);
        res.status(500).json({ error: 'Error fetching markets data' });
    }
});

app.get('/api/simple/price', async (req, res) => {
    try {
        const { ids, vs_currencies, include_market_cap, include_24hr_vol, include_24hr_change } = req.query;
        const cacheKey = `simple_price_${ids}_${vs_currencies}_${include_market_cap}_${include_24hr_vol}_${include_24hr_change}`;
        const cachedData = cache.get(cacheKey);

        if (cachedData) {
            return res.json(cachedData);
        }

        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
            params: { ids, vs_currencies, include_market_cap, include_24hr_vol, include_24hr_change },
        });

        cache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching simple price:', error.message);
        res.status(500).json({ error: 'Error fetching simple price data', details: error.message });
    }
});

app.get('/api/simple/price', async (req, res) => {
    try {
        const { ids, vs_currencies, include_market_cap, include_24hr_vol, include_24hr_change } = req.query;
        console.log('Request Params:', { ids, vs_currencies, include_market_cap, include_24hr_vol, include_24hr_change });

        // Existing code...
    } catch (error) {
        console.error('Error fetching simple price:', error.message);
        res.status(500).json({ error: 'Error fetching simple price data', details: error.message });
    }
});

app.get('/api/coins/:id/market_chart', async (req, res) => {
    const { id } = req.params;
    const { vs_currency, days } = req.query;
    console.log(`Fetching market chart for ${id} with vs_currency=${vs_currency} and days=${days}`);

    const cacheKey = `coins-${id}-market-chart-${vs_currency}-${days}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
        return res.json(cachedData);
    }

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
            params: { vs_currency, days },
        });
        cache.set(cacheKey, response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching market chart data:', error.message);
        res.status(500).json({ error: 'Error fetching market chart data', details: error.message });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
