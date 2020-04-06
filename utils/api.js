const axios = require("axios");

const queryUrl     = "https://api.github.com/users/";
const queryUrlRepo = "/repos?per_page=100";

const api = {
  getUser(username) {
    const queryUrlUsername = queryUrl.concat(username); // `https://api.github.com/users/${username}`

    return axios
      .get(queryUrlUsername)
      .catch(err => {
        console.log("ERROR: Username not found.");
        process.exit(1); // Do not show Warnings!!
      });
  },

  getRepository(username) {
    const queryUrlUsername = queryUrl.concat(username.concat(queryUrlRepo)); // `https://api.github.com/users/${username}/repos?per_page=100`

    return axios
      .get(queryUrlUsername)
      .catch(err => {
        console.log("ERROR: Repository URL not found.");
        process.exit(1); // Do not show Warnings!!
      });
  }
};

module.exports = api;