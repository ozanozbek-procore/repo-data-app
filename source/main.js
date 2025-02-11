import fs from 'node:fs/promises';

import app from './app.js';
import configuration from '../configuration.json' with { type: 'json' };

const data = await app(configuration, true);
let csv = '';

for (const [repository, prs] of Object.entries(data)) {
  prs.forEach(pr => {
    const created = new Date(pr.created_at);
    const closed = new Date(pr.closed_at);
    csv += [repository, pr.url, Math.floor(created.getTime() / 1000), Math.floor(closed.getTime() / 1000)].join(',') + '\n'
  });
}

const filename = `data/data-${Date.now()}.csv`;

console.log(`Writing to file ${filename}...`);
await fs.writeFile(`${filename}`, csv);
console.log('Done.');