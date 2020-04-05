const axios = require("axios");

const queryUrl     = "https://api.github.com/users/";
const queryUrlRepo = "/repos?per_page=100";

const api = {
  getUser(username) {
    const queryUrlUsername = queryUrl.concat(username); // `https://api.github.com/users/${username}`
    // console.log(`API URL = ${queryUrlUsername}`);

    return axios
      .get(queryUrlUsername)
      .catch(err => {
        console.log("ERROR: Username not found.");
        process.exit(1);
      });
  },

  getRepository(username) {
    const queryUrlUsername = queryUrl.concat(username.concat(queryUrlRepo)); // `https://api.github.com/users/${username}/repos?per_page=100`
    // console.log(`API URL = ${queryUrlUsername}`);

    return axios
      .get(queryUrlUsername)
      .catch(err => {
        console.log("ERROR: Repository URL not found.");
        process.exit(1);
      });
  }
};

module.exports = api;