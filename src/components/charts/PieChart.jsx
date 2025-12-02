import { Pie } from 'react-chartjs-2';
import { composeOptions } from './BaseChart';
import './ChartRegistry.js';

export default function PieChart({ labels = [], values = [], colors, options = {} }) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors || [
          'rgba(229,57,53,0.8)',
          'rgba(251,140,0,0.8)',
          'rgba(30,136,229,0.8)',
          'rgba(67,160,71,0.8)',
          'rgba(156,39,176,0.8)'
        ],
        borderColor: ['#e53935','#fb8c00','#1e88e5','#43a047','#9c27b0'],
        borderWidth: 3,
        hoverOffset: 14,
        hoverBorderWidth: 4
      }
    ]
  };

  const finalOptions = composeOptions({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'bottom', 
        labels: { 
          color: '#424242', 
          font: { size: 11, weight: '600' }, 
          padding: 12, 
          boxWidth: 14,
          usePointStyle: true,
          pointStyle: 'circle'
        } 
      },
      tooltip: { 
        backgroundColor: 'rgba(33,33,33,0.95)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#e53935',
        borderWidth: 2,
        padding: 12,
        callbacks: { label: ctx => {
          const total = ctx.dataset.data.reduce((a,b)=>a+b,0);
          const val = ctx.parsed;
          const pct = ((val/total)*100).toFixed(1);
          return `${ctx.label}: ${val} (${pct}%)`;
        } } 
      },
      ...options.plugins
    },
    ...options
  });

  return <Pie data={data} options={finalOptions} />;
}
