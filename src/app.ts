import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser'

import { router } from './router'
import telegram from './bots/Telegram'
import job from './services/Job'

export const app = new Koa();

app.use(bodyParser())
app.use(router.routes())

job.addCustomizedJob()
// telegram.scheduleMessageSend('', '', '-229395346')

// telegram.sendMessage('hello from app', '-229395346')
// crone.schedule('5 * * * * *', () => {
//   console.log('- start -');
//   telegram.sendMessage(encodeURI('Дамы и господа самое время обновить версию портала! Успешного дня!'), '-229395346')
// })
// let isSecondWeek = true



// crone.schedule('5 * * * * *', () => {
//   console.log('- isSecondWeek -', isSecondWeek);
//   if (isSecondWeek) {
//     telegram.sendMessage(
//       encodeURI('Дамы и господа самое время обновить версию портала! Успешного дня!'),
//       '-229395346'
//     )
//     isSecondWeek = false
//   } else {
//     isSecondWeek = true
//   }
// })
