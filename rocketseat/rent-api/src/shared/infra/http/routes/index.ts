import { Router } from 'express';
import { categoriesRoutes } from './category.routes';
import { specificationsRoutes } from './specification.routes';
import { usersRouter } from './users.routes';
import { autenticateRouter } from './authenticate.routes';

const router = Router();

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationsRoutes);
router.use('/users', usersRouter);
router.use(autenticateRouter)


export { router };