import { Chart as ChartJS } from 'chart.js';
import {
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Filler
);

// Importing this module anywhere ensures required elements are registered.