// Assigning variables 

const  questionNumText = document.getElementById('questionNum')
const questionText = document.getElementById('questionText')

const descriptionContainer = document.getElementById('answerContainer')
const descriptionIcon = document.getElementById('answerIcon')
const descriptionHeader = document.getElementById('answerText')
const descriptionText = document.getElementById('answerDescription')

const option1 = document.querySelector('#option1 .btnText')
const option2 = document.querySelector('#option2 .btnText')
const option3 = document.querySelector('#option3 .btnText')
const option4 = document.querySelector('#option4 .btnText')

const optionBtns = document.querySelectorAll('.btn')

const quizContainer = document.getElementById('container')
const resultContainer = document.getElementById('resultsContainer')
const scoreCounter = document.getElementById('resultScore')
const resetBtn = document.getElementById('TABtn')

// Main functions //

let questions = []
let quizLegnth = 0
let currentQuestion = 0
let score = 0
let maxScore = 0

function disableBtns() {
    optionBtns.forEach(btn => {
        btn.style.pointerEvents = 'none'
        btn.style.cursor = 'auto'
    })
}

function enableBtns() {
    optionBtns.forEach(btn => {
        btn.style.pointerEvents = 'auto'
        btn.style.cursor = 'pointer'
    })
}

function resetAnswer() {
    descriptionIcon.innerHTML = ''
    descriptionHeader.innerHTML = ''
    descriptionText.innerHTML = ''
    descriptionContainer.classList.remove('visable')
    descriptionContainer.classList.add('hidden')
}

function displayAnswer(type) {
    if (type === 1) {
        descriptionHeader.style.color = 'rgb(14, 161, 43)'
        descriptionIcon.style.color = 'rgb(14, 161, 43)'
        descriptionIcon.innerHTML = 'check'
        descriptionHeader.innerHTML = 'Correct'
        descriptionText.innerHTML = questions[currentQuestion - 1].Correct
        descriptionContainer.classList.remove('hidden')
        descriptionContainer.classList.add('visable')
    } else {
        descriptionHeader.style.color = 'rgb(161, 14, 14)'
        descriptionIcon.style.color = 'rgb(161, 14, 14)'
        descriptionIcon.innerHTML = 'close'
        descriptionHeader.innerHTML = 'Incorrect'
        descriptionText.innerHTML = questions[currentQuestion - 1].Incorrect
        descriptionContainer.classList.remove('hidden')
        descriptionContainer.classList.add('visable')        
    }

    setTimeout(() => {
        resetAnswer()
        enableBtns()
        playQuestion()

    }, 4000)
}

function questionSetUp(index) {
    const questionData = questions[index]
    questionNumText.innerHTML = `Question ${index + 1}`
    questionText.innerHTML = questionData.question
    option1.innerHTML = questionData.option1
    option2.innerHTML = questionData.option2
    option3.innerHTML = questionData.option3
    option4.innerHTML = questionData.option4
}

function responseHandler(id) {
    
disableBtns()

    if (id === questions[currentQuestion - 1].answer) {
        score = score + 1
        displayAnswer(1)
    } else {
        displayAnswer(0)
    }
}

function playQuestion() {
    if (currentQuestion === quizLegnth) {
        quizContainer.classList.remove('containerEnabled')
        quizContainer.classList.add('containerDisabled')

        resultContainer.classList.remove('containerDisabled')
        resultContainer.classList.add('containerEnabled')

        scoreCounter.innerHTML = `${score} / ${maxScore}`

    } else {
        currentQuestion = currentQuestion + 1
        questionSetUp(currentQuestion - 1)
    }
}

function reset() {
    currentQuestion = 0
    score = 0

    quizContainer.classList.remove('containerDisabled')
    quizContainer.classList.add('containerEnabled')

    resultContainer.classList.remove('containerEnabled')
    resultContainer.classList.add('containerDisabled')

    playQuestion()
}

function quizStartUp() {
    quizLegnth = questions.length
    maxScore = quizLegnth
    optionBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            console.log(event.currentTarget.id)
            responseHandler(event.currentTarget.id)
        })
    })
    resetBtn.addEventListener('click', reset)
    playQuestion()
}



fetch('./data/questions.json')
    .then(res => res.json())
    .then(data => {
        questions = data
        quizStartUp()
    })