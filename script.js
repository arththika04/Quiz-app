const username = localStorage.getItem("username");
const welcome = document.getElementById("welcome");
const quizBox = document.getElementById("quiz-box");
const questionText = document.getElementById("question");
const optionsBox = document.getElementById("options");
const result = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

let questions = [];
let current = 0;
let score = 0;

if (!username) {
  alert("Please log in first!");
  window.location.href = "login.html";
} else {
  welcome.textContent = `Welcome, ${username}!`;
  quizBox.classList.remove("hidden");

  fetch("questions.json")
    .then((res) => res.json())
    .then((data) => {
      questions = data;
      showQuestion();
    });
}

function showQuestion() {
  if (current >= questions.length) {
    questionText.textContent = `Quiz Finished! Your score: ${score}/${questions.length}`;
    optionsBox.innerHTML = "";
    nextBtn.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    return;
  }

  const q = questions[current];
  questionText.textContent = q.question;
  optionsBox.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(btn, q.answer);
    optionsBox.appendChild(btn);
  });

  result.textContent = "";
}

function checkAnswer(selectedBtn, correctAnswer) {
  const buttons = optionsBox.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));

  if (selectedBtn.textContent === correctAnswer) {
    selectedBtn.classList.add("correct");
    score++;
    result.textContent = "✅ Correct!";
  } else {
    selectedBtn.classList.add("wrong");
    result.textContent = "❌ Incorrect!";
  }
}

nextBtn.addEventListener("click", () => {
  current++;
  showQuestion();
});

restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  restartBtn.classList.add("hidden");
  nextBtn.classList.remove("hidden");
  showQuestion();
});
