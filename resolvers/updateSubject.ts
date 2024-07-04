import { Response, Request } from "express"
import { ModeloSubject } from "../db/Subject.ts";
import { getsubjects } from "../controllers/getsubjects.ts";




export const updateSubject = async (req: Request, res:Response) => {
    try {
        const id = req.params.id

        const { name, year, teacher, students } = req.body

        const subject = await ModeloSubject.findByIdAndUpdate(id, {
            name: name,
            year: year,
            teacher: teacher,
            students: students
        }, { new: true, runValidators: true })

        if (!subject) {
            res.status(501).send({error: "No encuentra asignatura"})
            return
        }

        await subject.save()

        const stu = await getsubjects(subject)
        res.status(200).json(stu).send()

    } catch (error) {
        res.status(500).send(error)
    }
}