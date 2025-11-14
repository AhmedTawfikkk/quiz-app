var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var passReg = /^.{8,}$/;

function validateEmail() {
  var email = document.getElementById("email-input").value;
  var emailMsg = document.getElementById("emailMessage");

  if (email === "") {
    emailMsg.textContent = "Email is required";
    return false;
  } else if (!emailReg.test(email)) {
    emailMsg.textContent = "Please enter a valid email";
    return false;
  } else {
    emailMsg.textContent = "";
    return true;
  }
}

function validatePassword() {
  var pass = document.getElementById("password-input").value;
  var passMsg = document.getElementById("passMessage");

  if (pass === "") {
    passMsg.textContent = "Password is required";
    return false;
  } else if (!passReg.test(pass)) {
    passMsg.textContent = "Password must be at least 8 characters";
    return false;
  } else {
    passMsg.textContent = "";
    return true;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("loginForm");
  var emailInput = document.getElementById("email-input");
  var passInput = document.getElementById("password-input");

  emailInput.addEventListener("input", validateEmail);
  passInput.addEventListener("input", validatePassword);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var validEmail = validateEmail();
    var validPass = validatePassword();

    if (!validEmail || !validPass) return;

    var storedEmail = localStorage.getItem("userEmail");
    var storedPass = localStorage.getItem("userPassword");
    
    if (emailInput.value === storedEmail && passInput.value === storedPass) {

      window.location.href = "../quiz/quiz.html";
    } else {
      document.getElementById("passMessage").textContent =
        "Incorrect email or password";
    }
  });
});
