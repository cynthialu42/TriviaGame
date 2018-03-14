$(document).ready(function(){

    // variables
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

    let userAnswers = [];

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
    // functions 
    function startGame(){
        for (var i = 0; i < questions.length; i++){
            $('.js-questions').append('<p>' + questions[i].question + '</p>');
            for (var j = 0; j < questions[i].answer.length; j++){
                $('.js-questions').append('<input type="radio" value = "'+questions[i].answer[j]+'" name = "'+ i + '">' + questions[i].answer[j]+'</input>');
            }
        }
    }
    

    // events
    // click start button
    $('.js-start').on('click', function(){
        startGame();
    });
    // click submit button

    $('.js-stop').on('click', function(){
        stopGame();
    });
});