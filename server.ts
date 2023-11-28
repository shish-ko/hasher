import express from 'express';
import {createServer as createViteServer} from 'vite';
import path from 'path';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'url';

async function startServer () {
  const app = express();
  const vite = await createViteServer({
    server: {middlewareMode: true},
    appType: 'custom'
  });
  app.use((req, res, next) => {
    vite.middlewares.handle(req, res, next);
  });
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    try{
      const template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
      const transformedTemplate = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const appHtml = await render(req);
      const html = transformedTemplate.replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    }catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
  app.listen(5173);
}
startServer();
