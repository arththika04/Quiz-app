requireLoginOrRedirect(); // Only allow if logged in

// DOM elements
const welcomeText = document.getElementById("welcomeText");
const scoreEl = document.getElementById("score");
const qCountEl = document.getElementById("qCount");
const questionTextEl = document.getElementById("questionText");
const optionsEl = document.getElementById("options");
const resultMsgEl = document.getElementById("resultMsg");

const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const logoutBtn = document.getElementById("logoutBtn");

// State
let questions = [];
let currentIndex = 0;
let score = 0;
let answered = false;

// Show username
const user = getLoggedInUser();
welcomeText.textContent = `Hi, ${user}!`;

// Load questions from JSON
fetch("data/questions.json")
  .then((res) => res.json())
  .then((data) => {
    questions = data;
    startQuiz();
  })
  .catch(() => {
    questionTextEl.textContent = "Failed to load questions.json (Run with Live Server).";
  });

function startQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;
  scoreEl.textContent = score;
  resultMsgEl.classList.add("hidden");
  nextBtn.disabled = true;
  showQuestion();
}

function showQuestion() {
  answered = false;
  nextBtn.disabled = true;
  resultMsgEl.classList.add("hidden");
  optionsEl.innerHTML = "";

  const q = questions[currentIndex];

  qCountEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
  questionTextEl.textContent = q.question;

  // Create option buttons
  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.className = "optionBtn";
    btn.textContent = opt;

    btn.addEventListener("click", () => handleAnswer(btn, opt));
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(buttonEl, selectedAnswer) {
  if (answered) return; // prevent multiple answers
  answered = true;

  const correctAnswer = questions[currentIndex].answer;

  // highlight selected
  buttonEl.classList.add("selected");

  // mark correct/wrong + show message
  if (selectedAnswer === correctAnswer) {
    score++;
    scoreEl.textContent = score;
    showMessage("Correct ✅", "success");
    buttonEl.classList.add("correct");
  } else {
    showMessage(`Incorrect ❌ (Correct: ${correctAnswer})`, "error");
    buttonEl.classList.add("wrong");

    // also highlight the correct option button
    const allButtons = document.querySelectorAll(".optionBtn");
    allButtons.forEach((b) => {
      if (b.textContent === correctAnswer) b.classList.add("correct");
    });
  }

  // disable all options after answering
  const allButtons = document.querySelectorAll(".optionBtn");
  allButtons.forEach((b) => (b.disabled = true));

  nextBtn.disabled = false;
}

function showMessage(text, type) {
  resultMsgEl.textContent = text;
  resultMsgEl.classList.remove("hidden");
  resultMsgEl.classList.remove("success", "error");
  resultMsgEl.classList.add(type);
}

// Next button
nextBtn.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    showQuestion();
  } else {
    // Quiz finished
    questionTextEl.textContent = `Finished! 🎉 Your score: ${score}/${questions.length}`;
    qCountEl.textContent = "Quiz Completed";
    optionsEl.innerHTML = "";
    nextBtn.disabled = true;
    showMessage("Click Restart to play again.", "success");
  }
});

// Restart button (no page refresh)
restartBtn.addEventListener("click", () => {
  startQuiz();
});

// Logout button
logoutBtn.addEventListener("click", () => {
  logoutUser();
  window.location.href = "login.html";
});
