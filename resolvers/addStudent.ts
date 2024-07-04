import { getStudent } from "../controllers/getStudent.ts";
import { ModeloStudent } from "../db/Student.ts";
import {Response, Request} from "express"



export const addStudent = async(req:Request, res: Response) => {
    try {
        
        const {name, email} = req.body

        const student = new ModeloStudent({
            name: name,
            email: email
        })

        await student.save()

        const subject = await getStudent(student)
        res.status(200).json(subject).send()

    } catch (error) {
        res.status(500).send(error)
    }
}