import { Request, Response } from "express"
import { ModeloStudent } from "../db/Student.ts";


export const deleteStudent = async(req:Request, res:Response) => {
    try {
        const id = req.params.id

        const Student = await ModeloStudent.findByIdAndDelete(id)
        if (!Student) {
            res.status(500).send({error: "No se encontro"})
            return
        }

        
        res.status(200).send("eliminado student")

    } catch (error) {
        res.status(500).send(error)
    }
}