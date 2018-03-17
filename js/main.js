$(document).ready(function(){

    // variables
    var intervalId = 0;
    var time = 0;
    let questions = [
        {
            "question": "What is my name",
            "answer": ["Cynt","this","thiea","Cynthia"],
            "correctAnswer": "Cynthia",
            "image": "la",
        },
        {
            "question": "What is my last name",
            "answer": ["lu","l","lou","luo"],
            "correctAnswer": "lu",
            "image": "la",
        },
        {
            "question": "What is my middle name",
            "answer": ["lu","l","you","luo"],
            "correctAnswer": "you",
            "image": "la",
        },
        {
            "question": "What color",
            "answer": ["lu","l","lou","green"],
            "correctAnswer": "green",
            "image": "la",
        }
    ]

    let userAnswer = '';

    function stopGame(){
        $('.js-questions input:checked').each(function(){
            console.log($(this).val());
            let answerChecked = $(this).val();
            if (answerChecked === questions[$(this).attr('name')].correctAnswer){
                console.log('hi');
            }
            else console.log('bye');
        });

    let startTime = 0;
   

    let qNum = 0;
  
    let q = '';
    // get first element of questions array
    function getQuestion(){
        $('.js-result').empty();
        userAnswer = '';
        if (questions.length > 0){
            q = questions.shift(); // take out the first object 
            $('.js-questions').text(q.question);
            // print out answer selections
            for (var i = 0; i < q.answer.length; i++){
                $('.js-answers').append('<input type = "radio" value = "' + q.answer[i] + '"name = "' + qNum + '">' + q.answer[i] + '</input');
            }
            
            let gameTime = 5;
            countDown(gameTime, inBetweenCount);
        }
        else{
            console.log("no more questions");
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
            $('.js-result').text("You got it wrong");
            totalWrong++;
            console.log(userAnswer);
        }
    }

    function inBetweenCount(){
        isAnswerCorrect();
        if( questions.length !== 0){
            let betweenCount = 3;
            $('.js-answers').empty();
            $('.js-questions').empty();
            countDown(betweenCount, getQuestion);
            qNum++;
        }
        else{
            $('.js-result').empty();
            $('.js-answers').empty();
            $('.js-questions').empty();
            $('.js-score-correct').text(`correct: ${totalCorrect}`);
            $('.js-score-incorrect').text(`Incorrect: ${totalWrong}`);
            $('.js-result').text(`Unanswered: ${totalEmpty}`);
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
                $('.js-time').text(countTime);
                countTime--;
                if (countTime < 0){
                    continueToCount = false;
                    // call the function to get first question
                    console.log("Game Start");
                    $('.js-time').empty();
                    func();
                }
            }
            
        }, 1000);

    }
    function startGame(){
        let startCount = 3;
        // Initialize get ready screen and preliminary countdown
        initializeStartScreen();
        countDown(startCount, getQuestion);
    }

    
    // click start button
    $('.js-start').on('click', function(){
        startGame();
    });
    // click submit button

    $('.js-stop').on('click', function(){
        stopGame();
    });

    $('.js-answers').on('click', function(){
        console.log("clicked");
        userAnswer = $('input[name='+qNum+']:checked').val();
        // check the answer
        // run the inbetween screen
        stopTimer();
        inBetweenCount();
    });
});



    
        /*for (var i = 0; i < questions.length; i++){
            $('.js-questions').append('<p>' + questions[i].question + '</p>');
            for (var j = 0; j < questions[i].answer.length; j++){
                $('.js-questions').append('<input type="radio" value = "'+questions[i].answer[j]+'" name = "'+ i + '">' + questions[i].answer[j]+'</input>');
            }
        }*/