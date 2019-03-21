import * as Router from 'koa-router'

import { webHook } from './webHook'
import { health } from './health'

export const router = new Router()

router.use('/health', health.routes())
router.use('/', webHook.routes())