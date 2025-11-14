// Array of quiz questions and answers
// Each object represents one question with four options and the correct answer
var quizData = [
  {
    question: "What does SQL stand for?",
    a: "Simple Query Language",
    b: "Sequential Query Language",
    c: "Standard Query List",
    d: "Structured Query Language",
    correct: "3", 
  },
  {
    question: "Which SQL statement is used to retrieve data from a database?",
    a: "GET",
    b: "FETCH",
    c: "SELECT",
    d: "RETRIEVE",
    correct: "2", 
  },
  {
    question: "Which SQL clause is used to filter records?",
    a: "GROUP BY",
    b: "HAVING",
    c: "FILTER",
    d: "WHERE",
    correct: "3", 
  },
  {
    question: "Which command is used to remove all records from a table without deleting the table?",
    a: "REMOVE",
    b: "DELETE",
    c: "DROP",
    d: "TRUNCATE",
    correct: "3", 
  },
  {
    question: "Which SQL keyword is used to sort the result-set?",
    a: "SORT",
    b: "FILTER BY",
    c: "ORDER BY",
    d: "GROUP BY",
    correct: "2", 
  },
  {
    question: "Which SQL statement is used to add new data to a table?",
    a: "CREATE",
    b: "ADD RECORD",
    c: "INSERT INTO",
    d: "UPDATE",
    correct: "2", 
  },
  {
    question: "Which SQL function is used to count the number of rows in a table?",
    a: "NUMBER()",
    b: "SUM()",
    c: "TOTAL()",
    d: "COUNT()",
    correct: "3", 
  },
  {
    question: "Which SQL clause is used to group rows that have the same values?",
    a: "HAVING",
    b: "GROUP BY",
    c: "WHERE",
    d: "ORDER BY",
    correct: "1", 
  },
  {
    question: "Which command is used to change data in existing records?",
    a: "MODIFY",
    b: "ALTER",
    c: "CHANGE",
    d: "UPDATE",
    correct: "3", 
  },
  {
    question: "Which of the following is not a type of SQL join?",
    a: "INNER JOIN",
    b: "LEFT JOIN",
    c: "OUTER JOIN",
    d: "SIDE JOIN",
    correct: "3", 
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
var marks = 0; // total score 
var timerContainer= document.querySelector(".timer-container");
var questionNo= document.createElement("h2");
timerContainer.prepend(questionNo);


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


  questionNo.textContent="Question "+ (current+1) +" Of 10";
  



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
var totalTime = 900; // total time in seconds
var timeLeft = document.querySelector(".time-left"); // text showing remaining time
var progressBar = document.querySelector(".progress"); // progress bar element
  timeLeft.textContent = "Time Left : " + 15 + ":00" ;

// Set a timer that counts down every second
var timer = setInterval(function() {
  totalTime--; // reduce time by 1 second

  // Calculate minutes and seconds for display
  var minutes = Math.floor(totalTime / 60);
  var seconds = totalTime % 60;

  if(seconds <10)
  {
    seconds = "0"+seconds;
  }

  // Update displayed time
  timeLeft.textContent = "Time Left : " + minutes + ":" + seconds;

  // Update progress bar width based on remaining time
  progressBar.style.width = (totalTime / 900) * 100 + "%";

  // If time runs out → end quiz and redirect to timeout page
  if (totalTime <= 0) {
    endQuiz(true, "/timeOut/timeOut.html");
  }

}, 1000); // run every 1 second


// Function to end the quiz
// If isTimeout = true → redirect to timeout.html
// Otherwise → redirect to score.html
// function endQuiz(isTimeout = false, redirectPage = "/Score/score.html") {
//   clearInterval(timer); // stop timer
//   userAnswers.forEach((user_answer,index)=> 
//   {
//     if (user_answer === null) return;

//     if( user_answer ==  quizData[index].correct)
//     {
//       marks+=10;
//     }
//   });
//   localStorage.setItem("marks", marks);
  


//   if (isTimeout) {
//     window.location.href = redirectPage;
//   } else {
//     window.location.href = redirectPage;
//   }
// }
function endQuiz(isTimeout = false, redirectPage = "/Score/score.html") {
  clearInterval(timer); 
  var correctAnswers = 0;

  userAnswers.forEach((user_answer, index) => {
    if (user_answer === null) return;
    if (user_answer == quizData[index].correct) {
      correctAnswers++;
    }
  });

  localStorage.setItem("correctAnswers", correctAnswers);
  localStorage.setItem("totalQuestions", quizData.length);
 
  window.location.href = redirectPage;
}




