// Array of quiz questions and answers
// Each object represents one question with four options and the correct answer
var quizData = [
  {
    question: "What does HTML stand for?",
    a: "HyperText Markup Language",
    b: "Home Tool Markup Language",
    c: "Hyperlinks and Text Markup Language",
    d: "Hyper Transfer Markup Language",
    correct: "0",
  },
  {
    question: "Which language is used for styling web pages?",
    a: "HTML",
    b: "JQuery",
    c: "CSS",
    d: "XML",
    correct: "2",
  },
  {
    question: "Which language is used for web app logic?",
    a: "PHP",
    b: "JavaScript",
    c: "CSS",
    d: "HTML",
    correct: "1",
  },
  {
    question: "Inside which HTML element do we put JavaScript?",
    a: "<js>",
    b: "<scripting>",
    c: "<script>",
    d: "<javascript>",
    correct: "2",
  },
  {
    question: "What does CSS stand for?",
    a: "Cascading Style Sheets",
    b: "Colorful Style Syntax",
    c: "Creative Styling System",
    d: "Computer Style Sheets",
    correct: "0",
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    a: "<css>",
    b: "<script>",
    c: "<style>",
    d: "<design>",
    correct: "2",
  },
  {
    question: "Which company developed JavaScript?",
    a: "Microsoft",
    b: "Apple",
    c: "Netscape",
    d: "Google",
    correct: "2",
  },
  {
    question: "What is the correct syntax to link an external CSS file?",
    a: "<link rel='stylesheet' href='style.css'>",
    b: "<style src='style.css'>",
    c: "<css link='style.css'>",
    d: "<link src='style.css'>",
    correct: "0",
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    a: "font",
    b: "class",
    c: "style",
    d: "styles",
    correct: "2",
  },
  {
    question: "Which of the following is not a programming language?",
    a: "Python",
    b: "HTML",
    c: "C++",
    d: "Java",
    correct: "1",
  },
];


// Function to shuffle the quiz questions randomly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index
    let j = Math.floor(Math.random() * (i + 1));
    // Swap current element with the randomly chosen one
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Selecting important DOM elements
var question = document.querySelector(".question"); // h1 tag where question text will appear
var text = document.getElementsByClassName("text"); // collection of span/divs showing options text
var current = 0; // index of current question
var userAnswers = new Array(quizData.length).fill(null); // store user’s chosen answers and it is array every item have answer from 0 to 3
var questionItems = document.querySelectorAll(".question-list li");  // sidebar question numbers (li elements)
var marks = 0; // total score (currently unused)

shuffle(quizData); // Randomize the question order before starting


// When a sidebar item (li) is clicked → load that question
questionItems.forEach((item, index) => {
  item.addEventListener("click", function () {
    current = index; // set current question index
    loadQuestion();  // display it
  });
});


// Function to load a question and its options into the UI
function loadQuestion() {
  // Display the question text
  question.textContent = quizData[current].question;

  // Display the four options (a, b, c, d)
  text[0].textContent = quizData[current].a;
  text[1].textContent = quizData[current].b;
  text[2].textContent = quizData[current].c;
  text[3].textContent = quizData[current].d;

  // Get all input radio buttons
  var answers = document.querySelectorAll('input');

  // Loop through each answer
  answers.forEach((answer, index) => {   // index is from 0 to 3
    // If user previously selected this answer, keep it checked
    answer.checked = userAnswers[current] === index;    //

    // Add listener for when user selects an answer
    answer.addEventListener("change", function () {
      userAnswers[current] = index; // store user’s choice from 0 to 3
      questionItems[current].classList.add("answered"); // mark question as answered in sidebar
    });
  });
   var markBtn = document.querySelector(".mark");
  if (questionItems[current].classList.contains("marked")) {
    markBtn.textContent = "Unmark Question";
  } else {
    markBtn.textContent = "Mark Question";
  }

}

loadQuestion(); // Load the first question initially

// Function to go to next question
function next() {
  
  current++; // move to next question

  // Disable "Next" button if we are at the last question
  if (current >= quizData.length - 1) {
    var nextBtn = document.querySelector(".next");
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "not-allowed";
  }

  // Enable "Previous" button when moving forward
  var previousBtn = document.querySelector(".previous");
  previousBtn.disabled = false;
  previousBtn.style.opacity = "1";
  previousBtn.style.cursor = "pointer";

  loadQuestion(); // Load the next question
}


// Function to go back to the previous question
function previous() {
  current--; // move to previous question

  // Disable "Previous" button if we’re at the first question
  if (current <= 0) {
    var previousBtn = document.querySelector(".previous");
    previousBtn.disabled = true;
    previousBtn.style.opacity = "0.5";
    previousBtn.style.cursor = "not-allowed";
  }

  // Enable "Next" button again if we moved back
  var nextBtn = document.querySelector(".next");
  nextBtn.disabled = false;
  nextBtn.style.opacity = "1";
  nextBtn.style.cursor = "pointer";

  loadQuestion(); // Load the previous question
}


// Function to mark or unmark a question (for review later)
function mark() {
  // ❌ There's a typo here: should be 'questionItems[current]' not 'qcclassList'
  if (questionItems[current].classList.contains("marked")) {
    questionItems[current].classList.remove("marked");
       document.querySelector(".mark").textContent="Mark question";

  } else {
    questionItems[current].classList.add("marked");
    document.querySelector(".mark").textContent="Unmark Question";
  }
}
// When submit button is clicked → end the quiz
document.querySelector(".submit").addEventListener("click", () => {
  endQuiz();
});
// ---------------- TIMER SECTION ---------------- //
var totalTime = 30; // total time in seconds
var timeLeft = document.querySelector(".time-left"); // text showing remaining time
var progressBar = document.querySelector(".progress"); // progress bar element

// Set a timer that counts down every second
var timer = setInterval(function() {
  totalTime--; // reduce time by 1 second

  // Calculate minutes and seconds for display
  var minutes = Math.floor(totalTime / 60);
  var seconds = totalTime % 60;

  // Update displayed time
  timeLeft.textContent = "Time Left : " + minutes + ":" + seconds;

  // Update progress bar width based on remaining time
  progressBar.style.width = (totalTime / 30) * 100 + "%";

  // If time runs out → end quiz and redirect to timeout page
  if (totalTime <= 0) {
    endQuiz(true, "/TimeOut/timeout.html");
  }

}, 1000); // run every 1 second


// Function to end the quiz
// If isTimeout = true → redirect to timeout.html
// Otherwise → redirect to score.html
function endQuiz(isTimeout = false, redirectPage = "/Score/score.html") {
  clearInterval(timer); // stop timer
  userAnswers.forEach((user_answer,index)=> 
  {
    if (user_answer === null) return;

    if( user_answer ==  quizData[index].correct)
    {
      marks+=10;
    }
  });
  localStorage.setItem("marks", marks);
  


  if (isTimeout) {
    window.location.href = redirectPage;
  } else {
    window.location.href = redirectPage;
  }
}




