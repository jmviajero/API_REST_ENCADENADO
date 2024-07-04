import { Request, Response } from "express";
import { ModeloTeacher } from "../db/Teacher.ts";


export const deleteTeacher = async(req:Request, res:Response) => {
    try {
        const id = req.params.id

        const Student = await ModeloTeacher.findByIdAndDelete(id)
        if (!Student) {
            res.status(500).send({error: "No se encontro"})
            return
        }

        
        res.status(200).send("eliminado teacher")

    } catch (error) {
        res.status(500).send(error)
    }
}