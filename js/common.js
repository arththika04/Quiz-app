// Common helper functions for login check

function setLoggedInUser(username) {
  localStorage.setItem("quiz_username", username);
}

function getLoggedInUser() {
  return localStorage.getItem("quiz_username");
}

function logoutUser() {
  localStorage.removeItem("quiz_username");
}

function requireLoginOrRedirect() {
  const user = getLoggedInUser();
  if (!user) {
    // Not logged in -> go to login
    window.location.href = "login.html";
  }
}
