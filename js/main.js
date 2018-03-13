$(document).ready(function(){

    // variables
    let questions = [
        {
            "question": "What is my name",
            "answer": ["Cynt","this","thiea","Cynthia"],
            "correctAnswer": "Cynthia",
            "image": "la",
        }
    ]

    // functions 
    function startGame(){
        for (var i = 0; i < 2; i++){
            $('.js-questions').append('<p> yah </p>');
            $('.js-answers').append('<input type = "radio"> Smith</input><input type = "radio"> Test</input><input type = "radio"> Again</input>')
        }
    }
    
    // events
    // click start button
    $('.js-start').on('click', function(){
        startGame();
    });
    // click submit button

});