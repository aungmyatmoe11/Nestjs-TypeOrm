import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Meeting } from './meeting.entity';
import { Task } from './task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee) private employeeRepo: Repository<Employee>,
    @InjectRepository(ContactInfo) private contactInfoRepo: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepo: Repository<Meeting>,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ) { }

  async seed() { // ! Database Seed
    const ceo = this.employeeRepo.create({ name: "Mr CEO" });

    await this.employeeRepo.save(ceo); //?  ceo.id

    const ceoContactInfo = this.contactInfoRepo.create({
      // ? employee CEO
      email: 'ceoemail@gmail.com',
      // employeeId : ceo.id, // *** relation One
    });

    ceoContactInfo.employee = ceo; // *** relation Two
    await this.contactInfoRepo.save(ceoContactInfo);

    // ? employee Manager
    const manager = this.employeeRepo.create({
      name: 'Mr Manager',
      manager: ceo,
    });

    // ? TASKs
    const task1 = this.taskRepo.create({ name: 'Task 1' });
    await this.taskRepo.save(task1);
    const task2 = this.taskRepo.create({ name: 'Task 2' });
    await this.taskRepo.save(task2);

    manager.tasks = [task1, task2];


    // ? MEETING
    const meeting1 = this.meetingRepo.create({ zoomUrl: "meeting.com" });
    meeting1.attendees = [ceo];
    await this.meetingRepo.save(meeting1);

    manager.meetings = [meeting1];
    await this.employeeRepo.save(manager);
  }

  getEmployeeById(id: number) {
    // return this.employeeRepo.findOne({
    //   where: { id },
    //   relations: ['manager', 'directReports', 'tasks', 'contactInfo', 'meetings']
    // })

    return this.employeeRepo.createQueryBuilder('employee')
      .leftJoinAndSelect('employee.directReports', 'directReports')
      .leftJoinAndSelect('employee.meetings', 'meetings')
      .leftJoinAndSelect('employee.tasks', 'tasks')
      .where('employee.id = :employeeId', { employeeId: id })
      .getOne();
  }

  deleteEmployee(id : number){
    return this.employeeRepo.delete(id);
  }
}
