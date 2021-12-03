import { Injectable } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { User } from "../users/users.entity";
import { CreateVisitInput } from "./create_visit.input";
import { Visit } from "./visits.entity";

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(Visit) private readonly visitRepository: Repository<
      Visit
    >,
  ) {}
  async findById(id: Visit["id"]): Promise<Visit | undefined> {
    return this.visitRepository.findOne({ where: { id } });
  }
  async findByUser(userId: User["id"]): Promise<Visit[] | undefined> {
    return this.visitRepository.find({ where: { userId } });
  }

  async findAll(): Promise<Visit[] | undefined> {
    return this.visitRepository.find();
  }

  async create(visit: CreateVisitInput): Promise<InsertResult> {
    return await this.visitRepository.insert({
      ...visit,
    });
  }
}
