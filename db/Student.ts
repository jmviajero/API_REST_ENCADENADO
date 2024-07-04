import mongoose from "mongoose"
import { Student } from "../types.ts";


const Schema = mongoose.Schema

const SchemaStudent = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}
})

export type SchemaStudenttype = mongoose.Document & Omit<Student, "id" | "subjets">

export const ModeloStudent = mongoose.model<SchemaStudenttype>("Student", SchemaStudent)