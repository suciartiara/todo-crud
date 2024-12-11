// resources/js/Pages/Components/Chart.jsx

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Chart() {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Completed Tasks",
                data: [12, 19, 3, 5, 2, 3],
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
            },
            {
                label: "New Tasks",
                data: [15, 10, 8, 12, 7, 9],
                borderColor: "rgb(255, 99, 132)",
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
}
