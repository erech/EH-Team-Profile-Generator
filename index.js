//use inquire
var inquirer = require('inquirer')
var fs = require('fs')

//creating the html buffer
var buf = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
        <title>Team Profiles</title>
        <style>
            .member {
                width: auto;
                padding: 25px
                margin: 50px;
                background-color: #d6d0c5;
                box-shadow: 0px 3px 3px;
                border-radius:25px;
            }
            .inner{
                width: auto;
                background-color: #e6d9c3;
                padding: 35px;
                border-radius: 25px;
            }
        </style>
    </head>
    <body>
    <div style="width: 100%; height: auto; text-align: center; background-color: rgb(192, 255, 234);">
                <h1> This Team </h1>
            </div>
            <br>
            <div class="container">
                <div class="row">`

//declare team variables
let team = {}
let manager = {}
let engineer = {}
let intern = {}

//require for an entry
const isEmpty = async (input) =>{
    if (input =='') return 'Entry required'
    else return true
}

//output buffer to generated folder
function writeToFile(fileName, data)
{
    fs.appendFile(('./generated/'+fileName), data, function (err)
    {
        if (err) throw err
        console.log('Appended')
    })
}

//function to build the HTML
function buildHtml() {
    console.log("Generated and appended responses to file");
    buf +=
        `<div class ="col-sm member">
            <h4>${manager.name}</h4>
            <h3>Manager</h3>
                <div class = "inner">
                ID: ${manager.id} </br>
                Email: ${manager.email} </br>
                office number: ${manager.office}
                </div>
        </div>`

    engineers.forEach(engineer => {
    buf +=
    `<div class="col-sm member">
        <h4>${engineer.name}</h3>
        <h3>Engineer</h3>
            <div class="inner">
            ID: ${engineer.id}</br>
            Email: ${engineer.email}</br>
            Github Link: ${engineer.github}
            </div>
    </div>`
})
    interns.forEach(intern => {
    buf +=
    `<div class="col-sm member">
        <h4>${intern.name}</h4>
        <h3>Intern</h3>
            <div class="inner">
            ID: ${intern.id}</br>
            Email: ${intern.email}</br>
            School: ${intern.school}
            </div>
    </div>`
})

    buf +=
                `</div>
            </div>
        </body>
    </html>`

    //write html based on buf responses
    writeToFile("generated.html", buf)
}

//manager section
//manager questions
const managerQ = [
    {
    type:'input',
    name:'name',
    message:'Enter manager name',
    validate: isEmpty,
    },
    {
    type:'input',
    name:'id',
    message:'Enter id',
    validate: isEmpty,
    },
    {
    type:'input',
    name:'email',
    message:'Enter email',
    validate: isEmpty,
    },
    {
    type:'input',
    name:'office',
    message:'Enter office number',
    validate: isEmpty,
    },
]

//engineer questions
const engineerQ = [
    {
    type:'input',
    name:'name',
    message:'Enter engineer name',
    validate: isEmpty,
    },
    {
    type:'input',
    name:'id',
    message:'Enter id',
    validate: isEmpty,
    },
    {
    type:'input',
    name:'email',
    message:'Enter email',
    validate: isEmpty,
    },
    {
    type:'input',
    name:'github',
    message:'Enter github username',
    validate: isEmpty,
    },
];

//intern section
const internQ = [
    {
    type:'input',
    name:'name',
    message:'Enter intern name',
    validate: isEmpty,
    },
    {
    type:'input',
    name:'id',
    message:'Enter id',
    validate: isEmpty,
    },
    {
    type:'input',
    name:'email',
    message:'Enter email',
    validate: isEmpty,
    },
    {
    type:'input',
    name:'office',
    message:'Enter school',
    validate: isEmpty,
    },
]

