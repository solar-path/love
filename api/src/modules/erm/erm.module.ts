import { Module } from '@nestjs/common';
import { RiskController } from './risk/risk.controller';
import { ScoreController } from './score/score.controller';
import { ScaleController } from './scale/scale.controller';
import { ScaleService } from './scale/scale.service';
import { ScoreService } from './score/score.service';
import { RiskService } from './risk/risk.service';

@Module({
  controllers: [RiskController, ScoreController, ScaleController],
  providers: [ScaleService, ScoreService, RiskService],
})
export class ErmModule {}
