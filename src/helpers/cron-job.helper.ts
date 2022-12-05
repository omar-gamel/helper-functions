import * as cron from 'node-cron';
/*
    Schedules given task to be executed whenever the cron expression ticks.
        Arguments:
            1- expression string: Cron expression.
            2- function Function: Task to be executed.
            3- options Object: Optional configuration for job scheduling.
        Options:
            4- scheduled: A boolean to set if the created task is scheduled. Default true        
            5- timezone: The timezone that is used for job scheduling such as Asia/Shanghai - Asia/Kolkata - America/Sao_Paulo
*/
/*
    Allowed fields:
        ┌────────────── second (optional)
        │ ┌──────────── minute
        │ │ ┌────────── hour
        │ │ │ ┌──────── day of month
        │ │ │ │ ┌────── month
        │ │ │ │ │ ┌──── day of week
        │ │ │ │ │ │
        │ │ │ │ │ │
        * * * * * *
*/
/*
    Allowed values :
        - second	    0-59
        - minute	    0-59
        - hour   	    0-23
        - day of month	1-31
        - month	        1-12 (or names)
        - day of week	0-7 (or names, 0 or 7 are sunday)
*/
/*
    ScheduledTask methods :
        1- start()    --> Starts the scheduled task.
        2- stop()     --> The task won't be executed unless re-started.
        3- validate() --> Validate that the given string is a valid cron expression.
*/
export function cronJob() {
  // use multiples values separated by comma
  cron.schedule('1,2,4,5 * * * *', () => {
    console.log('running every minute 1, 2, 4 and 5');
  });

  // define a range of values:
  cron.schedule('1-5 * * * *', () => {
    console.log('running every minute to 1 from 5');
  });

  // 1-10/2 that is the same as 2,4,6,8,10
  cron.schedule('*/2 * * * *', () => {
    console.log('running a task every two minutes');
  });

  // For month and week day you also may use names or short names
  cron.schedule('* * * January,September Sunday', () => {
    console.log('running on Sundays of January and September');
  });

  // Or with short names
  cron.schedule('* * * Jan,Sep Sun', () => {
    console.log('running on Sundays of January and September');
  });

  // Example Timezone
  cron.schedule('0 1 * * *', () => {
    console.log('Running a job at 01:00 at America/Sao_Paulo timezone');
  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
  });

  // 1- start method
  const task = cron.schedule('* * * * *', () =>  {
    console.log('stopped task');
  }, {
    scheduled: false
  });
  task.start();

  // 2- stop method
  const task2 = cron.schedule('* * * * *', () =>  {
    console.log('will execute every minute until stopped');
  });
  task2.stop();

  // 3- validate method
  const valid = cron.validate('59 * * * *');
  const invalid = cron.validate('60 * * * *');
}
