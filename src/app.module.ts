import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { CoursesModule } from './courses/courses.module';
import { TimetableModule } from './timetable/timetable.module';
import { CalendarModule } from './calendar/calendar.module';
import { AttendanceModule } from './attendance/attendance.module';
import { GradesModule } from './grades/grades.module';
import { FinanceModule } from './finance/finance.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { CorrespondenceModule } from './correspondence/correspondence.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    StudentsModule,
    ClassesModule,
    CoursesModule,
    TimetableModule,
    CalendarModule,
    AttendanceModule,
    GradesModule,
    FinanceModule,
    PaymentsModule,
    NotificationsModule,
    CorrespondenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
