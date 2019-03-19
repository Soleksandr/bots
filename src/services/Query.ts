import fetch, { Body } from 'node-fetch'

export default class Query {
  private baseUrl: string;

  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
  }

  public get = async (url?: string) => {
    return this.send(url)
  }

  private send = async (url: string = "", data?: Body) => {
    try {
      const response = await fetch(`${this.baseUrl}${url}`)
      const data = await response.json()

      return data
    } catch (error) {
      console.error(error)
      throw new Error(error)
    }
  }
}