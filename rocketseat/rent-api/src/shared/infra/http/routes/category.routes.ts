import { Router } from "express";
import multer from "multer";
import { listCategoryController } from "../modules/cars/useCases/listCategory";
import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import configUpload from "../config/upload";

const createCategoryController = new CreateCategoryController();

const categoriesRoutes = Router();

const upload = multer(configUpload.upload("./tmp")

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", (req, res) => {
  return listCategoryController.handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { categoriesRoutes };
