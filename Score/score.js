var name = localStorage.getItem("userName");
var correct = localStorage.getItem("correctAnswers");
var total = localStorage.getItem("totalQuestions");

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

var retryBtn = document.getElementById("retryBtn");
retryBtn.onclick = function () {
  window.location.href = "quiz.html";
};
