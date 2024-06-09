import express from 'express';
import validateRequest from '../../middlwares/validateRequest';
import { offeredCourseValidations } from './offeredCourse.validation';
import { offeredCourseControllers } from './offeredCourse.controller';


const router = express.Router();

router.post(
  '/create-offered-course',
  validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferedCourse
);

router.get('/:id', offeredCourseControllers.getSingleOfferedCourse);
router.get('/', offeredCourseControllers.getAllOfferedCourse);
router.delete('/:id', offeredCourseControllers.deleteOfferedCourse);

router.patch(
  '/:id',
  validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseControllers.updateOfferedCourse
);


export const offeredCourseRoute = router;