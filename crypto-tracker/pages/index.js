import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, PointElement);

// Inline CSS styles
const styles = {
    container: (isDarkMode) => ({
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px',
        backgroundColor: isDarkMode ? '#1a202c' : '#ffffff',
        color: isDarkMode ? '#edf2f7' : '#1a202c',
        transition: 'background-color 0.3s, color 0.3s',
    }),
    button: (isDarkMode) => ({
        padding: '8px 16px',
        fontSize: '16px',
        borderRadius: '8px',
        backgroundColor: isDarkMode ? '#4a5568' : '#e2e8f0',
        color: isDarkMode ? '#edf2f7' : '#1a202c',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
    }),
    input: {
        padding: '8px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        outline: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    searchButton: {
        padding: '8px 16px',
        backgroundColor: '#3182ce',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    cryptoCard: {
        padding: '16px',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        marginBottom: '16px',
        maxWidth: '500px',
        width: '100%',
    },
    chartContainer: {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
    },
};

// Component for Dark Mode Toggle
const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <button
            style={styles.button(isDarkMode)}
            onClick={toggleDarkMode}
        >
            {isDarkMode ? '🔆Light Mode' : '🌙Dark Mode'}
        </button>
    );
};


// Component for Search Bar
const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query.toLowerCase());
        }
    };

    return (
        <div className="flex items-center space-x-2 mb-4">
            <input
                type="text"
                placeholder="Search cryptocurrency..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={styles.input}
            />
            <button
                onClick={handleSearch}
                style={styles.searchButton}
            >
                Search
            </button>
        </div>
    );
};

// Component for Crypto Card
const CryptoCard = ({ crypto }) => {
    if (!crypto) return null;

    return (
        <div style={styles.cryptoCard}>
            <h2 className="text-xl font-semibold">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
            <p className="mt-2">Price: ${crypto.price.usd}</p>
            <p>Market Cap: ${crypto.market_cap.usd}</p>
            <p>24h Change: {crypto.price.usd_24h_change}%</p>
            <p>Volume: ${crypto.volume.usd}</p>
        </div>

    );
};



// Component for Price Chart
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

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true
            }
        }
    };

    return (
        <div style={styles.chartContainer}>
            <Line data={data} options={options} />
        </div>
    );
};

export default function Home() {
    const [crypto, setCrypto] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Toggle dark mode on client-side only
    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    // Handle search and fetch data
    const handleSearch = async (query) => {
        try {
            // Fetch price data
            const priceResponse = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: query,
                    vs_currencies: 'usd',
                    include_market_cap: 'true',
                    include_24hr_vol: 'true',
                    include_24hr_change: 'true',
                },
            });

            // Check if the cryptocurrency exists
            if (!priceResponse.data[query]) {
                setCrypto(null);
                setChartData(null);
                alert('Cryptocurrency not found. Please try a different search term.');
                return;
            }

            // Fetch chart data
            const chartResponse = await axios.get(`https://api.coingecko.com/api/v3/coins/${query}/market_chart`, {
                params: {
                    vs_currency: 'usd',
                    days: '7',
                },
            });

            // Update state with fetched data
            setCrypto({
                name: query,
                symbol: query,
                price: priceResponse.data[query],
                market_cap: priceResponse.data[query],
                volume: priceResponse.data[query],
            });
            setChartData(chartResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error.response ? error.response.data : error.message);
            setCrypto(null);
            setChartData(null);
            alert('Error fetching data. Please try again later.');
        }
    };

    return (
        <div style={styles.container(isDarkMode)}>
            <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
            <SearchBar onSearch={handleSearch} />
            <CryptoCard crypto={crypto} />
            <PriceChart chartData={chartData} />
        </div>
    );
}
