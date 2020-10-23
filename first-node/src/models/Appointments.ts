import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('string')
  provider: string;

  @Column('time with time zone')
  date: Date;

}

export default Appointment;
