import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationsModule } from './reservations/reservations.module';
import { SupportRequestsModule } from './support-requests/support-requests.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/NEST'),
    UsersModule,
    HotelsModule,
    ReservationsModule,
    SupportRequestsModule, // Добавленный модуль "Чат техподдержки"
  ],
})
export class AppModule {}
