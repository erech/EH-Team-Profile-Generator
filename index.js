//use inquire
var inquirer = require('inquirer')
var fs = require('fs')

//creating the html buffer
let buf = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profiles</title>
        <style>
            .member {
                width: 50%;
                margin-left: 25%;
                text-align: center;
                background-color: #dce4f7;
                border-radius: 25px;
            }
            h3, 
            h4 {
                /* display: flex; */
                font-size: 50px
                justify-items: center;
                /* margin-left: 230px; */
            }
            .inner{
                width: auto;
                display: flex;
                justify-content: center;
                display: inline-flex;
                background-color: #f1f1f1;
                padding: 30px;
                border-radius: 25px;
            }
        </style>
    </head>
    <body>
    <div style=
        "width: 100%; 
        height: auto; 
        text-align: center; 
        border-radius: 25px;
        padding: 10px;
        background-color: rgb(197, 207, 243);">
                <h1> Team Profile </h1>
            </div>
            <br>
            <div class="container">
                <div class="row">`

//declare team variables
let manager = {}
let engineers = []
let interns = []

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
        buf +=
        `<div class="col-sm member">
            <h4>${manager.name}</h4>
            <h3>Manager</h3>
            <div class="inner">
            ID: ${manager.ID}<br>
            Email: ${manager.email}<br>
            Office number: ${manager.office}
            </div>
        </div>`

    engineers.forEach(engineer => 
    {
        buf +=
        `<div class="col-sm member">
            <h4>${engineer.name}</h3>
            <h3>Engineer</h3>
                <div class="inner">
                ID: ${engineer.ID}</br>
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
            ID: ${intern.ID}</br>
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
    name:'ID',
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
    }
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
    name:'ID',
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
    }
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
    name:'ID',
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
    name:'school',
    message:'Enter school',
    validate: isEmpty,
    }
]


//function to add an engineer
function addEngineer()
{
    inquirer.prompt(engineerQ)
    .then((answers) =>
    {
        newEngineer = {};
        newEngineer.name = answers.name;  
        newEngineer.ID = answers.ID;
        newEngineer.email = answers.email;
        newEngineer.github = answers.github;
        engineers.push(newEngineer);
        addMenu();
    })
    .catch((error) =>
    {
        if (error.isTtyError){
            console.log('Error adding engineer')
        } else{
            console.log('Error2')
        }
    })
}

//function to add an intern
function addIntern()
{
    inquirer.prompt(internQ)
    .then((answers) =>
    {
        newIntern = {};
        newIntern.name = answers.name;  
        newIntern.ID = answers.ID;
        newIntern.email = answers.email;
        newIntern.school = answers.school;
        interns.push(newIntern);
        addMenu();
    })
    .catch((error) =>
    {
        if (error.isTtyError){
            console.log('Error adding intern')
        } else{
            console.log('Error3')
        }
    })
}

//function itterates to add team members
function addMenu()
{
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'selection',
                message: 'Enter more employees?',
                choices: ['Add Engineer', 'Add Intern', 'Done'],
            }
        ]).then((response) =>
        {
            if (response.selection == 'Add Engineer') return addEngineer();
            else if (response.selection == 'Add Intern') return addIntern();
            else if (response.selection == 'Done') return buildHtml();
            else return console.log(selection);
        });
}

//function to add an manager
function addManager()
{
    inquirer.prompt(managerQ)
    .then((answers) =>
    {
        manager.name = answers.name;  
        manager.ID = answers.ID;
        manager.email = answers.email;
        manager.office = answers.office;
        addMenu();
    })
    .catch((error) =>
    {
        if (error.isTtyError){
            console.log('Error adding manager')
        } else{
            console.log('Error1')
        }
    })
}


//Intro to the app
inquirer.prompt(
    [
        {
            type: 'confirm',
            name: 'begin',
            message: 'Start',
        }
    ]).then((response) =>
    {
        if (response.begin) return addManager();
        else return console.log('Session ended')
    })