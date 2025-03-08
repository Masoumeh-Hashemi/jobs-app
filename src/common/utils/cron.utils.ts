import cronParser from 'cron-parser';

export function convertCronToMilliseconds(cron: string): number {
  try {
    const interval = cronParser.parse(cron);
    const nextExecutionDate = interval.next().getTime();
    const currentTime = Date.now();
    const msUntilNextRun = nextExecutionDate - currentTime;
    console.log(`Next run is in ${msUntilNextRun} ms`);

    return msUntilNextRun;
  } catch (error) {
    console.error('Invalid cron expression:', error);
    return 1000;
  }
}
