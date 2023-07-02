import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

class ListCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Promise<string> {
    const categories = this.categoriesRepository.list();

    return;
  }
}

export { ListCategoryUseCase };