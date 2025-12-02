import { Doughnut } from 'react-chartjs-2';
import { composeOptions } from './BaseChart';
import './ChartRegistry.js';

export default function DoughnutChart({ labels = [], values = [], colors, centerText, options = {}, showTotal = false }) {
  const total = values.reduce((a,b)=>a+b,0);
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors || [
          'rgba(229,57,53,0.85)',
          'rgba(251,140,0,0.85)',
          'rgba(67,160,71,0.85)',
          'rgba(30,136,229,0.85)'
        ],
        borderColor: colors?.map(c => c.replace(/0\.[0-9]+\)/, '1)')) || ['#e53935','#fb8c00','#43a047','#1e88e5'],
        borderWidth: 3,
        hoverOffset: 14,
        hoverBorderWidth: 5
      }
    ]
  };

  const finalOptions = composeOptions({
    cutout: '60%',
    animation: { animateRotate: true, duration: 1000 },
    plugins: {
      legend: { 
        position: 'bottom', 
        labels: { 
          color: '#424242', 
          boxWidth: 14, 
            padding: 14,
          font: { size: 11, weight: '600' },
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
        callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed.toLocaleString()} (${((ctx.parsed/total)*100).toFixed(1)}%)` } 
      },
      ...options.plugins
    },
    ...options
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Doughnut data={data} options={finalOptions} />
      {(centerText || showTotal) && (
        <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',textAlign:'center',pointerEvents:'none'}}>
          {centerText && <div style={{fontSize:'0.75rem',fontWeight:600,color:'#424242',marginBottom:4}}>{centerText}</div>}
          {showTotal && <div style={{fontSize:'0.9rem',fontWeight:700,color:'#e53935'}}>{total.toLocaleString()}<div style={{fontSize:'0.55rem',fontWeight:600,color:'#757575'}}>TOTAL</div></div>}
        </div>
      )}
    </div>
  );
}
