import { Request, Response } from "express"
import { ModeloStudent } from "../db/Student.ts";
import { getStudent } from "../controllers/getStudent.ts";


export const updateStudent = async(req:Request, res:Response) => {

    try {
        const id = req.params.id
        const { name, email } = req.body


        const Actualizar = await ModeloStudent.findOneAndUpdate({_id: id},{
            name: name,
            email: email
        },
        {new: true, runValidators: true})

        if(!Actualizar) {
            res.status(404).send({ error: "Subject not found" });
            return;
        }
        
        await Actualizar.save()

        const estudiante = await getStudent(Actualizar)

        res.status(200).json(estudiante).send()

    } catch (error) {
        res.status(500).send(error)
    }
} 