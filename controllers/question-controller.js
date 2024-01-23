define(["views/question-view", "services/question-service"], function (
  questionView,
  questionService
) {
  const externals = {};
  const internals = {};

  internals.dataHandle = function (data) {
    internals.data = data.results;
    internals.newQuestion();
    internals.handleNewQuestion();
  };

  externals.start = function () {
    questionService.getRandomQuestion(internals.dataHandle);
  };

  internals.handleNewQuestion = function () {
    $("#random-question").on("click", internals.newQuestion);
  };

  internals.newQuestion = function () {
    var row = internals.data[Math.floor(Math.random() * internals.data.length)];
    console.log(row);

    var dataInfo = {
      question: row.question,
      incorrectAnswers: row.incorrect_answers,
      correctAnswer: row.correct_answer,
      category: row.category,
      answers: shuffleArray([row.correct_answer, ...row.incorrect_answers])
    };

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }

    questionView.render(dataInfo);

    // Limpa os eventos anteriores antes de adicionar novos
    $(".option").off("click", internals.handleAnswerClick);

    // Adiciona um novo evento para verificar a resposta
    $(".option").on("click", internals.handleAnswerClick);

    internals.handleNewQuestion();

  };

  internals.handleAnswerClick = function (dataInfo) {
    const selectedAnswer = $(this).text();
    const correctAnswer = dataInfo.correctAnswer;
  
    if (selectedAnswer === correctAnswer) {
      console.log("Correct!");
    } else {
      console.log("Wrong!");
    }
  }

  return externals;
});
