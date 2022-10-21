window.onload = function() {
    alert("Screw JavaScript")
    alert("All my homies hate JavaScript")
    alert("This alert was made by the TypeScript gang")
}

// Add an event listener for the DOMContentLoaded event
window.addEventListener("DOMContentLoaded", domLoaded);

function domLoaded() {
    const startButton = document.getElementById('start-btn')
    const nextButton = document.getElementById('next-btn')
    const optionsContainerElement = document.getElementById('options')
    const questionContainerElement = document.getElementById('question-container')
    const questionElement = document.getElementById('question')
    const answerButtonsElement = document.getElementById('answer-buttons')
    // Options
    const shuffleCardsOption = document.getElementById('shuffleCards')
    const timedSessionOption = document.getElementById('timedSession')
    const removeCorrectFromDeckOption = document.getElementById('removeCorrectFromDeck')

    let shuffledQuestions, currentQuestionIndex
    //using the domLoaded function because the buttons need to be rendered before we can
    //add an event listener
    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        setNextQuestion()
    })

    function startGame() {
        startButton.classList.add('hide')
        optionsContainerElement.style.display = 'none'
        shuffledQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        questionContainerElement.classList.remove('hide')
        setNextQuestion()

        // The part I'm working on
        if (shuffleCardsOption.checked)
    }

    function setNextQuestion() {
        resetState()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }

    function showQuestion(question) {
        questionElement.innerText = question.question
        question.answers.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')
            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click', selectAnswer)
            answerButtonsElement.appendChild(button)
        })
    }

    function resetState() {
        clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild)
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct
        setStatusClass(document.body, correct)
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct)
        })
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
        } else {
            startButton.innerText = 'Restart'
            startButton.classList.remove('hide')
        }
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element)
        if (correct) {
            element.classList.add('correct')
        } else {
            element.classList.add('wrong')
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }

    const questions = [
        {
            question: 'This is a test question',
            answers: [
                { text: 'Correct Answer', correct: true },
                { text: 'Incorrect Answer', correct: false },
                { text: 'Incorrect Answer', correct: false },
                { text: 'Incorrect Answer', correct: false },
                { text: 'Incorrect Answer', correct: false },
                { text: 'Incorrect Answer', correct: false },
            ]
        },
        {
            question: 'This is another test question',
            answers: [
                { text: 'Correct Answer', correct: true },
                { text: 'Incorrect Answer', correct: false },
                { text: 'Incorrect Answer', correct: false },
                { text: 'Incorrect Answer', correct: false },
                { text: 'Incorrect Answer', correct: false },
                { text: 'Incorrect Answer', correct: false },
            ]
        },
        
    ]
}