
import {Response, Request} from "express"
import { ModeloTeacher } from "../db/Teacher.ts";
import { getTeacher } from "../controllers/gettracher.ts";



export const addTeacher = async(req:Request, res: Response) => {
    try {
        
        const {name, email} = req.body

        const teacher = new ModeloTeacher({
            name: name,
            email: email
        })

        await teacher.save()

        const teachers = await getTeacher(teacher)
        res.status(200).json(teachers).send()

    } catch (error) {
        res.status(500).send(error)
    }
}