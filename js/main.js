$(document).ready(function(){

    // Global variables
    var intervalId = 0;
    var time = 0;
    let userAnswer = '';
    let startTime = 0;
    let qNum = 0;
    let q = '';
    let qArr = [];
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalEmpty = 0;

    let questions = [
        {
            "question": "The most yolks to come out of a chicken egg is:",
            "answer": ["3","6","9","12"],
            "correctAnswer": "9",
            "image": "./images/gudetama.gif",
        },
        {
            "question": "The oldest parrot lived to 82yrs. What is his name?",
            "answer": ["Polly","Pinky","Cookie","Muffin"],
            "correctAnswer": "Cookie",
            "image": "./images/cookie.jpg",
        },
        {
            "question": "This little guy does a funky bobbing dance while walking:",
            "answer": ["woodcock","snipe","sandpiper","sanderling"],
            "correctAnswer": "woodcock",
            "image": "./images/peent.gif",
        },
        {
            "question": "Which of these birds are altricial?",
            "answer": ["chickens","ducks","pigeons","turkeys"],
            "correctAnswer": "pigeons",
            "image": "./images/pigeon1.gif",
        },
        {
            "question": "What is a group of owls called?",
            "answer": ["parliament","congress","assembly","legislature"],
            "correctAnswer": "parliament",
            "image": "./images/owl.gif",
        },
        {
            "question": "A large group of starlings flying together is referred to as a:",
            "answer": ["swarm","mutterance","murmuration","murderation"],
            "correctAnswer": "murmuration",
            "image": "./images/starlings.gif",
        },
        {
            "question": "A hummingbird's heartrate averages how many beats per minute?",
            "answer": ["600","900","1200","1500"],
            "correctAnswer": "1200",
            "image": "./images/hummingbird.gif",
        },
        {
            "question": "Which of these birds are native to Australia?",
            "answer": ["cockatoos","pionuses","macaws","caique"],
            "correctAnswer": "cockatoos",
            "image": "./images/cockatoo.gif",
        }
    ]

    // Begins the game
    function startGame(){
        let startCount = 3;
        initializeStartScreen();
        countDown(startCount, getQuestion);
    }

    // Screen before start of questions
    function initializeStartScreen(){
        $('.js-questions').text("Get ready...!");
        $('.js-start').addClass('hide');
    }

    // Parameters: integer and function callback
    // Count down from the startNum and then execute func as appropriate
    function countDown(startNum, func){
        let continueToCount = true;
        let countTime = startNum;
        intervalId = setInterval(function(){
            if (continueToCount){
                if (countTime < 0){
                    continueToCount = false;
                    // call the function to get first question
                    console.log("Game Start");
                    $('.js-time').empty().removeClass('red');
                    func();
                }
                else if(countTime < 10){
                    $('.js-time').text(countTime).addClass('red');
                    countTime--;
                }
                else{
                    $('.js-time').text(countTime);
                    countTime--;
                }
            }
            
        }, 1000);

    }


    // Get the question and associated answers
    function getQuestion(){
        $('.js-result').empty();
        $('.js-img').empty();
        userAnswer = '';
        if (questions.length > 0){
            q = questions.shift(); // take out the first object 
            qArr.push(q);
            $('.js-questions').text(q.question);
            // print out answer selections
            for (var i = 0; i < q.answer.length; i++){
                $('.js-answers').append(`<button class = "answer-selection" data-name = "${q.answer[i]}"> ${q.answer[i]} </button>`);
            }
            
            let gameTime = 15;
            countDown(gameTime, inBetweenCount);
        }
        else{
            showResults();
        }
        
    }

    // Screen that appears between questions
    function inBetweenCount(){

        isAnswerCorrect();
        $('.js-img').html('<img  src = "' + q.image + '" >');

        if( questions.length > 0){
            let betweenCount = 5;
            $('.js-answers').empty();
            $('.js-questions').empty();
            countDown(betweenCount, getQuestion);
            qNum++;
        }
        else{
            let test = 2;
            $('.js-answers').empty();
            $('.js-questions').empty();
            countDown(test, showResults);
        }
    }

    // Check if answer is correct 
    function isAnswerCorrect(){
        if (userAnswer === q.correctAnswer){
            $('.js-result').text("You got it right!");
            totalCorrect++;

        }
        else if (userAnswer === ''){
            $('.js-result').text("You didn't answer in time :(");
            totalEmpty++;
        }
        else{
            $('.js-result').text(`You got it wrong! The answer is ${q.correctAnswer}!`);
            totalWrong++;
            console.log(userAnswer);
        }
    }

    // Check selection with answer
    function checkAnswers(){
        userAnswer = $(this).attr('data-name');
        stopTimer();
        inBetweenCount();
    }

    // Display the final tally of answers
    function showResults(){
        $('.js-result').empty();
        $('.js-answers').empty();
        $('.js-questions').empty();
        $('.js-score-correct').text(`Correct: ${totalCorrect}`);
        $('.js-score-incorrect').text(`Incorrect: ${totalWrong}`);
        $('.js-result').text(`Unanswered: ${totalEmpty}`);
        $('.js-restart').removeClass('hide');
        $('.js-img').empty();
        if (totalCorrect > (totalWrong + totalEmpty)){
            $('.js-message').removeClass('hide').text("Wow you know a lot about birds!");
        }
        else{
            $('.js-message').removeClass('hide').addClass('red').text("*Several crows caw in the distance, coming closer...*");
        }
    }

    // Stop the countdown 
    function stopTimer(){
        clearInterval(intervalId);
        $('.js-time').empty();
    }

    // Resets game to first question
    function reset(){
        questions = qArr;
        qArr = [];
        totalCorrect = 0;
        totalWrong = 0;
        totalEmpty = 0;

        $('.js-result').empty();
        $('.js-answers').empty();
        $('.js-questions').empty();
        $('.js-score-correct').empty();
        $('.js-score-incorrect').empty();
        $('.js-result').empty();
        $('.js-restart').addClass('hide');
        $('.js-message').empty();
    }


    // Click Events
    $(document).on("click", ".answer-selection", checkAnswers);

    $('.js-start').on('click', function(){
        startGame();
    });

    $('.js-stop').on('click', function(){
        stopGame();
    });

    $('.js-restart').on('click', function(){
        reset();
        getQuestion();
    });
  
});
