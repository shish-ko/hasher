import express from 'express';
import {createServer as createViteServer} from 'vite';
import path from 'path';
import fs from 'node:fs/promises';
import {fileURLToPath} from 'url';
import proxy from 'express-http-proxy';
import {Helmet} from 'react-helmet';

async function startServer () {
  const app = express();
  const vite = await createViteServer({
    server: {middlewareMode: true},
    appType: 'custom'
  });
  app.use((req, res, next) => {
    vite.middlewares.handle(req, res, next);
  });
  app.use('/secret/*', (req, res, next) => {
    if(req.headers['user-agent']?.includes('facebookexternalhit/1.1')) {
      console.log(res);
      return proxy('localhost:5173/fb_scraper/'+req.path)(req, res, next);
    }
    next();
  });
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    try{
      const template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
      const transformedTemplate = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const appHtml = await render(req);
      const helmet = Helmet.renderStatic();
      console.log(helmet.meta.toString());
      let html = transformedTemplate.replace(`<!--ssr-outlet-->`, appHtml);
      html = html.replace(`<!--ssr_head-outlet-->`, helmet.meta.toString());
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    }catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
  app.listen(5173);
}
startServer();
