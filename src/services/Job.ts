import * as cron from 'node-cron'

import { Storage } from './Storage'

interface IScheduleDetails {
  [key: string]: Function
}

interface IArgs {
  schedule: string;
  job: () => void;
  scheduleDetails: ScheduleDetails;
  id: string;
}

export type ScheduleDetails = "onceInTwoWeeks"

class Job {
  private storage: Storage;

  constructor () {
    this.storage = new Storage('jobs')
  }

  public addJob = (schedule: string, job: () => void) => {
    cron.schedule(schedule, job, { timezone: 'Europe/Kiev' })
  }

  public addCustomizedJob = ({ schedule, job, scheduleDetails, id }: IArgs) => {
    const customizedJob = this.scheduleToMethod[scheduleDetails]

    if (!customizedJob) {
      throw new Error ('No job found for schedule ' + scheduleDetails)
    }

    customizedJob(schedule, job, id)
  }

  private runOnceInTwoWeeks = (schedule: string, job: () => void, id: string) => {
    const property = this.storage.getProperty(id)

    if (property === undefined) { // run task after first server start on schedule
      this.storage.setProperty({ property: id, value: true })
    }

    this.addJob(schedule, () => {
      let shouldRun = this.storage.getProperty(id)
      console.log(' -- should run -- ', shouldRun)
      if (shouldRun) {
        shouldRun = this.storage.setProperty({ property: id, value: false })
        job()
      } else {
        shouldRun = this.storage.setProperty({ property: id, value: true })
      }
    })
  }

  private scheduleToMethod: IScheduleDetails = {
    onceInTwoWeeks: this.runOnceInTwoWeeks
  }
}

export default new Job()