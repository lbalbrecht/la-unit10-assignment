const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { create } = require("domain");

function buildTeam() {
    function start() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `What is your manager's name?`,
                    name: 'managerName',
                },
                {
                    type: 'input',
                    message: `What is your manager's ID?`,
                    name: 'managerId',
                },
                {
                    type: 'input',
                    message: `What is your manager's email?`,
                    name: 'managerEmail',
                },
                {
                    type: 'input',
                    message: `What is your manager's office number?`,
                    name: 'officeNumber',
                },
            ])
            .then(response => {
                const newManager = new Manager(response.managerName, response.managerId, response.managerEmail, response.officeNumber)
                console.log(newManager)
                team.push(newManager)
                newMember()
            });
    }
    function newMember() {
        inquirer
            .prompt([
                {
                    type: "list",
                    message: "Would you like to add a new team member?",
                    choices: ["engineer", "intern", "quit"],
                    name: "newEmployee",
                },
            ])
            .then(response => {
                switch (response.newEmployee) {
                    case "engineer":
                        newEngineer();
                        break;
                    case "intern":
                        newIntern();
                        break;
                    case "quit":
                        create();
                        break;
                }
            })
    }
    function newEngineer() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `What is your engineer's name?`,
                    name: 'engineerName',
                },
                {
                    type: 'input',
                    message: `What is your engineer's ID?`,
                    name: 'engineerId',
                },
                {
                    type: 'input',
                    message: `What is your engineer's email?`,
                    name: 'engineerEmail',
                },
                {
                    type: 'input',
                    message: `What is your engineer's Github username?`,
                    name: 'github',
                },
            ])
            .then(response => {
                const newEngineer = new Engineer(response.engineerName, response.engineerId, response.engineerEmail, response.github)
                console.log(newEngineer)
                team.push(newEngineer)
                newMember()
            });
    }
    function newIntern() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: `What is your intern's name?`,
                    name: 'internName',
                },
                {
                    type: 'input',
                    message: `What is your intern's ID?`,
                    name: 'internId',
                },
                {
                    type: 'input',
                    message: `What is your intern's email?`,
                    name: 'internEmail',
                },
                {
                    type: 'input',
                    message: `Where does your intern go to school?`,
                    name: 'school',
                },
            ])
            .then(response => {
                const newIntern = new Intern(response.internName, response.internId, response.internEmail, response.school)
                console.log(newIntern)
                team.push(newIntern)
                newMember()
            });Engineer
    }
    function create() {
        fs.writeFile(outputPath, render(team), function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    }
    start();
}
buildTeam();

// Write code to use inquirer to gather information about the development team members,
var team = []
var id = []
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
