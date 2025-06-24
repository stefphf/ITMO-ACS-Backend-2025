import { Injectable, OnModuleInit } from '@nestjs/common';
import { BotRunnerService } from './bots.runner';
import { CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class BotCronService implements OnModuleInit {
  constructor(
    private readonly botRunner: BotRunnerService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit() {
    const botRunner = new CronJob(CronExpression.EVERY_SECOND, async () => {
      await this.botRunner.startBookRunner();
      await this.botRunner.startRateRunner();
    });

    this.schedulerRegistry.addCronJob('bot-runner', botRunner);
    botRunner.start();
  }
}
