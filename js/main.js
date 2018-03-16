$(document).ready(function(){

    // variables
    var intervalID = 0;
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

    let userAnswers = '';

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
            userAnswers.push($('input[name=q'+i+']:checked').val());
        }
        $('.js-answers').append(userAnswers);
        
        let count = 0;
        for (let j = 0; j < userAnswers.length; j++){
            if (userAnswers[j] === questions[j].correctAnswer){
                count++;
            }
        }
        $('.js-right').text(count);
        */
    }

    function submitAnswer(){
        userAnswers = $('input[name='+qNum+']:checked').val();

    }
    // start game will start first countdown asking to get ready
    // then call function to actually show the first question/answer pair
    let startTime = 0;
    let beginGame = true;

    let qNum = 0;
  

    // get first element of questions array
    function getQuestion(){
        if (questions.length !== 0){
            
            let q = questions.shift(); // object 
            $('.js-questions').text(q.question);
            for (var i = 0; i < q.answer.length; i++){
                $('.js-answers').append('<input type = "radio" value = "' + q.answer[i] + '"name = "' + qNum + '">' + q.answer[i] + '</input');
            }
            
            //qNum++;
    
            let testTimer = true;
            let gameTime = 5;
            setInterval(function(){
                if (testTimer){
                    $('.js-time').text(gameTime);
                    gameTime--;
                    if (gameTime < 0){
                        testTimer = false;
                        console.log("time up for question");
                        $('.js-time').empty();
                        // in between countdown
                        
                        inBetweenCount();
                        // also show right answer and image
                        showAnswer();
                        
                    }
                }
                
            }, 1000);
        }
        else{
            console.log("no more questions");
        }
        
    }

    function showAnswer(){
        console.log("showAnswer");
    }
    function inBetweenCount(){
        userAnswers = $('input[name='+qNum+']:checked').val();
            console.log(userAnswers);
        if( questions.length !== 0){
            let betweenCount = 3;
            let testTimer = true;
            $('.js-answers').empty();
            $('.js-questions').empty();
            setInterval(function(){
                if (testTimer){
                    $('.js-time').text(betweenCount);
                    betweenCount--;
                    if (betweenCount < 0){
                        testTimer = false;
                        // call the function to get first question
                        console.log("time up for wait");
                        $('.js-time').empty();
                        getQuestion();
                        
                    }
                }
                
            }, 1000);
            qNum++;
        }
        else{
            console.log("done");
        }
    }
    function startGame(){
        
        /*for (var i = 0; i < questions.length; i++){
            $('.js-questions').append('<p>' + questions[i].question + '</p>');
            for (var j = 0; j < questions[i].answer.length; j++){
                $('.js-questions').append('<input type="radio" value = "'+questions[i].answer[j]+'" name = "'+ i + '">' + questions[i].answer[j]+'</input>');
            }
        }*/
        $('.js-questions').text("Get ready");
        //$('.js-title').addClass('hide');
        $('.js-start').addClass('hide');
        startTime = 3;
        intervalId = setInterval(function(){
            
            if (beginGame){
                $('.js-time').text(startTime);
                startTime--;
                if (startTime < 0){
                    beginGame = false;
                    // call the function to get first question
                    console.log(startTime);
                    $('.js-time').empty();
                    getQuestion();
                }
            }
            
        }, 1000);
    }

    
    // click start button
    $('.js-start').on('click', function(){
        startGame();
    });
    // click submit button

    $('.js-stop').on('click', function(){
        stopGame();
    });
});