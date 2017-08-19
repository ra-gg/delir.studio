import * as Koa from 'koa'
import * as koaStatic from 'koa-static'

const app = new Koa()
app.use(koaStatic('public/', { gzip: true }))
app.listen(6000)
