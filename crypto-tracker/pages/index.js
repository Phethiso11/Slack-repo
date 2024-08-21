import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title } from 'chart.js';

// Register ChartJS components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title);

// Inline styles for the components
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        transition: 'background-color 0.3s, color 0.3s',
    },
    darkMode: {
        backgroundColor: '#121212',
        color: '#ffffff',
    },
    lightMode: {
        backgroundColor: '#ffffff',
        color: '#000000',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '4px',
        margin: '10px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    cryptoCard: {
        padding: '20px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        margin: '10px',
    },
    chart: {
        width: '100%',
        maxWidth: '600px',
        margin: '20px auto',
    },
};

// Component to toggle dark mode
const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => (
    <button
        style={styles.button}
        onClick={toggleDarkMode}
    >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
);

// Component for search functionality
const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search cryptocurrency..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={styles.input}
            />
            <button
                onClick={handleSearch}
                style={styles.button}
            >
                Search
            </button>
        </div>
    );
};

// Component to display cryptocurrency information
const CryptoCard = ({ crypto }) => {
    if (!crypto) return null;

    return (
        <div style={styles.cryptoCard}>
            <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
            <p>Price: ${crypto.price?.usd}</p>
            <p>Market Cap: ${crypto.market_cap?.usd}</p>
            <p>24h Change: {crypto.price?.usd_24h_change}%</p>
            <p>Volume: ${crypto.volume?.usd}</p>
        </div>
    );
};

// Component to display price chart
const PriceChart = ({ chartData }) => {
    if (!chartData) return null;

    const data = {
        labels: chartData.prices.map(point => new Date(point[0]).toLocaleDateString()),
        datasets: [{
            label: 'Price',
            data: chartData.prices.map(point => point[1]),
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
        }],
    };

    return <div style={styles.chart}><Line data={data} /></div>;
};

// Main page component
export default function Home({ price, chart }) {
    const [crypto, setCrypto] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
        document.body.style.color = isDarkMode ? '#ffffff' : '#000000';
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
        <div style={isDarkMode ? styles.darkMode : styles.lightMode}>
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
            <SearchBar onSearch={handleSearch} />
            <CryptoCard crypto={crypto} />
            <PriceChart chartData={chartData} />
        </div>
    );
}

// Fetch data server-side
export async function getServerSideProps(context) {
    const { query } = context;
    const { ids = 'bitcoin', vs_currencies = 'usd', days = '7' } = query;

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
