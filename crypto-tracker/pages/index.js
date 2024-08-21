import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';
import 'tailwindcss/tailwind.css';

// Register ChartJS components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

// Tailwind CSS-based components
const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => (
    <button
        className={`px-4 py-2 text-lg rounded-md transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'
        }`}
        onClick={toggleDarkMode}
    >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
);

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="flex items-center space-x-2 mb-4">
            <input
                type="text"
                placeholder="Search cryptocurrency..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
                Search
            </button>
        </div>
    );
};

const CryptoCard = ({ crypto }) => {
    if (!crypto) return null;

    return (
        <div className="p-4 border rounded-md border-gray-300 mb-4">
            <h2 className="text-xl font-semibold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
            <p className="mt-2">Price: ${crypto.price.usd}</p>
            <p>Market Cap: ${crypto.market_cap.usd}</p>
            <p>24h Change: {crypto.price.usd_24h_change}%</p>
            <p>Volume: ${crypto.volume.usd}</p>
        </div>
    );
};

const PriceChart = ({ chartData }) => {
    if (!chartData) return null;

    const data = {
        labels: chartData.prices.map(point => new Date(point[0]).toLocaleDateString()),
        datasets: [{
            label: 'Price',
            data: chartData.prices.map(point => point[1]),
            borderColor: 'rgb(75,192,192)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
        }],
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Line data={data} options={{ responsive: true, plugins: { legend: { display: true } } }} />
        </div>
    );
};

export default function Home({ price, chart }) {
    const [crypto, setCrypto] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.className = isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900';
    }, [isDarkMode]);

    useEffect(() => {
        if (price && chart) {
            setCrypto({
                name: 'bitcoin',
                symbol: 'bitcoin',
                price: price['bitcoin'],
                market_cap: price['bitcoin'],
                volume: price['bitcoin'],
            });
            setChartData(chart);
        }
    }, [price, chart]);

    const handleSearch = async (query) => {
        try {
            const response = await fetch(`/api/crypto?ids=${query}&vs_currencies=usd`);
            const data = await response.json();
            setCrypto({
                name: query,
                symbol: query,
                price: data.price[query],
                market_cap: data.price[query],
                volume: data.price[query],
            });
            setChartData(data.chart);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className={`min-h-screen flex flex-col items-center p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
            <SearchBar onSearch={handleSearch} />
            <CryptoCard crypto={crypto} />
            <PriceChart chartData={chartData} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const { ids = 'bitcoin', vs_currencies = 'usd', days = '7' } = query;

    try {
        const priceResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
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

        return {
            props: {
                price: priceResponse.data,
                chart: chartResponse.data,
            },
        };
    } catch (error) {
        return {
            props: {
                error: error.message,
            },
        };
    }
}
