import fs from 'node:fs/promises';

import app from './app.js';
import configuration from '../configuration.json' with { type: 'json' };

const data = await app(configuration, true);

const date = new Date();
const filename = `data/data-${date.getFullYear()}${date.getMonth()}${date.getDate()}-${date.getHours()}${date.getMinutes()}.json`;

console.log(`Writing to file ${filename}...`);
await fs.writeFile(`${filename}`, JSON.stringify(data, undefined, 2));
console.log('Done.');