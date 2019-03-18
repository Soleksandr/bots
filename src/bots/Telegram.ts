import * as cron from 'node-cron'

import Query from '../services/Query'
import job, { Customization } from '../services/Job'

interface ISchedularArguments {
  schedule: string;
  text: string;
  chat_id: string;
  scheduleDetails?: Customization
}

class Telegram {
  private query: Query;

  constructor () {
    this.query = new Query(
      `${process.env.TELEGRAM_URL}${process.env.TELEGRAM_API_TOKEN}` as string
    )
  }

  public sendMessage = async (text: string, chat_id: string) => {
    const message = await this.query.get(`/sendMessage?text=${text}&chat_id=${chat_id}`)
  }

  public scheduleMessageSend = ({ schedule, text, chat_id, scheduleDetails }: ISchedularArguments) => {
    const sendMessage = this.sendMessage.bind(this, text, chat_id)

    scheduleDetails
      ? job.addCustomizedJob(schedule, sendMessage, scheduleDetails)
      : job.addJob(schedule, sendMessage)
  }
}

export default new Telegram