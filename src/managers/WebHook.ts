import Query from '../services/Query'

const query = new Query(
  `${process.env.TELEGRAM_URL}${process.env.TELEGRAM_API_TOKEN}` as string
)

class WebHook {
  public async init () {
    const { WEBHOOK_ROUTE, URL } = process.env
    const webHookInfo = await query.get('/getWebhookInfo')

    if (webHookInfo.ok && webHookInfo.result.url !== process.env.URL) {
      await query.get(`/setWebhook?url=${URL}${WEBHOOK_ROUTE}`)
    }
  }
}

export default new WebHook()