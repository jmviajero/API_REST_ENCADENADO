import { Request, Response } from "express";
import { ModeloSubject } from "../db/Subject.ts";


export const deleteSubject = async(req:Request, res:Response) => {
    try {
        const id = req.params.id

        const Student = await ModeloSubject.findByIdAndDelete(id)
        if (!Student) {
            res.status(500).send({error: "No se encontro"})
            return
        }

        
        res.status(200).send("eliminado subject")

    } catch (error) {
        res.status(500).send(error)
    }
}