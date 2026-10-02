import { writeFileSync } from 'node:fs';
import { buildTables } from '../src/lattice/framing-tables.ts';

writeFileSync('src/lattice/framing-tables.json', `${JSON.stringify(buildTables())}\n`);
