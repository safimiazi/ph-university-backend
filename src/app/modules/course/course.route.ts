import express from 'express';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';
import validateRequest from '../../middlwares/validateRequest';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', CourseControllers.getSingleCourse);

router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete('/:id', CourseControllers.deleteCourse);

// router.put(
//   '/:courseId/assign-faculties',
//   validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.assignFacultiesWithCourse,
// );

// router.delete(
//   '/:courseId/remove-faculties',
//   validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
//   CourseControllers.removeFacultiesFromCourse,
// );

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;