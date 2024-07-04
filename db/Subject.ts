import mongoose from "mongoose"
import { Subject } from "../types.ts";
import { ModeloStudent } from "./Student.ts";
import { ModeloTeacher } from "./Teacher.ts";

const Schema = mongoose.Schema

const SchemaSubject= new Schema({
    name: {type: String, required: true},
    year: {type: Number, required: true},
    teacher: {type: Schema.Types.ObjectId, required: true, ref: "Teacher"},
    students: [{type: Schema.Types.ObjectId, required: true, ref: "Student"}]
})


SchemaSubject.path("students")
.validate(async function (studentsID: mongoose.Types.ObjectId[]) {
  try {
    if (studentsID.some((id) => !mongoose.isValidObjectId(id))) return false;

    const students = await ModeloStudent.find({ _id: { $in: studentsID } });
    return students.length === studentsID.length;
  } catch (e) {
    return false;
  }
});

SchemaSubject.path("teacher").validate(async function (doc: mongoose.Types.ObjectId) {
    try {
        if (!mongoose.isValidObjectId(doc)) {
            return false
        }
        const teacher = await ModeloTeacher.findById(doc);
        if (!teacher) return false;
        return true;
    } catch (error) {
        return false
    }
})

export type SchemaSubjecttype = mongoose.Document & Omit<Subject, "id" | "teacher" | "students" > & {
    teacher: mongoose.Types.ObjectId,
    students: Array<mongoose.Types.ObjectId>
}

export const ModeloSubject = mongoose.model<SchemaSubjecttype>("Subject", SchemaSubject)