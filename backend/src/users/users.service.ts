import { Injectable } from "@nestjs/common";
import { Repository ,InsertResult} from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { CreateUserInput } from "./create_user.input";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findById(id : User["id"]): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByEmail(email: User["email"]): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(user: CreateUserInput): Promise<InsertResult> {
    return await this.userRepository.insert(user);
  }
}
