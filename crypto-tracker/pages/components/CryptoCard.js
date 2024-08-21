
const CryptoCard = ({ crypto }) => {
    if (!crypto) return null;

    return (
        <div>
            <h2>{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
            <p>Price: ${crypto.price.usd}</p>
            <p>Market Cap: ${crypto.market_cap.usd}</p>
            <p>24h Change: {crypto.price.usd_24h_change}%</p>
            <p>Volume: ${crypto.volume.usd}</p>
        </div>
    );
};

export default CryptoCard;
