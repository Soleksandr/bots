import fetch, { Body } from 'node-fetch'

export default class Query {
  private baseUrl: string;

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public get = async (url?: string) => {
    return this.send(url)
  }

  private send = async <T>(url: string = "", data?: Body) => {
    try {
      // console.log('== url == ', url)
      // console.log('== baseUrl == ', this.baseUrl)
      const response = await fetch(`${this.baseUrl}${url}`)
      const data = await response.json()
      // console.log('data = ', data)

      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }
}