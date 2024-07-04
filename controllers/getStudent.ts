import { SchemaStudenttype } from "../db/Student.ts";
import { ModeloSubject } from "../db/Subject.ts";
import { ModeloTeacher } from "../db/Teacher.ts";
import { Student } from "../types.ts";




export const getStudent = async(student: SchemaStudenttype): Promise<Student> => {

    const { _id, name, email } = student;

  // Obtén todas las asignaturas del estudiante
  const subjects = await ModeloSubject.find({ students: _id });



  return {
    id: _id.toString(),
    name,
    email,
    subjects:await Promise.all(
        subjects.map(async (subject) => {
          const teacher = await ModeloTeacher.findById(subject.teacher);
          if (!teacher) throw new Error("Teacher not found");
          
          return {
            id: subject._id.toString(),
            name: subject.name,
            year: subject.year,
            teacher: {
              id: teacher._id.toString(),
              name: teacher.name,
              email: teacher.email,
            },
          };
        })
      )
  };
};
