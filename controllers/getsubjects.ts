import { ModeloStudent } from "../db/Student.ts";
import { SchemaSubjecttype } from "../db/Subject.ts";
import { ModeloTeacher } from "../db/Teacher.ts";
import { Subject } from "../types.ts";



export const getsubjects = async(subject: SchemaSubjecttype): Promise<Subject> => {

    const teacher = await ModeloTeacher.findOne({_id: subject.teacher})
    if (!teacher) {
        throw new Error("Teacher not found")
    }

    const student = await ModeloStudent.find({_id: {$in: subject.students}})
    if (!student) {
        throw new Error("Student not found")
    }

    return {
        id: subject._id.toString(),
        name: subject.name,
        year: subject.year,
        teacher: {
            id: teacher._id.toString(),
            name: teacher.name,
            email: teacher.email
        },
        students: student.map((student) => ({
            id: student._id.toString(),
            name: student.name,
            email: student.email
        })
            
        )
    }
}