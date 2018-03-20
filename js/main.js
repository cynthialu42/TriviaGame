$(document).ready(function(){

    // variables
    var intervalId = 0;
    var time = 0;
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
            "image": "./images/pigeon.gif",
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
            $('.js-result').text("You didn't answer in time :(");
            totalEmpty++;
        }
        else{
            $('.js-result').text(`You got it wrong! The answer is ${q.correctAnswer}!`);
            totalWrong++;
            console.log(userAnswer);
        }
    }

  
    function inBetweenCount(){
        isAnswerCorrect();

        $('.js-img').html('<img  src = "' + q.image + '" height: "50" >');

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
