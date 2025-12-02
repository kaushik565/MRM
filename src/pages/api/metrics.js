import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'metrics.json');
        const raw = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(raw);
        res.status(200).json(json);
    } catch (e) {
        res.status(500).json({ error: 'Failed to load metrics', detail: e.message });
    }
}