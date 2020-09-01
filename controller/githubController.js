const axios = require("axios");

exports.getTrendingRepos = function (request, response) {
  let date = new Date();

  let currUtcDate =
    date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();

  let currUtcMonth =
    date.getUTCMonth() < 10 ? "0" + date.getUTCMonth() : date.getUTCMonth();

  let currUTCDate =
    date.getUTCFullYear() + "-" + currUtcMonth + "-" + currUtcDate;

  axios
    .get(
      "https://api.github.com/search/repositories?q=created:>" +
        currUTCDate +
        "&sort=stars&order=desc"
    )
    .then((res) => {
      let data = res.data.items;

      let result = {};

      // go through the list of repos from the github
      data.forEach((repo) => {
        // If this language data is not stored then save
        if (result[repo.language] === undefined) {
          result[repo.language] = {
            language: repo.language,
            noOfRepos: 1,
            repos: [repo],
          };
        } else {
          // update the list of repos
          result[repo.language].noOfRepos++;
          result[repo.language].repos.push(repo);
        }
      });

      // return the result by converting out object list into array of data
      response.status(200).json({
        data: Object.values(result),
      });
    })
    .catch((err) => {
      response.status(500).json({
        statusCode: 500,
        message: "Sone Unexpected Error Occurred. Please try again!",
      });
    });
};
