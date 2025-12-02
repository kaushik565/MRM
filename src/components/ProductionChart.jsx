import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

export default function ProductionChart({ labels, data }) {
  return (
    <Line 
      data={{
        labels,
        datasets: [
          {
            label: 'Monthly Production',
            data,
            fill: true,
            tension: 0.4,
            borderColor: '#e53935',
            backgroundColor: 'rgba(229, 57, 53, 0.08)',
            pointRadius: 6,
            pointBackgroundColor: '#e53935',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: '#c62828',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 3,
            borderWidth: 3
          }
        ]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(33, 33, 33, 0.95)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#e53935',
            borderWidth: 2,
            padding: 12,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return 'Production: ' + context.parsed.y.toLocaleString();
              }
            }
          }
        },
        scales: { 
          y: { 
            ticks: { 
              color: '#424242',
              font: { size: 11, weight: '600' },
              callback: function(value) {
                return (value / 1000).toFixed(0) + 'K';
              }
            }, 
            grid: { 
              color: 'rgba(189, 189, 189, 0.15)',
              drawBorder: false
            },
            border: { display: false }
          }, 
          x: { 
            ticks: { 
              color: '#424242',
              font: { size: 11, weight: '600' }
            }, 
            grid: { display: false },
            border: { display: false }
          } 
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }}
    />
  );
}
