// script.js
document.addEventListener("DOMContentLoaded", function() {
    const questionTypeSelect = document.getElementById('questionType');
    const freeTextSection = document.getElementById('freeTextSection');
    const multipleChoiceSection = document.getElementById('multipleChoiceSection');
    const addQuestionButton = document.getElementById('addQuestion');
    const playButton = document.getElementById('playButton');
    const homePage = document.getElementById('homePage');
    const questionSection = document.getElementById('questionSection');
    const playSection = document.getElementById('playSection');
    const questionDisplay = document.getElementById('questionDisplay');
    const userAnswer = document.getElementById('userAnswer');
    const submitAnswerButton = document.getElementById('submitAnswer');
    const feedback = document.getElementById('feedback');
    const feedbackQuestion = document.getElementById('feedbackQuestion');
    const previousButton = document.getElementById('previousButton');
    const nextButton = document.getElementById('nextButton');
    const showQuestionsButton = document.getElementById('showQuestionsButton');
    const homePageButton = document.getElementById('homePageButton');

    let questions = JSON.parse(localStorage.getItem('questions')) || [];
    let currentQuestionIndex = 0;

    homePageButton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    showQuestionsButton.addEventListener('click', function() {
        window.location.href = 'questions.html';
    });

    questionTypeSelect.addEventListener('change', function() {
        if (this.value === 'free-text') {
            freeTextSection.classList.remove('hidden');
            multipleChoiceSection.classList.add('hidden');
        } else {
            freeTextSection.classList.add('hidden');
            multipleChoiceSection.classList.remove('hidden');
        }
    });

    addQuestionButton.addEventListener('click', function() {
        let isAllowed = true;
        if (questionTypeSelect.value === 'free-text') {
            isAllowed = document.getElementById('questionText').value !== '' && document.getElementById('answerText').value !== '';
        } else {
            isAllowed = document.getElementById('optionA').value !== '' && 
                        document.getElementById('optionB').value !== '' && 
                        document.getElementById('optionC').value !== '' && 
                        document.getElementById('optionD').value !== '';
        }
        if(isAllowed){
            let question;
            if (questionTypeSelect.value === 'free-text') {
                question = {
                    type: 'free-text',
                    question: document.getElementById('questionText').value,
                    answer: document.getElementById('answerText').value
                };
            } else {
                question = {
                    type: 'multiple-choice',
                    question: document.getElementById('questionMC').value,
                    options: {
                        a: document.getElementById('optionA').value,
                        b: document.getElementById('optionB').value,
                        c: document.getElementById('optionC').value,
                        d: document.getElementById('optionD').value
                    },
                    correctOption: document.getElementById('correctOption').value
                };
            }
            questions.push(question);
            localStorage.setItem('questions', JSON.stringify(questions));
            if(questionTypeSelect.value === 'free-text'){
                document.getElementById('questionText').value = '';
                document.getElementById('answerText').value = '';
            }else{
                document.getElementById('questionMC').value = '';
                document.getElementById('optionA').value = '';
                document.getElementById('optionB').value = '';
                document.getElementById('optionC').value = '';
                document.getElementById('optionD').value = '';
            }
            feedbackQuestion.textContent = 'Добавено!';
            setTimeout(function() {
                feedbackQuestion.textContent = '';
            }, 2000);
        }else{
            feedbackQuestion.textContent = 'Всички полета са задължителни!';
        }
    });

    // manageQuestionsButton.addEventListener('click', function() {
    //     homePage.classList.add('hidden');
    //     questionSection.classList.remove('hidden');
    // });

    playButton.addEventListener('click', function() {
        homePage.classList.add('hidden');
        questionSection.classList.add('hidden');
        playSection.classList.remove('hidden');
        currentQuestionIndex = 0;
        displayQuestion();
    });

    // submitAnswerButton.addEventListener('click', function() {
    //     const currentQuestion = questions[currentQuestionIndex];
    //     if (currentQuestion.type === 'free-text') {
    //         if (userAnswer.value.toLowerCase() === currentQuestion.answer.toLowerCase()) {
    //             feedback.textContent = 'Правилно!';
    //         } else {
    //             feedback.textContent = 'Грешно! Правилният отговор е: ' + currentQuestion.answer;
    //         }
    //     } else {
    //         if (userAnswer.value.toLowerCase() === currentQuestion.correctOption) {
    //             feedback.textContent = 'Правилно!';
    //         } else {
    //             feedback.textContent = 'Грешно! Правилният отговор е:: ' + currentQuestion.correctOption.toUpperCase();
    //         }
    //     }
    //     // currentQuestionIndex++;
    //     // if (currentQuestionIndex < questions.length) {
    //     //     setTimeout(displayQuestion, 2000);
    //     // } else {
    //     //     feedback.textContent += ' You have completed all the questions.';
    //     //     setTimeout(function() {
    //     //         playSection.classList.add('hidden');
    //     //         homePage.classList.remove('hidden');
    //     //     }, 13000);
    //     // }
    //     userAnswer.value = '';
    // });

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionDisplay.innerHTML = '';
        if (currentQuestion.type === 'free-text') {
            questionDisplay.textContent = currentQuestion.question;
        } else {
            const questionText = document.createElement('div');
            questionText.textContent = currentQuestion.question;
            questionDisplay.appendChild(questionText);
            for (let key in currentQuestion.options) {
                const option = document.createElement('div');
                option.textContent = `${key.toUpperCase()}: ${currentQuestion.options[key]}`;
                questionDisplay.appendChild(option);
            }
        }
    }

    // previousButton.addEventListener('click', function() {
    //     if (currentQuestionIndex > 0) {
    //         currentQuestionIndex--;
    //         displayQuestion();
    //     }
    // });
    
    // nextButton.addEventListener('click', function() {
    //     if (currentQuestionIndex < questions.length - 1) {
    //         currentQuestionIndex++;
    //         displayQuestion();
    //     }
    // });
});

