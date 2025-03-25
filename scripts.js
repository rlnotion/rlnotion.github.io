// Получаем элементы модальных окон
const puzzleInfoModal = document.getElementById("puzzleInfoModal");
const puzzleModal = document.getElementById("puzzleModal");
const puzzleInfoBtn = document.getElementById("puzzleInfoBtn");
const puzzleInfoClose = document.getElementById("puzzleInfoClose");
const puzzleClose = document.getElementById("puzzleClose");
const startPuzzleBtn = document.getElementById("startPuzzleBtn");
const puzzleMessage = document.getElementById("puzzleMessage");
const quizModal = document.getElementById("quizModal");
const timelineModal = document.getElementById("timelineModal");

// Кнопки для открытия окон
const quizBtn = document.getElementById("quizBtn");
const timelineBtn = document.getElementById("timelineBtn");

puzzleInfoBtn.onclick = () => puzzleInfoModal.style.display = "block";
puzzleInfoClose.onclick = () => puzzleInfoModal.style.display = "none";
puzzleClose.onclick = () => puzzleModal.style.display = "none";

// Кнопки закрытия окон
const quizClose = document.getElementById("quizClose");
const timelineClose = document.getElementById("timelineClose");

// Открытие окон игр
quizBtn.onclick = () => quizModal.style.display = "block";
timelineBtn.onclick = () => timelineModal.style.display = "block";

// Закрытие окон
quizClose.onclick = () => quizModal.style.display = "none";
timelineClose.onclick = () => timelineModal.style.display = "none";

// Закрытие окон при клике вне них
window.onclick = (event) => {
    if (event.target === quizModal) quizModal.style.display = "none";
    if (event.target === timelineModal) timelineModal.style.display = "none";
};

// Логика "Исторической головоломки"
// Начало игры
startPuzzleBtn.onclick = () => {
    puzzleInfoModal.style.display = "none";
    puzzleModal.style.display = "block";
};

// Закрытие модальных окон при клике вне их
window.addEventListener("click", function(event) {
    if (event.target === puzzleInfoModal || event.target === puzzleModal) {
        puzzleInfoModal.style.display = "none";
        puzzleModal.style.display = "none";
    }
});


// Логика перетаскивания
document.addEventListener("DOMContentLoaded", function () {
    const pieces = document.querySelectorAll(".puzzle-piece");
    const zones = document.querySelectorAll(".drop-zone");
    const message = document.getElementById("puzzleMessage");

    // Обработчик начала перетаскивания
    pieces.forEach(piece => {
        piece.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("piece", piece.dataset.piece);
        });
    });

    // Обработчики событий для зон
    zones.forEach(zone => {
        zone.addEventListener("dragover", (event) => {
            event.preventDefault();
        });

        zone.addEventListener("drop", (event) => {
            event.preventDefault();
            const pieceId = event.dataTransfer.getData("piece");
            const piece = document.querySelector(`.puzzle-piece[data-piece="${pieceId}"]`);

            if (!piece) return;

            // Проверяем, соответствует ли зона и элемент
            if (zone.dataset.piece === piece.dataset.piece) {
                zone.appendChild(piece);
                piece.style.position = "relative"; // Чтобы не было смещения
                piece.style.top = "0";
                piece.style.left = "0";
                piece.draggable = false; // Запрещаем дальнейшее перемещение

                checkPuzzleCompletion();
            }
        });
    });

    // Проверка завершения головоломки
    function checkPuzzleCompletion() {
        let completed = true;
        zones.forEach(zone => {
            const piece = zone.querySelector(".puzzle-piece");
            if (!piece || piece.dataset.piece !== zone.dataset.piece) {
                completed = false;
            }
        });

        message.textContent = completed ? "Поздравляем! Вы собрали головоломку!" : "";
    }
});


// Логика "Царской викторины"
const answers = document.querySelectorAll('.answer');
const questionBox = document.getElementById('question');
const feedback = document.getElementById('feedback');

const questions = [
    {question: "Кто был первым князем Руси?", answers: ["Рюрик", "Иван Грозный", "Пётр I"], correct: 0},
    {question: "В каком году Иван Грозный был коронован как царь?", answers: ["1547", "1613", "1725"], correct: 0},
    {question: "Какое событие стало концом Смутного времени?", answers: ["Избрание Михаила Романова", "Смерть Ивана IV", "Полтавская битва"], correct: 0}
];

