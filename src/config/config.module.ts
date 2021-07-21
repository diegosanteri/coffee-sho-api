import { Module, DynamicModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config.service';
import { ConstantsService } from 'src/common/constants.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        `${process.env.NODE_ENV || 'development'}.env`,
      ),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {
  static foorRoot(): DynamicModule {
    return {
      module: ConfigModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get(ConstantsService.MONGO_URI),
          }),
        }),
        BullModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            redis: {
              host: configService.get(ConstantsService.REDIS_HOST),
              port: configService.getNumber(ConstantsService.REDIS_PORT),
            },
          }),
        }),
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, '../../', 'client'),
        }),
      ],
    };
  }
}
