define(function () {
  const internals = {}; // internal state
  const externals = {}; // external api

  internals.API_URL = "https://opentdb.com/api.php?amount=50";

  externals.getRandomQuestion = function(dataHandle) {
    fetch(internals.API_URL)
      .then((response) => response.json())
      .then((data) => {
        dataHandle(data)
      })
      .catch((error) => {
        console.error("Error fetching random question:", error);
      });
  
    }

  return externals;
});
