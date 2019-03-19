import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser'

import { router } from './router'
import telegram from './bots/Telegram'
import { addTreatment } from './helpers/treatments'

export const app = new Koa();

app.use(bodyParser())
app.use(router.routes())

telegram.scheduleMessageSend({
  schedule: '30 10 * * 3',
  text: addTreatment(`${encodeURI('самое время <b>обновить версию портала!</b>')} \xE2\x8F\xB0`),
  chat_id: '-210834404',
  scheduleDetails: 'onceInTwoWeeks'
})

telegram.scheduleMessageSend({
  schedule: '30 10,17 * * 3',
  text: addTreatment(`${encodeURI('не забываем про <b>Planit</b>')} \xE2\x98\x9D`),
  parse_mode: 'HTML',
  chat_id: '-1001147812420',
})

telegram.scheduleMessageSend({
  schedule: '25,30,40 16 * * *',
  text: addTreatment(`${encodeURI('Я живой')} \xF0\x9F\x9A\xBC`),
  parse_mode: 'HTML',
  chat_id: '-1001147812420',
})

telegram.sendMessage(
  '<b>Bot is running</b>',
  '-1001363234368',
)