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
    const previousButton = document.getElementById('previous-btn')
    const additionalInfoElement = document.getElementById('additional-info')
    const additionalInfoContainerElement = document.getElementById('additional-info-container')
    const optionsContainerElement = document.getElementById('options')
    const questionContainerElement = document.getElementById('question-container')
    const questionElement = document.getElementById('question')
    const answerButtonsElement = document.getElementById('answer-buttons')
    // Options
    const shuffleCardsOption = document.getElementById('shuffleCards')
    const timedSessionOption = document.getElementById('timedSession')
    const removeCorrectFromDeckOption = document.getElementById('removeCorrectFromDeck')
    //Additional features
    
    // TIMER

    //The current count of the timer is zero
    let elapsedTimeElement = document.getElementById('elapsedTime')
    let timer = 0;
    let timerInterval;
    //One of the id functions of the three time boxes has been assigned a global constant.
    let ms = document.getElementById('ms');
    let second = document.getElementById('second');
    let minute = document.getElementById('minute');

    function start() {
        stop();
        //All calculations are stored in "timerInterval".
        //Here "setInterval" is used and 1000/60 seconds is set.
        //As a result, this calculation will be updated every 1 millisecond
        timerInterval = setInterval(function() {
            //Now the value of 'timer' has been set
            //We know x + = y => x = x + y
            timer += 1/60;
            //Now the value of 'milliseconds' has been set. It is also stored in "msVal".
            let msVal = Math.floor((timer - Math.floor(timer))*100);
            //The value of 'seconds' has been determined in the same way.
            let secondVal = Math.floor(timer) - Math.floor(timer/60) * 60;
            //The value of 'minute' has been determined.
            let minuteVal = Math.floor(timer/60);

            //With the help of 'innerHTML' all the information is displayed in the webpage
            //The condition here is that when the value of time is less than 10 then a 0 will be added before that time.
            // For milliseconds
            ms.innerHTML = msVal < 10 ? "0" + msVal.toString() : msVal;
            //For seconds
            second.innerHTML = secondVal < 10 ? "0" + secondVal.toString() : secondVal;
            // For Minute
            minute.innerHTML = minuteVal < 10 ? "0" + minuteVal.toString() : minuteVal;
        }, 1000/60);
    }

    //Now you have to activate the stop button
    //The clearInterval() function in javascript clears the interval which has been set by setInterval() function before that.
    function stop() {
        clearInterval(timerInterval);
    }

    let shuffledQuestions, currentQuestionIndex
    //using the domLoaded function because the buttons need to be rendered before we can
    //add an event listener
    startButton.addEventListener('click', startGame)
    nextButton.addEventListener('click', () => {
        currentQuestionIndex++
        setNextQuestion()
    })
    previousButton.addEventListener('click', () => {
        currentQuestionIndex--
        setNextQuestion()
    })

    function startGame() {
        startButton.classList.add('hide')
        additionalInfoContainerElement.classList.remove('hide')
        optionsContainerElement.style.display = 'none'
        shuffledQuestions = questions.sort(() => Math.random() - .5)
        if (timedSessionOption.checked) {
            start()
            elapsedTimeElement.classList.remove('hide')
        }
        currentQuestionIndex = 0
        questionContainerElement.classList.remove('hide')
        setNextQuestion()
    }

    function setNextQuestion() {
        resetState()
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }

    function removeCorrectFromDeck() {}

    function showQuestion(question) {
        additionalInfoElement.innerText = question.details
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
            previousButton.classList.remove('hide')
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
            details: 'lol',
            answers: [
                { text: 'Correct Answer', correct: true },
                { text: 'Incorrect Answer', correct: false },
            ]
        },
        {
            question: 'This is another test question',
            details: '',
            answers: [
                { text: 'Correct Answer', correct: true },
                { text: 'Incorrect Answer', correct: false },
            ]
        },
        
    ]
}