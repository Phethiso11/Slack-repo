import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, Title, PointElement);

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
        <div className="w-full max-w-4xl mx-auto">
            <Line data={data} options={options} />
        </div>
    );
};
export default PriceChart;
