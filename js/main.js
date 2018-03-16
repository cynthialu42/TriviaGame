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
/*
        for (let i = 0; i < questions.length; i++){
            userAnswer.push($('input[name=q'+i+']:checked').val());
        }
        $('.js-answers').append(userAnswer);
        
        let count = 0;
        for (let j = 0; j < userAnswer.length; j++){
            if (userAnswer[j] === questions[j].correctAnswer){
                count++;
            }
        }
        $('.js-right').text(count);
        */
    }

    /*function submitAnswer(){
        userAnswer = $('input[name='+qNum+']:checked').val();

    }*/
    // start game will start first countdown asking to get ready
    // then call function to actually show the first question/answer pair
    let startTime = 0;
   

    let qNum = 0;
  
    let q = '';
    // get first element of questions array
    function getQuestion(){
        // Check array is populated
        if (questions.length > 0){
            q = questions.shift(); // take out the first object 
            $('.js-questions').text(q.question);
            // print out answer selections
            for (var i = 0; i < q.answer.length; i++){
                $('.js-answers').append('<input type = "radio" value = "' + q.answer[i] + '"name = "' + qNum + '">' + q.answer[i] + '</input');
            }
            
            let gameTime = 10;
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
    function isAnswerCorrect(){
        if (userAnswer === q.correctAnswer){
            console.log("answer is correct");
            $('.js-result').text("You got it right!");
            // also show image

        }
        else{
            console.log("answer not correct");
            $('.js-result').text("You got it wrong");
        }
    }
    function inBetweenCount(){
        // get the user answer and compare it to the correct one
        // new function isAnswerCorrect to check
        //userAnswer = $('input[name='+qNum+']:checked').val();
        //console.log(userAnswer);
        isAnswerCorrect();
        if( questions.length !== 0){
            let betweenCount = 3;
            $('.js-answers').empty();
            $('.js-questions').empty();
            countDown(betweenCount, getQuestion);
            
            qNum++;
        }
        else{
            console.log("inbetween done");
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