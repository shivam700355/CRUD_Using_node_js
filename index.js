const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const { v4: uuidv4 } = require('uuid');
let students = [
    {
        id: uuidv4(),
        name: "shivam Maurya",
        email: "shivam@gmail.com"
    },
    {
        id: uuidv4(),
        name: "rahul Maurya",
        email: "rahul@gmail.com"
    }
    ,
    {
        id: uuidv4(),
        name: "pooja ",
        email: "pooja maurya"
    }
]


app.listen(port, () => {
    console.log('the Server is running ');
})

app.get('/', (req, res) => {
    res.render("index.ejs", { students });
});

app.get('/create', (req, res) => {
    res.render('add.ejs');
});

app.post('/adddata', (req, res) => {
    const { name, email } = req.body;
    students.push({ id: uuidv4(), name, email });
    res.redirect('/');

});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    let studentdata = students.find(student => student.id === id);
    if (!studentdata) {
        return res.status(404).send("Student not found");
    }

    res.render('edit.ejs', { student: studentdata });
});

app.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const studentIndex = students.findIndex(student => student.id === id);
    if (studentIndex !== -1) {
        students[studentIndex].name = name || students[studentIndex].name;
        students[studentIndex].email = email || students[studentIndex].email;
        res.redirect('/')
    } else {
        res.status(404).json({ message: `Student with ID ${id} not found` });
    }
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex !== -1) {
        const deletedStudent = students.splice(studentIndex, 1);

       
        res.redirect('/');
    } else {
        res.status(404).json({ message: `Student with ID ${id} not found` });
    }
});
