import { Request, Response } from "express"
import { ModeloTeacher } from "../db/Teacher.ts";
import { getTeacher } from "../controllers/gettracher.ts";


export const updateTeacher = async(req:Request, res: Response) => {
    try {
        const id = req.params.id
        const {name, email} = req.body

        const Actualizar = await ModeloTeacher.findOneAndUpdate({_id: id}, {
            name: name,
            email: email
        }, { new: true, runValidators: true })

        if (!Actualizar) {
            res.status(500).send("Error al encontrar profesor")
            return;
        }

        const teacher = await getTeacher(Actualizar)

        res.status(200).json(teacher).send()

    } catch (error) {
        res.status(500).send(error)
    }
}