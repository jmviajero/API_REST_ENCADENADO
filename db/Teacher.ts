import mongoose from "mongoose"
import { Teacher } from "../types.ts";

const Schema = mongoose.Schema

const SchemaTeacher = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true}
})

export type SchemaTeachertype = mongoose.Document & Omit<Teacher, "id" | "subjects">

export const ModeloTeacher = mongoose.model<SchemaTeachertype>("Teacher", SchemaTeacher)