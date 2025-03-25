// Получаем элементы модальных окон
const puzzleInfoModal = document.getElementById("puzzleInfoModal");
const puzzleModal = document.getElementById("puzzleModal");
const puzzleInfoBtn = document.getElementById("puzzleInfoBtn");
const puzzleInfoClose = document.getElementById("puzzleInfoClose");
const puzzleClose = document.getElementById("puzzleClose");
const startPuzzleBtn = document.getElementById("startPuzzleBtn");
const puzzleMessage = document.getElementById("puzzleMessage");

// Кнопки для открытия окон
puzzleInfoBtn.onclick = () => puzzleInfoModal.style.display = "block";
puzzleInfoClose.onclick = () => puzzleInfoModal.style.display = "none";
puzzleClose.onclick = () => puzzleModal.style.display = "none";

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
console.log("Скрипт загружен");

const modal = document.getElementById('quizModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const openQuizBtn = document.getElementById('openQuizBtn'); // Кнопка для открытия
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
    console.log("Загружаем новый вопрос");
    const current = questions[currentQuestion]; 
    questionBox.textContent = current.question;
    answers.forEach((button, index) => {
        button.textContent = current.answers[index];
        button.setAttribute('data-correct', index === current.correct ? 'true' : 'false');
    });
    feedback.textContent = "";
}

openQuizBtn.addEventListener('click', function() {
    console.log("Кнопка нажата для открытия викторины");
    modal.style.display = 'flex';
    currentQuestion = 0;
    loadQuestion();
});

closeModalBtn.addEventListener('click', function() {
    console.log("Закрытие модального окна");
    modal.style.display = 'none';
});

answers.forEach(button => {
    button.addEventListener('click', function() {
        const isCorrect = this.getAttribute('data-correct') === 'true';
        feedback.textContent = isCorrect ? "Правильно!" : "Неправильно! Попробуйте снова.";
        if (isCorrect) {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                setTimeout(loadQuestion, 1000);
            } else {
                feedback.textContent = "Вы прошли викторину!";
            }
        }
    });
});

// Закрытие модального окна при клике вне его области
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        console.log("Клик за пределами модального окна, закрытие");
        modal.style.display = 'none';
    }
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

// Увилечение картинки

document.addEventListener("DOMContentLoaded", function () {
    const fullscreenContainer = document.getElementById("fullscreenContainer");
    const fullscreenImage = document.getElementById("fullscreenImage");
    const images = document.querySelectorAll(".clickable-image");

    images.forEach(image => {
        image.addEventListener("click", () => {
            fullscreenImage.src = image.src;
            fullscreenContainer.style.display = "flex";
        });
    });

    fullscreenContainer.addEventListener("click", () => {
        fullscreenContainer.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("fullscreenContainer").style.display = "none";
});


// Открытие модального окна с таблицей
document.getElementById('openTableBtn').onclick = function() {
    document.getElementById('timelineModal').style.display = 'block';
};

// Закрытие модального окна с таблицей
function closeTimeline() {
    document.getElementById('timelineModal').style.display = 'none';
}

// Открытие модального окна с подробностями
function openModal(title, description) {
    document.getElementById('eventDetails').innerHTML = `<h3>${title}</h3><p>${description}</p>`;
    document.getElementById('detailsModal').style.display = 'block';
}

// Закрытие модального окна с подробностями
function closeDetails() {
    document.getElementById('detailsModal').style.display = 'none';
}

// Закрытие модальных окон при клике вне их области
window.onclick = function(event) {
    if (event.target == document.getElementById('timelineModal')) {
        closeTimeline();
    }
    if (event.target == document.getElementById('detailsModal')) {
        closeDetails();
    }
};


