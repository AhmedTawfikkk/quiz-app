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
var resultImage = document.getElementById("resultImage");

if (correct >= 6) {
  message.textContent = `Congratulations ${name || "student"}! You passed this quiz Successfully!`;
  message.style.color = "#0a8a0a";
   resultImage.src = "suc.jpeg";
} else {
  message.textContent = `Sorry ${ name } You didn’t pass the quiz , give it another try!`;
  message.style.color = "red";
  resultImage.src = "fail43-removebg-preview.png";
}

var retryBtn = document.getElementById("retryBtn");
retryBtn.onclick = function () {
  window.location.href = "../quiz/quiz.html";

};
