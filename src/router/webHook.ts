import * as Router from 'koa-router';
import Query from '../services/Query'
import webHookManager from '../managers/WebHook'

export const webHook = new Router()

webHookManager.init()

webHook.post(`${process.env.WEBHOOK_ROUTE}`, async (ctx) => {
  const { chat, text } = ctx.request.body.message

  ctx.body = {
    method: "sendMessage",
    chat_id: chat.id,
    text,
  }
})