let currentQuestion = 0;

function loadQuestion() {
    questionBox.textContent = questions[currentQuestion].question;
    answers.forEach((button, index) => {
        button.textContent = questions[currentQuestion].answers[index];
        button.setAttribute('data-correct', index === questions[currentQuestion].correct ? 'true' : 'false');
    });
    feedback.textContent = "";
}

answers.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-correct') === 'true') {
            feedback.textContent = "Правильно!";
            currentQuestion++;
            if (currentQuestion < questions.length) {
                setTimeout(loadQuestion, 1000);
            } else {
                feedback.textContent = "Вы прошли викторину!";
            }
        } else {
            feedback.textContent = "Неправильно! Попробуйте снова.";
        }
    });
});

loadQuestion();

// Логика "Таймлайн-игры"
const events = [
    {year: "862", event: "Призвание варягов"},
    {year: "988", event: "Крещение Руси"},
    {year: "1242", event: "Ледовое побоище"},
    {year: "1613", event: "Начало династии Романовых"},
    {year: "1812", event: "Отечественная война 1812 года"},
    {year: "1917", event: "Октябрьская революция"}
];

const timelineContainer = document.getElementById("timelineContainer");
const timelineMessage = document.getElementById("timelineMessage");

events.forEach((item, index) => {
    let eventBox = document.createElement("div");
    eventBox.classList.add("timeline-event");
    eventBox.setAttribute("draggable", "true");
    eventBox.textContent = item.event;
    eventBox.dataset.year = item.year;

    eventBox.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", event.target.dataset.year);
    });

    timelineContainer.appendChild(eventBox);
});

const timelineSlots = document.querySelectorAll(".timeline-slot");

timelineSlots.forEach(slot => {
    slot.addEventListener("dragover", (event) => event.preventDefault());

    slot.addEventListener("drop", (event) => {
        event.preventDefault();
        const droppedYear = event.dataTransfer.getData("text");

        if (droppedYear === slot.dataset.year) {
            slot.textContent = events.find(e => e.year === droppedYear).event;
            slot.classList.add("correct");

            let allCorrect = [...timelineSlots].every(slot => slot.classList.contains("correct"));
            if (allCorrect) {
                timelineMessage.textContent = "Поздравляем! Вы правильно расположили все события!";
            }
        }
    });
});




//Логика "Воссоздай Великую Русь"
document.addEventListener("DOMContentLoaded", () => {
    const pieces = document.querySelectorAll(".puzzle-piece4");
    const dropZones = document.querySelectorAll(".drop-zon");
    const resultMessage = document.getElementById("result-message");

    const modal = document.getElementById("game-modal");
    const openModalBtn = document.getElementById("open-modal");
    const closeModalBtn = document.querySelector(".close");

    // Открытие модального окна
    openModalBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Закрытие модального окна
    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.classList.contains("close")) {
            modal.style.display = "none";
            resetGame();
        }
    });
    
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            resetGame();
        }
    });

    pieces.forEach(piece => {
        piece.addEventListener("dragstart", dragStart);
    });

    dropZones.forEach(zone => {
        zone.addEventListener("dragover", dragOver);
        zone.addEventListener("drop", drop);
    });

    function dragStart(event) {
        event.dataTransfer.setData("text", event.target.dataset.id);
    }

    function dragOver(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        const draggedId = event.dataTransfer.getData("text");
        const dropZoneId = event.target.dataset.id;

        if (draggedId === dropZoneId) {
            const draggedElement = document.querySelector(`.puzzle-piece4[data-id="${draggedId}"]`);
            event.target.appendChild(draggedElement);
            checkWin();
        }
    }

    function checkWin() {
        if (document.querySelectorAll(".drop-zon img").length === dropZones.length) {
            resultMessage.textContent = "Поздравляем! Вы собрали карту Великой Руси!";
        }
    }

    function resetGame() {
        resultMessage.textContent = "";
        dropZones.forEach(zone => zone.innerHTML = "");
        document.querySelector(".puzzle-pieces4").append(...pieces);
    }
});






