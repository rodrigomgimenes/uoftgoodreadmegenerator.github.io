const creditsLinks = [
  {
    type: "Google",
    url:  "https://www.google.ca/"
  },
  {
    type: "Google-Fonts",
    url:  "https://fonts.google.com/"
  },
  {
    type: "Font-Awesome",
    url:  "https://fontawesome.com/?from=io"
  },
  {
    type: "Pinterest",
    url:  "https://www.pinterest.ca/"
  },
  {
    type: "Flickr",
    url:  "https://www.flickr.com/"
  }
];

function generateMarkdown(...data) {
  // data[0] = Response USER
  // data[1] = Response REPOSITORY
  // data[2] = Response REQUIREMENTS
  // data[3] = Response ALL REPOSITORIES

  let fileArray = [];
  fileArray.push(createFileReadme(...data));
  fileArray.push(createFileProfileGitHub(...data));

  return fileArray;
}

function createFileReadme(...dataReadme) {
  return`# Project: ${dataReadme[1].name.split('.')[0]} by ${dataReadme[0].name} 
# ===========================================

  ## File:

  * ['portfolio-webpage'](https://${dataReadme[0].login}.github.io/${dataReadme[1].name}/)

  ## Description:
  ${dataReadme[1].description}


  ## Instructions:

  * This webpage is a coding assignment, which is based on concepts of ${dataReadme[2].languages}.

  ${verifyPages(dataReadme[2].pages)}

  ${verifyContent(dataReadme[2].tablecontents)}


  ## Basic Informations: 

  ${getBasicInformation(dataReadme[2])}


  ## Installation:

  ${getInstallInformation(dataReadme[2].installation)}


  ## Usage: 

  * The content of this project is purely ${dataReadme[2].usage}.


  ## License: ${dataReadme[1].license !== null ? `This project is licensed under ${dataReadme[1].license} license.` : "None"}


  ## Contributing:
  
  * This webpage ${dataReadme[2].contributing.length > 0 ? `presents the following collaborators: ${dataReadme[2].contributing}.` : `does not have collaborators.`}
  
  
  ## Tests:

  ${getTestInformation(dataReadme[2].tests)}


  ## Author:
  * This app was design by ['${dataReadme[0].name}'](${dataReadme[0].avatar_url}) 
  * Contact Me: 
    1. Email: ${dataReadme[0].email !== null ? `${dataReadme[0].email}` : "-"}
    2. LinkedIn: ['My Profile'](${dataReadme[0].blog}) 
  
  ## Credits:

  ${getCreditsInformation(dataReadme[2].images, dataReadme[2].fonts, dataReadme[0].html_url)}
  `;
}

function createFileProfileGitHub(...dataProfile) {
  return `# GitHub Profile # 
# ============== #


  ## Personal Info:

  * Profile Image:   ${dataProfile[0].avatar_url}
  * Name:            ${dataProfile[0].name}
  * Location:        ${dataProfile[0].location !== null ? `${dataProfile[0].location}` : "Not specified"} 
  * Current Company: ${dataProfile[0].company  !== null ? `${dataProfile[0].company}`  : "Not specified"}
  

  ## Biography:
  * ${dataProfile[0].bio !== null ? `${dataProfile[0].bio}` : "Not specified"}


  ## Specific Info:
  * Number of Followers: ${dataProfile[0].followers}
  * Number Following: ${dataProfile[0].following}
  * Number of Public Repositories: ${dataProfile[0].public_repos}
  ${printAllRepositories(dataProfile[3])}


  ## Links:
  * Link to GitHub Profile: ${dataProfile[0].html_url} 
  * Link to blog:           ${dataProfile[0].blog}
  * Email:                  ${dataProfile[0].email !== null ? `${dataProfile[0].email}` : "Not specified"}
`;
}

function verifyPages(projectPage) {
  return projectPage.length > 0 ? `* The webpage consists in the following page(s): ${projectPage}` : "";
}

function verifyContent(projectContent) {
  const defaultContent = `* Once the main webpage (index.html) loads completely, the user will be presented with the following elements:
    1. //Describe your webpage here!

  * How to use?
    1. //Describe how to use your webpage here!

  * Hope you enjoy it!!`;

  return projectContent.length > 0 ? projectContent : defaultContent;
}

function getBasicInformation(projectFeatures) {
  if (projectFeatures.dynamic.toLowerCase() === "yes") {
    let featureSize = projectFeatures.languages.length;

    // Must have more than one programming language
    if (featureSize > 1) {
      let updated  = "";
      let powered  = "";
      let position = 0;
      
      while (featureSize > 0) {
        if (projectFeatures.languages[position].toLowerCase() === 'html' || projectFeatures.languages[position].toLowerCase() === 'css') {
          updated += updated.length === 0 ? projectFeatures.languages[position] : ` and ${projectFeatures.languages[position]}`;
        }
        else {
          if (projectFeatures.languages[position].toLowerCase() === 'javascript' || projectFeatures.languages[position].toLowerCase() === 'jquery') {
            powered += powered.length === 0 ? projectFeatures.languages[position] : ` and ${projectFeatures.languages[position]}`;
          }
        }

        position++;
        featureSize--;
      }

      if ((updated.length > 0) && (powered.length > 0))
        return `* This app runs in the browser and features dynamically updated ${updated} powered by ${powered} code. It also features a clean and polished user interface and it is responsive, adapting to multiple screen sizes.`
    }
  }
  return `* This app runs in the browser and features a clean and polished user interface and it is responsive, adapting to multiple screen sizes.`;
}

function getInstallInformation(projectInstall) {
  const defaultContent = `* The installation process will proceed as it follows:
    1. //Describe the steps of your application install here!
  or
  * No installation required!`

  return projectInstall.length > 0 ? projectInstall : defaultContent;
}

function getTestInformation(projectTest) {
  const defaultContent = `* In this project, the following testing procedures were performed:
    1. //Describe the steps of your application tests here!
  or
  * No testing procedures were performed in this project.`

  return projectTest.length > 0 ? projectTest : defaultContent;
}

function getCreditsInformation (projectImages, projectFonts, projectOthers) {
  let defaultContent = `* Other:
  ['GitHub'](${projectOthers})`;

  if ((projectImages[0].toLowerCase() === "skip") && (projectFonts[0].toLowerCase() === "skip"))
    return defaultContent;
  else {
    const sizeCredits = projectImages.length > projectFonts.length ? projectImages.length : projectFonts.length;
    let imagesContent = `* Images:`;
    let fontsContent  = `* Icons & Fonts:`;

    for (let index = 0; index < sizeCredits; index++) {
      if ((projectImages.length > index) && (projectImages[index].toLowerCase() !== "skip")) {
        let credImages = creditsLinks.filter(element => element.type.toLowerCase() === projectImages[index].toLowerCase());

        imagesContent += `
        ['${credImages[0].type}'](${credImages[0].url})`;
      }
      if ((projectFonts.length > index) && (projectFonts[index].toLowerCase() !== "skip")) {
        let credFonts = creditsLinks.filter(element => element.type.toLowerCase() === projectFonts[index].toLowerCase());
        
        fontsContent += `
        ['${credFonts[0].type}'](${credFonts[0].url})`;
      }
    }

    return imagesContent + "\n" + fontsContent + "\n" + defaultContent;
  }
}

function printAllRepositories (repoArray) {
  if (repoArray.length > 0) {
    let repoFinal = ` ** Repositories:`;
    repoArray.forEach((element, index) => {
      repoFinal += `
        ${index + 1}. ${element}`;
    });

    return repoFinal;
  }
}


module.exports = generateMarkdown;