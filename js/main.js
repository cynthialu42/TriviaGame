$(document).ready(function(){

    // variables
    var intervalId = 0;
    var time = 0;
    let questions = [
        {
            "question": "What is my name",
            "answer": ["Cynt","this","thiea","Cynthia"],
            "correctAnswer": "Cynthia",
            "image": "./images/owl-fight.gif",
        },
        {
            "question": "What is my last name",
            "answer": ["lu","l","lou","luo"],
            "correctAnswer": "lu",
            "image": "./images/owl-fight.gif",
        },
        {
            "question": "What is my middle name",
            "answer": ["lu","l","you","luo"],
            "correctAnswer": "you",
            "image": "./images/owl-fight.gif",
        },
        {
            "question": "What color",
            "answer": ["lu","l","lou","green"],
            "correctAnswer": "green",
            "image": "./images/owl-fight.gif",
        }
    ]

    let userAnswer = '';

    let startTime = 0;
   

    let qNum = 0;
  
    let q = '';
    let qArr = [];
    // get first element of questions array
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
                // https://stackoverflow.com/questions/16242980/making-radio-buttons-look-like-buttons-instead
                //$('.js-answers').append('<input type = "radio" value = "' + q.answer[i] + '"name = "' + qNum + '">' + q.answer[i] + '</input>');
                //$('.js-answers').append('<label for="' + q.answer[i] + '" name = "' + qNum + '"><input type = "radio"  value = "' + q.answer[i] + '" name = "' + qNum + '" id = "' + q.answer[i] + '">' +  q.answer[i] + '</label>');
                //$('.js-answers').append('<label for="' + q.answer[i] + '">' +  q.answer[i] + '</label>');
                //$('.js-answers').append('<input type = "radio" value = "' + q.answer[i] + '" name = "' + qNum + ' id = "' + q.answer[i] + '> <label for= "' + q.answer[i] + '">' + q.answer[i] + '</label>');
                $('.js-answers').append(`<button class = "answer-selection" data-name = "${q.answer[i]}"> ${q.answer[i]} </button>`);
            }
            
            let gameTime = 15;
            countDown(gameTime, inBetweenCount);
        }
        else{
            showResults();
        }
        
    }


    function stopTimer(){
        clearInterval(intervalId);
        $('.js-time').empty();
    }

    let totalCorrect = 0;
    let totalWrong = 0;
    let totalEmpty = 0;
    function isAnswerCorrect(){
        if (userAnswer === q.correctAnswer){
            $('.js-result').text("You got it right!");
            // also show image
            totalCorrect++;

        }
        else if (userAnswer === ''){
            $('.js-result').text("You didn't answer in time");
            totalEmpty++;
        }
        else{
            $('.js-result').text(`You got it wrong! The answer is ${q.correctAnswer}`);
            totalWrong++;
            console.log(userAnswer);
        }
    }

  
    function inBetweenCount(){
        isAnswerCorrect();

        $('.js-img').html('<img width: "50" height: "50" src = "' + q.image + '">');

        if( questions.length > 0){
            let betweenCount = 1;
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

    function showResults(){
        $('.js-result').empty();
        $('.js-answers').empty();
        $('.js-questions').empty();
        $('.js-score-correct').text(`correct: ${totalCorrect}`);
        $('.js-score-incorrect').text(`Incorrect: ${totalWrong}`);
        $('.js-result').text(`Unanswered: ${totalEmpty}`);
        $('.js-restart').removeClass('hide');

        if (totalCorrect > (totalWrong + totalEmpty)){
            $('.js-message').removeClass('hide').text("Wow you know a lot!");
        }
    }
    function initializeStartScreen(){
        $('.js-questions').text("Get ready");
        $('.js-start').addClass('hide');
    }

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
    function startGame(){
        let startCount = 1;
        // Initialize get ready screen and preliminary countdown
        initializeStartScreen();
        console.log(qArr);
        console.log(questions);
        countDown(startCount, getQuestion);
    }

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
    
    // click start button
    $('.js-start').on('click', function(){
        startGame();
    });
    // click submit button

    $('.js-stop').on('click', function(){
        stopGame();
    });

    /*$('.js-answers').on('click', function(){
        console.log("clicked");
        userAnswer = $('input[name='+qNum+']:checked').val();
        //userAnswer = $('input[name='+qNum+']').val();

        // check the answer
        // run the inbetween screen
        //userAnswer = $(this).val();
        console.log(userAnswer);
        let name = $(this).attr('data-name');
        alert(name);
        stopTimer();
        inBetweenCount();
    });*/

    function checkAnswers(){
        userAnswer = $(this).attr('data-name');
        stopTimer();
        inBetweenCount();
    }
    $(document).on("click", ".answer-selection", checkAnswers);

    $('.js-restart').on('click', function(){
        reset();
        getQuestion();
    });
  
});
