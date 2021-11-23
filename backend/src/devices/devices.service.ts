import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { Device } from './devices.entity';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Device) private readonly deviceRepository: Repository<Device>,
    
  ) {}
  async findById(id : Device["id"]): Promise<Device | undefined> {
    return this.deviceRepository.findOne({ where: { id } });
  }

  async findByUser(userId: Device["userId"]): Promise<Device[] | undefined> {
    return this.deviceRepository.find({ where: { userId } });
  }

  async create(device: Device): Promise<InsertResult> {
    return await this.deviceRepository.insert(device);
  }
}
