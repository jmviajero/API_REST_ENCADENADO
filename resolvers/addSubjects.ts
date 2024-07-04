
import { Request, Response } from "express"
import { ModeloSubject } from "../db/Subject.ts";
import { getsubjects } from "../controllers/getsubjects.ts";



export const addSubject = async(req:Request, res:Response) => {
    try {
        
        const {name, year, teacher, students} = req.body;

        const subject = new ModeloSubject({
            name: name,
            year: year,
            teacher: teacher,
            students: students
        })

        await subject.save()

        const sub = await getsubjects(subject)

        res.status(200).json(sub).send()

    } catch (error) {
        res.status(500).send(error)
    }
}