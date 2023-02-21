const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const InitialData = require('./InitialData');
const port = 8080
app.use(express.urlencoded());

let students= InitialData

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
app.get('/api/student',(req,resp)=>{
    resp.json(students)
})
app.get('/api/student/:id',(req,resp)=>{
    const id = req.params.id;
    const studentId = students.find((student)=>student.id == id);
    if(studentId){
        resp.json(studentId)
    }
    else{
        resp.status(404).json("Student Details not Found in this Array")
    }
})

app.post('/api/student', (req, res) => {
    const { name, currentClass, division } = req.body;
    if (!name || !currentClass || !division) {
      res.status(400).send('Missing required fields');
    } else {
      const newStudent = {
        id: students.length + 1,
        name,
        currentClass,
        division,
      };
      students.push(newStudent);
      res.json({ id: newStudent.id });
    }
});



app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   