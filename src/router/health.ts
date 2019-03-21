import * as Router from 'koa-router';
import healthManager from '../managers/Health'

export const health = new Router()

health.get('/', async (ctx) => {
  const result = healthManager.check()
  ctx.body = result
})

