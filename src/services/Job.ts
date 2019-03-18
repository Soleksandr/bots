import * as cron from 'node-cron'

interface ICustomizedSchedule {
  [key: string]: Function
}

export declare type Customization = "runOnceInTwoWeeks"

class Job {
  public addJob = (schedule: string, job: () => void) => {
    cron.schedule(schedule, job)
  }

  public addCustomizedJob = (schedule: string, job: () => void, customization: Customization) => {
    const customizedJob = this.scheduleToMethod[customization]

    if (!customizedJob) {
      throw new Error ('No job found for customization ' + customization)
    }

    customizedJob(schedule, job)
  }

  private runOnceInTwoWeeks = (schedule: string, job: () => void) => {
    let shouldRun = true
    this.addJob(schedule, () => {
      console.log('----------- start -----------')
      if (shouldRun) {
        shouldRun = false
        job()
      } else {
        shouldRun = true
      }
    })
  }

  private scheduleToMethod: ICustomizedSchedule = {
    onceInTwoWeeks: this.runOnceInTwoWeeks
  }
}

export default new Job()