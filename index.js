const fs       = require("fs");
const inquirer = require("inquirer");
const path     = require('path');
// Javascript Files:
const api              = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

let questions = [
  {
    type:    "input",
    name:    "username",
    message: "Please, enter your GitHub username: "
  }
];

let requirements = [
  {
    type:    "input",
    name:    "tablecontents",
    message: "Describe the Contents of your project."
  },
  {
    type:    "list",
    name:    "dynamic",
    message: "Does your project present features dynamically updated?",
    choices: [
      "Yes",
      "No"
    ]
  },
  {
    type:    "input",
    name:    "installation",
    message: "Briefly describe the method of installation."
  },
  {
    type:    "input",
    name:    "pages",
    message: 'Name each page of your project separated by comma (",").'
  },
  {
    type:    "list",
    name:    "usage",
    message: "What is the purpose of your project?",
    choices: [
      "Academic",
      "Commercial"
    ]
  },
  {
    type:    "input",
    name:    "contributing",
    message: 'If your project was collaborative, present the name(s) of your collaborator(s) separated by comma (","). Otherwise, press ENTER.'
  },
  {
    type:    "input",
    name:    "tests",
    message: "If you developed tests outlining the expected functionality for implemented application code, briefly describe your tests. Otherwise, press ENTER."
  },
  {
    type:    "checkbox",
    name:    "languages",
    message: "Which languages were used?",
    choices: [
      "HTML",
      "CSS",
      "Javascript",
      "Jquery"
    ]
  },
  {
    type:    "checkbox",
    name:    "fonts",
    message: "If you make use of differrent fonts and or icons in your project, select one or more options below. Otherwise, select SKIP.",
    choices: [
      "Google",
      "Google-Fonts",
      "Font-Awesome",
      "SKIP"
    ]
  },
  {
    type:    "checkbox",
    name:    "images",
    message: "If you make use of differrent images in your project, select one or more options below. Otherwise, select SKIP.",
    choices: [
      "Google",
      "Pinterest",
      "Flickr",
      "SKIP"
    ]
  }
];

function writeToFile(data, ...fileName) {
  for (let index = 0; index < fileName.length; index++) {
    console.log(`Creating "${fileName[index]}" file...`)

    fs.writeFileSync(path.join(process.cwd(), fileName[index]), data[index], function(err){
      if (err) {
        console.log(`ERROR: "${fileName[index]}" file was not create due to ${err}.`);
      }
    });
    console.log(`"${fileName[index]}" file successfully created!`); 
  }
}

function init() {
  inquirer.prompt(questions[0]).then( (response_Q0) => {
    api.getUser(response_Q0.username).then((resUser) => {
      // console.log("Response.Data = ", resUser.data);

      api.getRepository(response_Q0.username).then((resRepo) => {
        const repoNames = resRepo.data.map((repository) => repository.name);
        // console.log("Chosen One: ", resRepo.data);

        if (repoNames.length > 0) {
          // Put ALL repositories as options to the user
          questions.push( 
            {
              type:    "list",
              name:    "repolist",
              message: 'Please, choose 1 (one) repository to create your new "Readme.md" file:',
              choices: repoNames
            }
          );

          inquirer.prompt(questions[questions.length - 1]).then( (response_Q1) => {
            // console.log(`Data from Chosen One: ${resRepo.data[questions[questions.length - 1].choices.indexOf(response_Q1.repolist)].name}`);
            inquirer.prompt(requirements).then( (responseRequirements) => {
              writeToFile(generateMarkdown(resUser.data, resRepo.data[questions[questions.length - 1].choices.indexOf(response_Q1.repolist)], responseRequirements, repoNames), "README.md", `${resUser.data.login}.pdf`);
            });
          });
        }
        else
          console.log(`WARNING: "${response_Q0.username}" does not have a repository.`);
      });
    });
  });
}

init();
