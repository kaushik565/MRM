import { Bar } from 'react-chartjs-2';
import { composeOptions } from './BaseChart';
import './ChartRegistry.js';

// Expects datasets: [{ label, data, backgroundColor }...]
export default function StackedBarChart({ labels = [], datasets = [], options = {} }) {
  const data = { labels, datasets: datasets.map(ds => ({ ...ds, borderWidth: 2, borderRadius: 6, borderSkipped: false })) };

  const finalOptions = composeOptions({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { 
        stacked: true, 
        ticks: { color: '#424242', font: { size: 11, weight: '600' } }, 
        grid: { color: 'rgba(189,189,189,0.12)', drawBorder: false },
        border: { display: false }
      },
      y: { 
        stacked: true, 
        ticks: { color: '#424242', font: { size: 11, weight: '600' } }, 
        grid: { color: 'rgba(189,189,189,0.15)', drawBorder: false },
        border: { display: false }
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#424242',
          font: { size: 11, weight: '600' },
          padding: 14,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8
        }
      },
      tooltip: { 
        backgroundColor: 'rgba(33,33,33,0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#e53935',
        borderWidth: 2,
        padding: 12,
        callbacks: { label: ctx => `${ctx.dataset.label}: ${ctx.parsed.y}` } 
      },
      ...options.plugins
    },
    ...options
  });

  return <Bar data={data} options={finalOptions} />;
}
