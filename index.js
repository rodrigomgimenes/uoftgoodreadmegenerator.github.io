const fs = require("fs");
const inquirer = require("inquirer");
// Javascript Files:
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

const questions = [
  {
    type:    "input",
    message: "Please, enter your GitHub username: ",
    name:    "username"
  }
];

function writeToFile(fileName, data) {
  // const writeFileAsync = util.promisify(fs.writeFile);
}

function init() {
  inquirer.prompt(questions[0]).then( (response) => {
    api.getUser(response).then(({ res }) => {
      console.log("Response.Data = ", res.data);
    });
  });
}

init();
