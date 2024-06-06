import { z } from "zod";

const createSemesterRegistrationValidation = z.object({
    body: z.object({

    })
})
const updateSemesterRegistrationValidation = z.object({
    body: z.object({

    })
})

export const semesterRegistrationValidations = {
    createSemesterRegistrationValidation,updateSemesterRegistrationValidation
}




   