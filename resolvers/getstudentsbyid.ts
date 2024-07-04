import { Request, Response } from "express"
import { ModeloStudent } from "../db/Student.ts";
import { getStudent } from "../controllers/getStudent.ts";
 




export const getstudentbyid = async(req: Request, res: Response) => {
    try {
        const id = req.params.id

        const student = await ModeloStudent.findById(id)
        if (!student) {
            res.status(501).send({error: "no estudiante"})
            return
        }

        const s = await getStudent(student)
        res.status(200).json(s).send()
    } catch (error) {
        res.status(500).send(error)
    }
}