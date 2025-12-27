import { Module } from '@nestjs/common'; // Décorateur pour déclarer un module NestJS.
import { AppController } from './app.controller'; // Contrôleur racine (ping/health).
import { AppService } from './app.service'; // Service associé au contrôleur racine.
import { AuthModule } from './auth/auth.module'; // Module d'authentification (login).
import { UsersModule } from './users/users.module'; // Module utilisateurs (stub).
import { StudentsModule } from './students/students.module'; // Module élèves (stub).
import { ClassesModule } from './classes/classes.module'; // Module classes (stub).
import { CoursesModule } from './courses/courses.module'; // Module cours (stub).
import { TimetableModule } from './timetable/timetable.module'; // Module emplois du temps (stub).
import { CalendarModule } from './calendar/calendar.module'; // Module calendrier/jours fériés (stub).
import { AttendanceModule } from './attendance/attendance.module'; // Module présences/absences (stub).
import { GradesModule } from './grades/grades.module'; // Module notes (stub).
import { FinanceModule } from './finance/finance.module'; // Module finances (stub).
import { PaymentsModule } from './payments/payments.module'; // Module paiements (stub).
import { NotificationsModule } from './notifications/notifications.module'; // Module notifications (stub).
import { CorrespondenceModule } from './correspondence/correspondence.module'; // Module correspondance/carnet (stub).
import { PrismaModule } from './prisma/prisma.module'; // Module Prisma (connexion DB + service).
import { EventsModule } from './events/events.module'; // Module WebSocket (temps reel).

@Module({
  imports: [
    PrismaModule, // Injection du client Prisma dans les modules.
    AuthModule, // Route /auth.
    UsersModule, // Route /users (stub).
    StudentsModule, // Route /students (stub).
    ClassesModule, // Route /classes (stub).
    CoursesModule, // Route /courses (stub).
    TimetableModule, // Route /timetable (stub).
    CalendarModule, // Route /calendar (stub).
    AttendanceModule, // Route /attendance (stub).
    GradesModule, // Route /grades (stub).
    FinanceModule, // Route /finance (stub).
    PaymentsModule, // Route /payments (stub).
    NotificationsModule, // Route /notifications (stub).
    CorrespondenceModule, // Route /correspondence (stub).
    EventsModule, // WebSockets temps reel.
  ],
  controllers: [AppController], // Contrôleurs exposés par ce module racine.
  providers: [AppService], // Services injectables accessibles dans le module.
})
export class AppModule {}
