var nameReg = /^[A-Za-z\u0600-\u06FF ]+$/;
var emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var passReg = /^.{8,}$/;

function clearMessage(input) {
  var next = input.nextElementSibling;
  if (next && next.classList.contains("error")) {
    next.remove();
  }
}

function showMessage(input, message) {
  clearMessage(input);
  var small = document.createElement("div");
  small.textContent = message;
  small.className = "error";
  input.parentNode.insertBefore(small, input.nextSibling);
}

function validateFnameInput() {
  var input = document.getElementById("fname");
  var val = input.value.trim();

  if (val === "") {
    showMessage(input, "First name is required");
    return false;
  } else if (!nameReg.test(val)) {
    showMessage(input, "Enter letters only");
    return false;
  } else {
    clearMessage(input);
    return true;
  }
}

function validateEmailInput() {
  var input = document.getElementById("email");
  var val = input.value.trim();

  if (val === "") {
    showMessage(input, "Email is required");
    return false;
  } else if (!emailReg.test(val)) {
    showMessage(input, "Invalid email format");
    return false;
  } else {
    clearMessage(input);
    return true;
  }
}

function validatePassInput() {
  var input = document.getElementById("pass");
  var val = input.value;

  if (val === "") {
    showMessage(input, "Password is required");
    return false;
  } else if (!passReg.test(val)) {
    showMessage(input, "Password must be 8 characters or more");
    return false;
  } else {
    clearMessage(input);
    return true;
  }
}

function validateConfirmInput() {
  var input = document.getElementById("confirm");
  var val = input.value;
  var passVal = document.getElementById("pass").value;

  if (val === "") {
    showMessage(input, "Please confirm your password");
    return false;
  } else if (val !== passVal) {
    showMessage(input, "Passwords do not match");
    return false;
  } else {
    clearMessage(input);
    return true;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  var fname = document.getElementById("fname");
  var email = document.getElementById("email");
  var pass = document.getElementById("pass");
  var confirm = document.getElementById("confirm");
  var form = document.getElementById("registerForm");

  fname.addEventListener("input", validateFnameInput);
  email.addEventListener("input", validateEmailInput);
  pass.addEventListener("input", function () {
    validatePassInput();
    if (confirm.value.trim() !== "") validateConfirmInput();
  });
  confirm.addEventListener("input", validateConfirmInput);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var ok = true;
    if (!validateFnameInput()) ok = false;
    if (!validateEmailInput()) ok = false;
    if (!validatePassInput()) ok = false;
    if (!validateConfirmInput()) ok = false;
    if (!ok) return;

    var firstName = fname.value;
    var emailVal = email.value;
    var passwordVal = pass.value;

    localStorage.setItem("userFname", firstName);
    localStorage.setItem("userEmail", emailVal);
    localStorage.setItem("userPassword", passwordVal);

    window.location.href = "../login/login.html";
  });
});
