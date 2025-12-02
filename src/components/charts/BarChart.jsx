import { Bar } from 'react-chartjs-2';
import { buildDataset, composeOptions } from './BaseChart';
import './ChartRegistry.js';

export default function BarChart({ labels = [], values = [], label = 'Values', options = {}, stacked = false, horizontal = false, colors, showValues = false }) {
  // Build gradient background if no explicit colors passed
  const gradientColors = (ctx) => {
    const chart = ctx.chart;
    const { ctx: c, chartArea } = chart;
    if (!chartArea) return 'rgba(229,57,53,0.65)';
    const g = c.createLinearGradient(0, chartArea.top, chartArea.right, chartArea.bottom);
    g.addColorStop(0, 'rgba(229,57,53,0.85)');
    g.addColorStop(1, 'rgba(239,83,80,0.55)');
    return g;
  };

  const dataset = buildDataset({
    label,
    data: values,
    backgroundColor: colors || gradientColors,
    borderColor: colors ? colors.map(c => c.replace(/0\.[0-9]+\)/, '1)')) : '#e53935',
    borderWidth: 2,
    typeSpecific: { borderRadius: 8, borderSkipped: false }
  });

  // Plugin to draw value labels at end of bars (horizontal only)
  const valueLabelPlugin = {
    id: 'valueLabelPlugin',
    afterDatasetsDraw(chart) {
      if (!showValues || !horizontal) return;
      const { ctx } = chart;
      ctx.save();
      ctx.font = '600 11px Inter,Segoe UI,Arial';
      ctx.fillStyle = '#212121';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      const meta = chart.getDatasetMeta(0);
      meta.data.forEach((bar, i) => {
        const val = values[i];
        const p = bar.tooltipPosition();
        ctx.fillText(val.toLocaleString(), p.x + 6, p.y);
      });
      ctx.restore();
    }
  };

  const finalOptions = composeOptions({
    indexAxis: horizontal ? 'y' : 'x',
    animation: { duration: 900 },
    scales: stacked ? {
      x: { stacked: true, ticks: { color: '#424242', font: { size: 11, weight: '600' } }, grid: { color: 'rgba(189,189,189,0.1)', drawBorder: false }, border: { display: false } },
      y: { stacked: true, ticks: { color: '#424242', font: { size: 11, weight: '600' } }, grid: { color: 'rgba(189,189,189,0.1)', drawBorder: false }, border: { display: false } }
    } : {
      x: { ticks: { color: '#424242', font: { size: 11, weight: '600' } }, grid: { color: 'rgba(189,189,189,0.08)', drawBorder: false }, border: { display: false } },
      y: { ticks: { color: '#424242', font: { size: 11, weight: '600' } }, grid: { color: 'rgba(189,189,189,0.1)', drawBorder: false }, border: { display: false } }
    },
    ...options
  });

  return <Bar data={{ labels, datasets: [dataset] }} options={finalOptions} plugins={showValues ? [valueLabelPlugin] : []} />;
}
