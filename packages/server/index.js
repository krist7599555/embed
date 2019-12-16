const Koa = require('koa');
const Router = require('koa-router');
const IO = require('koa-socket-2');
const _ = require('lodash');
const pug = require('pug')
const light = new IO('/light'); // namespace global

const app = new Koa();
light.attach(app);
const PORT = process.env.PORT;

let db = {
  AXC112: 30,
  AXC113: 10,
  AXC114: 80,
};

const api = new Router()
  .prefix('/api')
  .get('/db', ctx => ctx.body = db)
  .use((ctx, next) => {
    next().then(() => {
      light.socket.emit('update', db)
      ctx.body = db
    })
  })
  .get('/db/:key/:val', ctx => db[ctx.params.key] = +ctx.params.val)
  .post('/db', ctx => db = ctx.request.body)
  .patch('/db', ctx => _.assign(db, ctx.request.data))
  .delete('/db', ctx => db = {})
  .delete('/db/:key', ctx => delete db[ctx.params.key])

  
light.on('connection', one => {
  all = light.socket;
  console.log("[CONNECTED] client", one.id)
  one.emit('update', db)
  one.on('delete', label => {
    delete db[label];
    all.emit('update', db)
  });
  one.on('update', data => {
    if (_.isObject(data)) {
      _.assign(db, data)
      one.emit('success', "update complete")
      all.emit('update', db)
    } else {
      one.emit('error', "update error need to parse object")
    }
  })
  one.on('disconnect', () => {
    console.log("[DISCONNECT] client", one.id)
  })
})


app
  .use(require('koa2-cors')())
  .use(require('koa-logger')())
  .use(require('koa-bodyparser')())
  .use(api.routes())
  .use(api.allowedMethods())
  .listen(+PORT, () => {
    console.log(`http://0.0.0.0:${PORT}`);
  });
