let questions = [
    {
        'question': 'Wer hat HTML erfunden?',
        'answer_1': 'Robbie Williams',
        'answer_2': 'Lady Gaga',
        'answer_3': 'Tim Berners-Lee',
        'answer_4': 'Justin Bieber',
        'right_answer': 3
    },
    {
        'question': 'Was bedeutet das HTML Tag &lt;a&gt;?',
        'answer_1': 'Text Fett',
        'answer_2': 'Container',
        'answer_3': 'Ein Link',
        'answer_4': 'Kursiv',
        'right_answer': 3
    },
    {
        'question': 'Wie bindet man eine Website in eine Website ein',
        'answer_1': '&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;',
        'answer_2': '&lt;iframe&gt;',
        'answer_3': '&lt;frame&gt;',
        'answer_4': '&lt;frameset&gt;',
        'right_answer': 2
    },
    {
        'question': 'Wie stellt man Text am BESTEN fett dar',
        'answer_1': '&lt;strong&gt;',
        'answer_2': 'CSS nutzen',
        'answer_3': '&lt;bold&gt;',
        'answer_4': '&lt;b&gt;',
        'right_answer': 1
    },
    {
        'question': 'Welches Attribut kann man NICHT für Textarea verwenden?',
        'answer_1': 'readonly',
        'answer_2': 'max',
        'answer_3': 'from',
        'answer_4': 'spellcheck',
        'right_answer': 1
    },
    {
        'question': 'Wie wählst du alle Elemente vom Typ &lt;a&gt; mit dem attribut title aus?',
        'answer_1': 'a[title]{...}',
        'answer_2': 'a > title {...}',
        'answer_3': 'a.title {...}',
        'answer_4': 'a=title {...}',
        'right_answer': 1
    },
    {
        'question': 'Wie definiert man in JavaScript eine Variable',
        'answer_1': 'let 100 = rate;',
        'answer_2': '100 = let rate;',
        'answer_3': 'rate = 100;',
        'answer_4': 'let rate = 100;',
        'right_answer': 4
    }
];


let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_WRONG = new Audio('audio/wrong.mp3');
let isAnswerClicked = false;


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}


function startQuiz() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('question-body').parentNode.classList.remove('d-none');
}


function showQuestion() {

    if (gameIsOver()) {
        showEndScreen();
    } else { // show question
        updateProgressBar();
        updateToNextQuestion();
    }
}


function gameIsOver() {
    return currentQuestion >= questions.length;
}


function showEndScreen() {
    document.getElementById('end-screen').classList.remove('d-none');
    document.getElementById('question-body').parentNode.classList.add('d-none');
    document.getElementById('progress-bar').innerHTML = `100 %`;
    document.getElementById('progress-bar').style.width = 100 + "%";
    document.getElementById('amount-of-questions').innerHTML = questions.length;
    document.getElementById('amount-of-answers').innerHTML = rightQuestions;
}


function updateProgressBar() {
    let percent = (currentQuestion) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style.width = percent + "%";
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('current-question').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
    isAnswerClicked = false;
}


function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (isAnswerClicked === false) {
        if (rightAnswerSelected(selectedQuestionNumber, question)) {
            showCorrectAnswer(selection);
        } else {
            showWrongAnswer(selection, idOfRightAnswer);
        }
    }
    isAnswerClicked = true;
    document.getElementById('next-btn').disabled = false;
}


function rightAnswerSelected(selectedQuestionNumber, question) {
    return selectedQuestionNumber == question['right_answer'];
}


function showCorrectAnswer(selection) {
    document.getElementById(selection).parentNode.parentNode.classList.add('bg-correct');
    document.getElementById(selection).previousElementSibling.classList.add('badge-correct');
    AUDIO_SUCCESS.play();
    rightQuestions++;
}


function showWrongAnswer(selection, idOfRightAnswer) {
    document.getElementById(selection).parentNode.parentNode.classList.add('bg-wrong');
    document.getElementById(selection).previousElementSibling.classList.add('badge-wrong');
    document.getElementById(idOfRightAnswer).parentNode.parentNode.classList.add('bg-correct');
    document.getElementById(idOfRightAnswer).previousElementSibling.classList.add('badge-correct');
    AUDIO_WRONG.play();
}


function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-btn').disabled = true;
    resetAnswerButtons();
    resetBadgeColor();
    showQuestion();
}


function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.parentNode.classList.remove('bg-correct');
    document.getElementById('answer_1').parentNode.parentNode.classList.remove('bg-wrong');
    document.getElementById('answer_2').parentNode.parentNode.classList.remove('bg-correct');
    document.getElementById('answer_2').parentNode.parentNode.classList.remove('bg-wrong');
    document.getElementById('answer_3').parentNode.parentNode.classList.remove('bg-correct');
    document.getElementById('answer_3').parentNode.parentNode.classList.remove('bg-wrong');
    document.getElementById('answer_4').parentNode.parentNode.classList.remove('bg-correct');
    document.getElementById('answer_4').parentNode.parentNode.classList.remove('bg-wrong');
}


function resetBadgeColor() {
    document.getElementById('answer_1').previousElementSibling.classList.remove('badge-correct');
    document.getElementById('answer_1').previousElementSibling.classList.remove('badge-wrong');
    document.getElementById('answer_2').previousElementSibling.classList.remove('badge-correct');
    document.getElementById('answer_2').previousElementSibling.classList.remove('badge-wrong');
    document.getElementById('answer_3').previousElementSibling.classList.remove('badge-correct');
    document.getElementById('answer_3').previousElementSibling.classList.remove('badge-wrong');
    document.getElementById('answer_4').previousElementSibling.classList.remove('badge-correct');
    document.getElementById('answer_4').previousElementSibling.classList.remove('badge-wrong');
}


function restartGame() {
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('question-body').parentNode.classList.remove('d-none');
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}
