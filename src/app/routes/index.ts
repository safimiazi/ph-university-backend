import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/accademicSemester.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { facultyRoutes } from "../modules/faculty/faculty.route";
import { CourseRoutes } from "../modules/course/course.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { offeredCourseRoute } from "../modules/offeredCourse/offeredCourse.route";
import { authRoutes } from "../modules/auth/auth.route";

const router = Router();
const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculties',
        route: AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: AcademicDepartmentRoutes,
    },
    {
        path: '/faculties',
        route: facultyRoutes,
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },
    {
        path: '/semester-ragistrations',
        route: semesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoute,
    },
    {
        path: '/auth',
        route: authRoutes,
    }
]
moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router;