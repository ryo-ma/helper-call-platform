
import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { Call } from './calls.entity';
import { CreateCallInput } from './create_call.input';


@Injectable()
export class CallsService {
  constructor(
    @InjectRepository(Call) private readonly callRepository: Repository<
      Call
    >,
  ) {}
  async findById(id: Call["id"]): Promise<Call | undefined> {
    return this.callRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Call[] | undefined> {
    return this.callRepository.find();
  }

  async create(call: CreateCallInput): Promise<InsertResult> {
    return await this.callRepository.insert({
      ...call,
      createdAt: new Date()
    });
  }
}
