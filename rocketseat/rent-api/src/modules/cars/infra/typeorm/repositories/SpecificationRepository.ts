import { Specification } from "../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "../../../repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  findByName(name: string): Specification {
    throw new Error("Method not implemented.");
  }
  list(): Specification[] {
    throw new Error("Method not implemented.");
  }
  create({ name, description }: ICreateSpecificationDTO): void {
    throw new Error("Method not implemented.");
  }
}

export { SpecificationRepository };
