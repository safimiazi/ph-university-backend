import express from 'express'
import { facultyControllers } from './faculty.controller'

const router = express.Router()

router.get('/', facultyControllers.getAllFaculties)



export const facultyRoutes = router;