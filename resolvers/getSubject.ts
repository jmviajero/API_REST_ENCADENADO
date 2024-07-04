import { Request, Response } from "express"
import { getTeacher } from "../controllers/gettracher.ts";
import { ModeloSubject } from "../db/Subject.ts";
import { getsubjects } from "../controllers/getsubjects.ts";


export const getSubjects= async(req:Request, res:Response) => {
    try {
        
        const students = await ModeloSubject.find()
        if (!students) {
            res.status(501).send({error: "No encontro subjects"})
            return
        }

        const student = await Promise.all(
            students.map( async(e) =>  getsubjects(e))
        )

        res.status(200).json(student).send()

    } catch (error) {
        res.status(500).send(error)
    }
}