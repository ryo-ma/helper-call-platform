import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';
import { CreateFacilityInput } from './create_facility.input';
import { Facility } from './facilities.entity';

@Injectable()
export class FacilitiesService {

  constructor(
    @InjectRepository(Facility) private readonly facilityRepository: Repository<
     Facility 
    >,
  ) {}
  async findById(id: Facility["id"]): Promise<Facility| undefined> {
    return this.facilityRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Facility[] | undefined> {
    return this.facilityRepository.find();
  }

  async create(facility: CreateFacilityInput): Promise<InsertResult> {
    return await this.facilityRepository.insert({
      ...facility
    });
  }

}
