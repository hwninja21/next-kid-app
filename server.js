const express = require('express');
const next = require('next');
const cors = require('cors');
const nextI18NextMiddleware = require('next-i18next/middleware').default;

const nextI18next = require('./i18n');

const port = process.env.PORT || 3000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  const server = express();

  server.use(cors());
  server.use(nextI18NextMiddleware(nextI18next));

  server.get('/activity/:subjectid/:gradeid/:activityid', (req, res) => app.render(req, res, '/activitypage', { subjectid: req.params.subjectid, gradeid: req.params.gradeid, activityid: req.params.activityid }));
  server.get('/forgotpassword/:access_token', (req, res) => app.render(req, res, '/forgotpassword', { access_token: req.params.access_token }));
  server.get('/verification/:token', (req, res) => app.render(req, res, '/verification', { token: req.params.token }));
  server.get('*', (req, res) => handle(req, res));

  await server.listen(port);
  console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
})();
