import {resolve} from 'node:path';
import process from 'process';
import { writeFile,readFile } from 'node:fs/promises';

const entryServerPath = resolve(process.cwd(), 'dist/server/entry-server.js');
let entryServer = await readFile(entryServerPath, {encoding: 'utf-8'});
entryServer=entryServer.replace("@mui/material/colors/index.js", "@mui/material/node/colors/index.js");
entryServer=entryServer.replace("@mui/material/CircularProgress/index.js", "@mui/material/node/CircularProgress/index.js");
entryServer=entryServer.replace("@mui/x-date-pickers/AdapterDayjs/index.js", "@mui/x-date-pickers/node/AdapterDayjs/index.js");
await writeFile(entryServerPath, entryServer, {flag: 'w+'});
console.warn('Server bugs are fixed');
