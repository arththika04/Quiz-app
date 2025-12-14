const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const errorMsg = document.getElementById("errorMsg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = usernameInput.value.trim();

  // Validate username (required)
  if (username === "") {
    errorMsg.textContent = "Username is required.";
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");

  // Store username in localStorage
  setLoggedInUser(username);

  // Alert success
  alert("Successfully logged in!");

  // Redirect to quiz page
  window.location.href = "quiz.html";
});
