import { Module } from '@nestjs/common';
import { CrmModule } from './modules/crm/crm.module';
import { DocsModule } from './modules/docs/docs.module';
import { AuthModule } from './modules/auth/auth.module';
import { BusinessModule } from './modules/business/business.module';
import { ErmModule } from './modules/erm/erm.module';
import { TaskModule } from './modules/task/task.module';
import { SoxModule } from './modules/sox/sox.module';

@Module({
  imports: [
    CrmModule,
    DocsModule,
    AuthModule,
    BusinessModule,
    ErmModule,
    TaskModule,
    SoxModule,
  ],
})
export class AppModule {}
