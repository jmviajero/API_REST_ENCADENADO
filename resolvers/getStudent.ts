import { Request, Response } from "express"
import { ModeloStudent } from "../db/Student.ts";
import { getStudent } from "../controllers/getStudent.ts";


export const getStudents = async(req:Request, res:Response) => {
    try {
        
        const students = await ModeloStudent.find()
        if (!students || students.length === 0) {
            res.status(404).send({ error: "No se encontraron estudiantes" });
            return;
        }

        const student = await Promise.all(
            students.map( async(e) =>  getStudent(e))
        )

        res.status(200).json(student).send()

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}