import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serve from 'koa-static';
import Koa from 'koa';
import path from 'path';
import fs from 'fs';

import App from './App';

const manifest = JSON.parse(
  fs.readFileSync(path.resolve('./build/asset-manifest.json'), 'utf-8'),
).files;

const chunks = Object.keys(manifest)
  .filter((key) => /chunk\.js$/.exec(key))
  .map((key) => `<script src="${manifest[key]}"></script>`)
  .join('');

function createPage(root: string) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
    <link href="${manifest['main.css']}" rel="stylesheet" />
  </head>
  <body>
    <div id="root">
      ${root}
    </div>
    <script src="${manifest['runtime-main.js']}"></script>
    ${chunks}
    <script src="${manifest['main.js']}"></script>
  </body>
  </html>`;
}

const app = new Koa();

function serverRender(ctx: Koa.Context) {
  const context = {};
  const jsx = (
    <StaticRouter location={ctx.url} context={context}>
      <App />
    </StaticRouter>
  );
  const root = ReactDOMServer.renderToString(jsx);
  ctx.body = createPage(root);
}

const staticServe = serve(path.resolve('./build'), {
  index: false,
});

app.use(staticServe);
app.use(serverRender);

app.listen(5000, () => {
  console.log('Running on 5000');
});
