// Doctor Who Trivia questions, choices and answers

$(document).ready(function() {

  var triviaSlides = [
    {
      Question:
        "Professors Yana and Thascalos were aliases used by which villain?",
      Answer: "The Master",
      Choice: [
        "The Great Intelligence",
        "The Master",
        "Daleks",
        "The Silence"
      ]
    },

    {
      Question: "What is Clara's last name??",
      Answer: "Oswald",
      Choice: ["Ozzy", "Osgood", "Oswald", "Oswin"]
    },

    {
      Question:
        "That is the planet that is said to be the place the Doctor will die?",
      Answer: "Tranzalore",
      Choice: ["Tranzalore", "Skaro", "Gallifrey", "Earth"]
    },

    {
      Question:
        "When the 11th Doctor meets Amelia Pond, what is it that he eats and actually likes?",
      Answer: "Fish fingers and custard",
      Choice: ["Tacos", "Nachos", "Bean burrito", "Fish fingers and custard"]
    },

    {
      Question:
        "In 'The Christmas Invasion' The Doctor and Rose return to London. Who is the prime minister at the time?",
      Answer: "Harriet Jones",
      Choice: [
        "Gwen Wendells",
        "Harriet Jones",
        "Tony Blair",
        "Winston Churchill"
      ]
    },

    {
      Question: "In 'Girl In the Fireplace' what is Reinette's full name?",
      Answer: "Jean Poisson",
      Choice: [
        "Reinette Chat",
        "Reinette Chien",
        "Reinette Paul",
        "Jean Poisson"
      ]
    },

    {
      Question: "Where did The Doctor and Rose first meet Captain Jack?",
      Answer: "World War II",
      Choice: [
        "Cardiff during the Blitz",
        "Satellite Five",
        "World War II",
        "Platform One"
      ]
    },

    {
      Question: "Where is 'Doctor Who' mainly filmed?",
      Answer: "Cardiff",
      Choice: ["Cardiff", "Manchester", "London", "The Midlands"]
    },

    {
      Question: "What episode did River Song first appear in?",
      Answer: "Silence in the Library.",
      Choice: [
        "Silence in the Library.",
        "Forest of the Dead.",
        "Time of Angels.",
        "Midnight."
      ]
    },

    {
      Question: "What does TARDIS stand for?",
      Answer: "Time and Relative Dimension In Space",
      Choice: [
        "Time and Relative Distance In Space",
        "Tethered Aerial Release Developed in Style",
        "Tornado Advanced Radar Display Information System",
        "Time and Relative Dimension In Space"
      ]
    }
  ];

  //Global Variables

  var answeredCorrect = 0;
  var answeredIncorrect = 0;
  var unAnswered = 0;
  var remainingTime = 15;
  var intervalID;
  var triviaIndex = 0;
  var ifAnswered = false;
  var actualAnswer = "";




  function startGame() {
    $(".start-button").remove();
    answeredCorrect = 0;
    answeredIncorrect = 0;
    unAnswered = 0;
    startTrivia();
  }

  function startTrivia() {
    ifAnswered = false;
    remainingTime = 15;
    intervalID = setInterval(timer, 1000);
    if (ifAnswered === false) {
      timer();
    }

    actualAnswer = triviaSlides[0].Answer;
    triviaQuestion = triviaSlides[0].Question;
    randomChoiceArray = shuffle(triviaSlides[0].Choice);

    optionOne = randomChoiceArray[0];
    optionTwo = randomChoiceArray[1];
    optionThree = randomChoiceArray[2];
    optionFour = randomChoiceArray[3];

    $("#question").text(triviaQuestion);
    $("#optionOne").text(optionOne);
    $("#optionTwo").text(optionTwo);
    $("#optionThree").text(optionThree);
    $("#optionFour").text(optionFour);

    $("#optionOne").click(function() {
      ifAnswered = true;
      checkAnswer(optionOne);
      //console.log(optionOne);
    });

    $("#optionTwo").click(function() {
      ifAnswered = true;
      checkAnswer(optionTwo);
      //console.log(optionTwo);
    });

    $("#optionThree").click(function() {
      ifAnswered = true;
      checkAnswer(optionThree);
      //console.log(optionThree);
    });

    $("#optionFour").click(function() {
      ifAnswered = true;
      checkAnswer(optionFour);
      //console.log(optionFour);
    });
  }

  function shuffle(generateRandomChoiceArray) {
    for (var i = 0; i < generateRandomChoiceArray.length - 1; i++) {
      var j =
        i + Math.floor(Math.random() * (generateRandomChoiceArray.length - i));

      var temp = generateRandomChoiceArray[j];
      generateRandomChoiceArray[j] = generateRandomChoiceArray[i];
      generateRandomChoiceArray[i] = temp;
    }
    return generateRandomChoiceArray;
  }

  function checkAnswer(params) {
    // console.log(params);
    // console.log(actualAnswer);
    if (actualAnswer === params) {
      rightAnswer();
    } else {
      wrongAnswer();
    }
  }

  function rightAnswer() {
    answeredCorrect++;
    $(
      '<div class="alert alert-success" role="alert">Write Answer!!</div>'
    ).appendTo("#slideResult");
    resetRound();
  }

  function wrongAnswer() {
    answeredIncorrect++;
    $(
      '<div class="alert alert-danger" role="alert">Wrong Answer!! correct answer is ' +
        actualAnswer +
        "</div>"
    ).appendTo("#slideResult");
    resetRound();
  }

  function unAnswered() {
    unAnswered++;
    $(
      '<div class="alert alert-danger" role="alert">Times Up!! correct answer is ' +
        actualAnswer +
        "</div>"
    ).appendTo("#slideResult");
    resetRound();
  }

  function timer() {
    if (remainingTime === 0) {
      ifAnswered = true;
      clearInterval(intervalID);
      unAnswered();
    } else if (ifAnswered === true) {
      clearInterval(intervalID);
    } else {
      remainingTime--;
      $(".slideResult").text(
        "YOU HAVE " + remainingTime + " SECONDS TO CHOOSE"
      );
    }
  }

  function resetRound() {
    triviaIndex++;
    if (triviaIndex < triviaSlides.length) {
      setTimeout(function() {
        startTrivia();
      }, 6000);
    } else {
      setTimeout(function() {
        $("#question").remove();
        $(".timeRemaining").remove();
        $("#optionOne").text("CORRECT ANSWERS: " + correctAnswers);
        $("#optionTwo").text("INCORRECT ANSWERS: " + incorrectAnswers);
        $("#optionThree").text("UNANSWERED QUESTIONS: " + unansweredQuestions);
        $("#optionFour").text("");
        setTimeout(function() {
          location.reload();
        }, 7000);
      }, 5000);
    }
  }

startGame();
 

});