import * as cron from 'node-cron'

interface IScheduleDetails {
  [key: string]: Function
}

export type ScheduleDetails = "onceInTwoWeeks"

class Job {
  public addJob = (schedule: string, job: () => void) => {
    cron.schedule(schedule, job, { timezone: 'Europe/Kiev' })
  }

  public addCustomizedJob = (schedule: string, job: () => void, scheduleDetails: ScheduleDetails) => {
    const customizedJob = this.scheduleToMethod[scheduleDetails]

    if (!customizedJob) {
      throw new Error ('No job found for schedule ' + scheduleDetails)
    }

    customizedJob(schedule, job)
  }

  private runOnceInTwoWeeks = (schedule: string, job: () => void) => {
    let shouldRun = true
    this.addJob(schedule, () => {
      if (shouldRun) {
        shouldRun = false
        job()
      } else {
        shouldRun = true
      }
    })
  }

  private scheduleToMethod: IScheduleDetails = {
    onceInTwoWeeks: this.runOnceInTwoWeeks
  }
}

export default new Job()