import './ChartRegistry.js';

// Shallow merge utility; for nested objects like scales/plugins user can supply full overrides.
function mergeOptions(base, custom) {
    return {...base, ...(custom || {}), plugins: {...(base.plugins || {}), ...(custom ? .plugins || {}) }, scales: {...(base.scales || {}), ...(custom ? .scales || {}) } };
}

export function buildDataset({ label, data, borderColor, backgroundColor, typeSpecific }) {
    return {
        label,
        data,
        borderColor: borderColor || '#0099ff',
        backgroundColor: backgroundColor || 'rgba(0,153,255,0.25)',
        ...typeSpecific
    };
}

export const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'nearest', intersect: false },
    plugins: {
        legend: { labels: { color: '#fff', boxWidth: 14 } },
        tooltip: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            titleColor: '#4dd0e1',
            bodyColor: '#fff',
            borderColor: '#00bcd4',
            borderWidth: 1,
            padding: 10
        }
    },
    scales: {
        x: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.06)' } },
        y: { ticks: { color: '#fff' }, grid: { color: 'rgba(255,255,255,0.08)' } }
    }
};

export function composeOptions(custom) {
    return mergeOptions(baseOptions, custom);
}