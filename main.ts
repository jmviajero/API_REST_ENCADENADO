import mongoose from "mongoose"
import express from "express"
import { addStudent } from "./resolvers/addStudent.ts";
import { addTeacher } from "./resolvers/addTeacher.ts";
import { addSubject } from "./resolvers/addSubjects.ts";
import { updateStudent } from "./resolvers/updateStudent.ts";
import { updateTeacher } from "./resolvers/updateTeacher.ts";
import { updateSubject } from "./resolvers/updateSubject.ts";
import { deleteStudent } from "./resolvers/deleteStudent.ts";
import { deleteTeacher } from "./resolvers/deleteTeacher.ts";
import { deleteSubject } from "./resolvers/deleteSubject.ts";
import { getStudents } from "./resolvers/getStudent.ts";
import { getteacher } from "./resolvers/getTeacher.ts";
import { getSubjects } from "./resolvers/getSubject.ts";
import { getstudentbyid } from "./resolvers/getstudentsbyid.ts";
import { getteacherbyid } from "./resolvers/getteacherbyid.ts";
import { getsubjectbyid } from "./resolvers/getsubjectbyid.ts";


const MONGO_URL = Deno.env.get("MONGO_URL")
if (!MONGO_URL) {
  throw new Error("error al conectar con la base de datos")
}

await mongoose.connect(MONGO_URL)
console.log("conectado a base de datos")


const app = express()

app.use(express.json())

app.post("/student", addStudent )
app.post("/teacher", addTeacher )
app.post("/subject", addSubject )
app.put("/student/:id", updateStudent )
app.put("/teacher/:id", updateTeacher )
app.put("/subject/:id", updateSubject )
app.delete("/student/:id", deleteStudent )
app.delete("/teacher/:id", deleteTeacher )
app.delete("/subject/:id", deleteSubject )
app.get("/student", getStudents )
app.get("/teacher",  getteacher )
app.get("/subject", getSubjects)
app.get("/student/:id", getstudentbyid )
app.get("/teacher/:id", getteacherbyid )
app.get("/subject/:id", getsubjectbyid )

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});