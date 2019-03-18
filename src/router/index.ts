import * as Router from 'koa-router'

import { webHook } from './webHook'

export const router = new Router()

router.use("*", webHook.routes())