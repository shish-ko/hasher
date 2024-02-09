import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import proxy from 'express-http-proxy';
import { Helmet } from 'react-helmet';
import  { installGlobals } from "@remix-run/node";

// Polyfill Web Fetch API
installGlobals();

async function startServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });
  app.use((req, res, next) => {
    vite.middlewares.handle(req, res, next);
  });
  app.use('/secret', (req, res, next) => {
    if (req.headers['user-agent']?.includes('facebookexternalhit/1.1')) {
      return proxy('localhost:5173/', {
        proxyReqPathResolver(req) {
          return req.originalUrl.replace('/secret/', '/fb_scraper/secret/');
        },
      })(req, res, next);
    }
    next();
  });
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    try {
      // react ssr
      const template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
      const transformedTemplate = await vite.transformIndexHtml(url, template);
      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');
      const {appHtml, emotionCss} = await render(req);
      let html = transformedTemplate.replace(`<!--ssr-outlet-->`, appHtml);
      //meta ssr
      const helmet = Helmet.renderStatic();
      html = html.replace(`<!--ssr_head-outlet-->`, helmet.meta.toString());
      //MUI ssr
      html = html.replace(`<!--ssr_MUI-style-->`, emotionCss);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
  app.listen(5173);
}
startServer();
