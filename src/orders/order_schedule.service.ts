import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as millisecondsConvert from 'milliseconds';

@Injectable()
export class OrderSchedule {

    constructor(
      @InjectQueue('orders') private readonly ordersQueue: Queue) {}

    async schedule(orderId: string, delayInMinutes: Number) {
        await this.ordersQueue.add("order", {
            orderId
          }, {
            delay: millisecondsConvert.minutes(delayInMinutes)
          });
    }
}