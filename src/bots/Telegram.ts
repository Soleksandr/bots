import Query from '../services/Query'
import job, { ScheduleDetails } from '../services/Job'

interface ISchedularArguments {
  id: string;
  schedule: string;
  text: string | Function;
  chat_id: string;
  scheduleDetails?: ScheduleDetails;
  parse_mode?: 'HTML' | 'Markdown';
}

class Telegram {
  private query: Query;

  constructor () {
    this.query = new Query(
      `${process.env.TELEGRAM_URL}${process.env.TELEGRAM_API_TOKEN}` as string
    )
  }

  public sendMessage = async (
    text: ISchedularArguments['text'],
    chat_id: ISchedularArguments['chat_id'],
    parse_mode: ISchedularArguments['parse_mode']='HTML'
  ) => {
    const message = typeof text === 'string' ? text : text()
    this.query.get(`/sendMessage?text=${message}&chat_id=${chat_id}&parse_mode=${parse_mode}`)
  }

  public scheduleMessageSend = ({ schedule, text, chat_id, scheduleDetails, parse_mode, id }: ISchedularArguments) => {
    const sendMessage = this.sendMessage.bind(this, text, chat_id, parse_mode)

    scheduleDetails
      ? job.addCustomizedJob({schedule, scheduleDetails, id, job: sendMessage,})
      : job.addJob(schedule, sendMessage)
  }
}

export default new Telegram