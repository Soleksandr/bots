import * as fs from 'fs'
import * as path from 'path'

interface IWriteArgs {
  data: { [key: string]: string };
  writeType?: 'append' | 'change';
}

interface ISetPropertyArgs {
  property: string;
  value: any;
}

const pathToStorage = path.resolve(__dirname, '..', '..', 'storage.json')

export class Storage {
  private storage: string;

  constructor (propertyName: string) {
    this.storage = propertyName
  }

  public getFullData = () => {
    return this.read()

  }

  public getData = () => {
    const data = this.read()

    return data[this.storage]
  }

  public getProperty = (property: string) => {
    const data = this.getData()
    return data && data[property]
  }

  public setProperty = ({ property, value }: ISetPropertyArgs) => {
    const data = this.getData()
    const updatedData = { ...data, [property]: value }

    this.write({ [this.storage]: updatedData })

    return value
  }

  public writeToStorage = ({ data, writeType = 'append' }: IWriteArgs) => {
    const fullStorage = this.getFullData()

    const updatedProperty = writeType === 'append'
      ? { ...fullStorage[this.storage], ...data }
      : data
    const updatedStorage = { ...fullStorage, [this.storage]: updatedProperty }

    this.write(updatedStorage)
  }

  private read = () => {
    const rawData = fs.readFileSync(pathToStorage)
    return JSON.parse(rawData.toString())
  }

  private write = (data: IWriteArgs['data']) => {
    fs.writeFileSync(pathToStorage, JSON.stringify(data, null, 3))
  }

  static init = () => {
    try {
      fs.writeFileSync(pathToStorage, JSON.stringify({}), { flag: 'wx' })
    } catch (err) { }
  }
}