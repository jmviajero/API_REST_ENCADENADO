import { ModeloStudent } from "../db/Student.ts";
import { ModeloSubject } from "../db/Subject.ts";
import { SchemaTeachertype } from "../db/Teacher.ts";
import { Teacher } from "../types.ts";




export const getTeacher = async (teacher: SchemaTeachertype): Promise<Teacher> => {

    const subjects = await ModeloSubject.find({teacher: teacher._id})

    return {
        id: teacher._id.toString(),
        name: teacher.name,
        email: teacher.email,
        subjects: await Promise.all(
            subjects.map(async(e)=> {

                const strudent = await ModeloStudent.find({_id: {$in: e.students}})
                if (!strudent) {
                    throw new Error(" not found");
                }

                return {
                    id: e._id.toString(),
                    name: e.name,
                    year: e.year,
                    students: strudent.map((student) => ({
                        id: student._id.toString(),
                        name: student.name,
                        email: student.email
                    }))
                }
            })
        )
    }
} 