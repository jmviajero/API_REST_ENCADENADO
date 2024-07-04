import { Request, Response } from "express"
import { ModeloSubject } from "../db/Subject.ts";
import { getsubjects } from "../controllers/getsubjects.ts";
 




export const getsubjectbyid = async(req: Request, res: Response) => {
    try {
        const id = req.params.id

        const student = await ModeloSubject.findById(id)
        if (!student) {
            res.status(501).send({error: "no subject"})
            return
        }

        const s = await getsubjects(student)
        res.status(200).json(s).send()
    } catch (error) {
        res.status(500).send(error)
    }
}