
import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CryptoCard from '../components/CryptoCard';
import PriceChart from '../components/PriceChart';
import DarkModeToggle from '../components/DarkModeToggle';

export default function Home() {
    const [crypto, setCrypto] = useState(null);
    const [chartData, setChartData] = useState(null);

    const handleSearch = async (query) => {
        try {
            const response = await fetch(`/api/crypto?ids=${query}&vs_currencies=usd`);
            const data = await response.json();
            setCrypto({
                name: query,
                symbol: query,
                price: data.price[query],
                market_cap: data.price[query].usd_market_cap,
                volume: data.price[query].usd_24h_vol,
            });
            setChartData(data.chart);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <DarkModeToggle />
            <SearchBar onSearch={handleSearch} />
            <CryptoCard crypto={crypto} />
            <PriceChart chartData={chartData} />
        </div>
    );
}
