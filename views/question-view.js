define(function () {
  const internals = {
    elements: {},
    handlers: {
      optionClicked: null,
    }
  };

  const externals = {
    elements: {},
  };

  internals.createButton = function () {
    return '<div></div><button id="random-question">Next Question</button>';
  };


  internals.createQuestion = function (dataInfo) {
    let questions = [dataInfo.correctAnswer, ...dataInfo.incorrectAnswers]

      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    internals.elements.app.append(
      `<div class="category"><p>${dataInfo.category}</p></div>
      <p class="currentQuestion" type="button">${dataInfo.question}</p>
      <div class="optionContainer"><button class="option" type="button">${questions[0]}</button>
      <button class="option" type="button">${questions[1]}</button>
      </div><div class="optionContainer"><button class="option" type="button">${questions[2]}</button>
      <button class="option" type="button">${questions[3]}</button></div>`
    );    



  };

  internals.renderButton = function () {
    if (internals.elements.button) {
      return;
    }

    internals.elements.button = $(internals.createButton());
    internals.elements.app.append(internals.elements.button);
  };

  externals.bind = function (event, handler) {
    internals.handlers[event] = handler;
  };

  externals.bind('optionClicked', function(selectedAnswer, correct_answer){
    $(".option").on("click", function () {
      const selectedAnswer = $(this).text();
      clickCallback(selectedAnswer, dataInfo.correctAnswer);
  });
  })

  externals.render = function (dataInfo) {
    internals.elements.app = $("#app");
    internals.clearUI();
    internals.renderNewUI(dataInfo);

    
  };

  internals.clearUI = function () {
    internals.elements.app.empty();
    internals.elements.button = null;
  };

  internals.renderNewUI = function (dataInfo) {
    internals.createQuestion(dataInfo);
    internals.renderButton();
    
  };



  return externals;
});
