const Koa = require('koa');
const Router = require('koa-router');
const _ = require('lodash');
const pug = require('pug')
const api = new Router();

const PORT = process.env.PORT;
const WS_URL = process.env.WS_URL;

const state = {
  logs: [],
  sets: {}
};

const pageHome = pug.compileFile("./pages/index.pug")
const db = {
  1: 0,
  2: 1
};

api
  .get('/', ctx => ctx.body = pageHome({
    "wsURL": WS_URL
  }))
  .get('/db', ctx => ctx.body = db)
  // .get('/get', ctx => (ctx.body = state.sets))
  // .get('/get/:key', ctx => (ctx.body = state.sets[ctx.params.key]))
  // .get('/set/:key', ctx => delete state.sets[(ctx.body = ctx.params.key)])
  // .get('/set/:key/:val', ctx => (ctx.body = state.sets[ctx.params.key] = ctx.params.val))




const app = new Koa();
app
  .use(require('koa2-cors')())
  .use(require('koa-logger')())
  .use(require('koa-easy-ws')())
  .use(async (ctx, next) => {
    if (ctx.ws) {
      const ws = await ctx.ws()
      ws.on('message', msg => {
        _.assign(db, JSON.parse(msg))
        ws.send(JSON.stringify(db))
      })
    } else {
      next();
    }
  })
  .use(api.routes())
  .use(api.allowedMethods())
  .listen(+PORT, () => {
    console.log(`http://0.0.0.0:${PORT}`);
  });
