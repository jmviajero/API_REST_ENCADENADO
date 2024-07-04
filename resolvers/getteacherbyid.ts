import { Request, Response } from "express"
import { getStudent } from "../controllers/getStudent.ts";
import { ModeloTeacher } from "../db/Teacher.ts";
import { getTeacher } from "../controllers/gettracher.ts";
 




export const getteacherbyid = async(req: Request, res: Response) => {
    try {
        const id = req.params.id

        const student = await ModeloTeacher.findById(id)
        if (!student) {
            res.status(501).send({error: "no profe"})
            return
        }

        const s = await getTeacher(student)
        res.status(200).json(s).send()
    } catch (error) {
        res.status(500).send(error)
    }
}