var name = localStorage.getItem("userFname");
var correct = parseInt(localStorage.getItem("correctAnswers"));
var total = parseInt(localStorage.getItem("totalQuestions"));

if (!total || total == 0) {
  total = 10;
}
if (!correct) {
  correct = 0;
}

document.getElementById("userName").textContent = name || "Unknown";
document.getElementById("correctAnswers").textContent = correct;
document.getElementById("totalQuestions").textContent = total;
document.getElementById("score").textContent = correct + " / " + total;

var message = document.getElementById("message");
var rightDiv = document.getElementById("resultBackground");

if (correct >= 5) {
  message.textContent = ` Congratulations ${name || "student"}! You passed!`;
  message.style.color = "#0a8a0a";
  rightDiv.style.backgroundImage = "url('suc.jpeg')";
  rightDiv.style.marginRight = "70px";
  rightDiv.style.height="450px";
} else {
  message.textContent = `Sorry ${ name } You didn’t pass the quiz , give it another try!`;
  message.style.color = "red";
  rightDiv.style.backgroundImage = "url('fail43-removebg-preview.png')";
   rightDiv.style.height="450px";
    rightDiv.style.marginRight = "70px";
 
}

var retryBtn = document.getElementById("retryBtn");
retryBtn.onclick = function () {
  window.location.href = "../quiz/quiz.html";

};
