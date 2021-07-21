import { Module } from '@nestjs/common';
import { CombosController } from './combos.controller';
import { ComboService } from './combos.service';
import ComboRepository from './repository/combo.repository';
import { MongooseModule } from '@nestjs/mongoose';
import ComboSchema from './repository/schema/combo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Combo', schema: ComboSchema }]),
  ],
  controllers: [CombosController],
  providers: [ComboService, ComboRepository],
  exports: [ComboService]
})
export class ComboModule {}
