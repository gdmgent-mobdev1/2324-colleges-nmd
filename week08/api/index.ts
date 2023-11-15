import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import fs from "fs";
import { Student } from "./types";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const readStudents = (): Student[] => {
  return JSON.parse(fs.readFileSync("data/students.json", "utf-8"));
};

const writeStudents = (students: Student[]) => {
  fs.writeFileSync("data/students.json", JSON.stringify(students));
};

app.get("/students", (req: Request, res: Response) => {
  const students: Student[] = readStudents();
  res.json(students);
});

app.get("/students/:id", (req: Request, res: Response) => {
  const students: Student[] = readStudents();
  const id = req.params.id;
  const student = students.find((s) => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

app.post("/students", (req: Request, res: Response) => {
  const student: Student = {
    image: "https://arteveldehogeschool.instructure.com/images/messages/avatar-50.png",
    ...req.body,
  };

  const students = [...readStudents(), student];
  // save to JSON
  writeStudents(students);

  // return added student
  res.json(student);
});

// PATCH
app.patch("/students/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const student: Student | undefined = readStudents().find((student) => student.id === id);

  if (student) {
    const updatedStudent = { ...student, ...req.body };
    // update database
    const students = readStudents().map((student) => (student.id === id ? updatedStudent : student));
    writeStudents(students);
    // return updated student
    res.json(updatedStudent);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

app.listen(3002, () => {
  console.log("Server is running on port 3002");
});
