import express from 'express';
import path from 'path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import proxy from 'express-http-proxy';
import { Helmet } from 'react-helmet';
import { installGlobals } from "@remix-run/node";
import process from 'process';

// Polyfill Web Fetch API
installGlobals();

const isProduction = process.env.NODE_ENV === 'production';
console.log(isProduction);
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : '';

async function startServer() {
  const app = express();
  let vite;
  if (!isProduction) {
    const { createServer } = await import('vite');
    vite = await createServer({
      server: { middlewareMode: true },
      appType: 'custom'
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import('compression')).default;
    const sirv = (await import('sirv')).default;
    app.use(compression());
    app.use(base, sirv('./dist/client', { extensions: [] }));
  }

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
    try {
      const url = req.originalUrl.replace(base, '');
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      let template;
      let render;
      // react ssr
      if (!isProduction) {
        template = await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = templateHtml;
        render = (await import('./dist/server/entry-server.js')).render;
      }
      const { appHtml, emotionCss } = await render(req, res);
      let html = template.replace(`<!--ssr-outlet-->`, appHtml);
      //meta ssr
      const helmet = Helmet.renderStatic();
      html = html.replace(`<!--ssr_head-outlet-->`, helmet.meta.toString());
      //MUI ssr
      html = html.replace(`<!--ssr_MUI-style-->`, emotionCss);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      console.log(e);
      next(e);
    }
  });
  app.listen(port);
}
startServer();
