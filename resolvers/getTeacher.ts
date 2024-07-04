import { Request, Response } from "express"
import { getTeacher } from "../controllers/gettracher.ts";
import { ModeloTeacher } from "../db/Teacher.ts";


export const getteacher= async(req:Request, res:Response) => {
    try {
        
        const students = await ModeloTeacher.find()
        if (!students) {
            res.status(501).send({error: "No encontro estudiantes"})
            return
        }

        const student = await Promise.all(
            students.map( async(e) =>  getTeacher(e))
        )

        res.status(200).json(student).send()

    } catch (error) {
        res.status(500).send(error)
    }
}