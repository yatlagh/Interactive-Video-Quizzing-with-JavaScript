//selecting all required elements
const start_btn = document.querySelector(".Quiz1");
const start_btn2 = document.querySelector(".Quiz2");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const text_box = document.querySelector(".text_box");
const time_line = document.querySelector(".time_line");
let questions;

let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
// const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); //show quiz box
  result_box.classList.remove("activeResult"); //hide result box
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); //calling showQestions function
  queCounter(que_numb); //passing que_numb value to queCounter
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  next_btn.classList.remove("show"); //hide the next button
  text_box.classList.remove("show");
};

// if quitQuiz button clicked
// quit_quiz.onclick = ()=>{
//     window.location.reload(); //reload the current window
// }

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    //if question count is less than total question length
    que_count++; //increment the que_count value
    que_numb++; //increment the que_numb value
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine

    next_btn.classList.remove("show"); //hide the next button
    text_box.classList.remove("show");
    let width1 = time_line.offsetWidth;
    time_line.style.width = width1 + 100 + "px";
  } else {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    showResult(); //calling showResult function
    time_line.style.width = "0px";
  }
};

// getting questions and options from array
function showQuetions(index) {
  const que_text = document.querySelector(".que_text");

  //creating a new span and div tag for question and option and passing the value using array index
  let que_tag = "<span>" + questions[index].question + "</span>";

  var option_tag = "";
  for (var i = 0; i < questions[index].options.length; i++) {
    option_tag +=
      '<div class="option"><span>' +
      questions[index].options[i] +
      "</span></div>";
    console.log(option_tag);
  }
  // let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
  //   + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>';
  //  console.log(option_tag)

  que_text.innerHTML = que_tag; //adding new span tag inside que_tag
  option_list.innerHTML = option_tag; //adding new div tag inside option_tag

  const option = option_list.querySelectorAll(".option");

  // set onclick attribute to all available options
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
// creating the new div tags which for icons
let tickIconTag =
  '<div class="icon tick mx-2"><i class="fas fa-check"></i></div>';
let crossIconTag =
  '<div class="icon cross mx-2"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  let userAns = answer.textContent; //getting user selected option
  let correcAns = questions[que_count].answer; //getting correct answer from array
  let moreInfo = questions[que_count].info; //getting correct answer from array
  const allOptions = option_list.children.length; //getting all option items

  if (userAns == correcAns) {
    //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    answer.insertAdjacentHTML("afterbegin", tickIconTag); //adding tick icon to correct selected option
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
    let mytext =
      '<p><span class="correct"><em>Correct</em></span><br>' + moreInfo + "<p>";
    text_box.innerHTML = mytext;
  } else {
    answer.classList.add("incorrect"); //adding red color to correct selected option
    answer.insertAdjacentHTML("afterbegin", crossIconTag); //adding cross icon to correct selected option
    console.log("Wrong Answer");

    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        //if there is an option which is matched to an array answer
        option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
        option_list.children[i].insertAdjacentHTML("afterbegin", tickIconTag); //adding tick icon to matched option
        console.log("Auto selected correct answer.");
        console.log(moreInfo);
        let mytext =
          '<p><span class="wrong"><em>Wrong</em></span><br>' + moreInfo + "<p>";
        text_box.innerHTML = mytext;
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
  }
  next_btn.classList.add("show"); //show the next button if user selected any option
  text_box.classList.add("show");
}

function showResult() {
  quiz_box.classList.remove("activeQuiz"); //hide quiz box
  result_box.classList.add("activeResult"); //show result box
  const scoreText = result_box.querySelector(".score_text");
  if (userScore > 4) {
    // if user scored more than 3
    //creating a new span tag and passing the user score number and total question number
    let scoreTag =
      "<span>and congrats! 🎉, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag; //adding new span tag inside score_Text
  } else if (userScore > 2) {
    // if user scored more than 1
    let scoreTag =
      "<span>and nice 😎, You got <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let scoreTag =
      "<span>and sorry 😐, You got only <p>" +
      userScore +
      "</p> out of <p>" +
      questions.length +
      "</p></span>";
    scoreText.innerHTML = scoreTag;
  }
}

function queCounter(index) {
  //creating a new span tag and passing the question number and total question
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; //adding new span tag inside bottom_ques_counter
}

const videoPlayer = videojs("my-video");
// Disable seeking forward
videoPlayer.controlBar.progressControl.seekBar.handleMouseDown =
  function handleMouseDown(event) {
    const currentTime = this.calculateDistance(event) * this.player_.duration();
    if (currentTime < this.player_.currentTime()) {
      this.player_.currentTime(currentTime);
    }
  };
const progressBar = document.querySelector(".progress-bar");
const startIcons = document.querySelectorAll(".position-absolute");
const quiz = document.querySelector(".quiz");
const closeOverlayButton = document.querySelector("#closeOverlay");

function handleStartReached(startIndex) {
  videoPlayer.pause();
  quiz.style.display = "block";
  questions;
  quiz_box.classList.add("activeQuiz"); //show quiz box
  showQuetions(0); //calling showQestions function
  queCounter(1); //passing 1 parameter to queCounter
}

closeOverlayButton.addEventListener("click", function () {
  quiz.style.display = "none";
  videoPlayer.play();
  result_box.classList.remove("activeResult"); //hide result box
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); //calling showQestions function
  queCounter(que_numb); //passing que_numb value to queCounter
  clearInterval(counter); //clear counter
  clearInterval(counterLine); //clear counterLine
  next_btn.classList.remove("show"); //hide the next button
  text_box.classList.remove("show");
});

videoPlayer.on("timeupdate", function () {
  const currentTime = videoPlayer.currentTime();
  const duration = videoPlayer.duration();
  const percentage = (currentTime / duration) * 100;

  progressBar.style.width = percentage + "%";

  if (
    percentage >= 0 &&
    percentage < 10 &&
    !startIcons[0].classList.contains("active")
  ) {
    startIcons[0].classList.add("active");
  } else if (
    percentage >= 20 &&
    percentage < 40 &&
    !startIcons[1].classList.contains("active")
  ) {
    startIcons[1].classList.add("active");
    questions = Step1;
    handleStartReached(0);
  } else if (
    percentage >= 40 &&
    percentage < 60 &&
    !startIcons[2].classList.contains("active")
  ) {
    startIcons[2].classList.add("active");
    questions = Step2;
    handleStartReached(0);
  } else if (
    percentage >= 60 &&
    percentage < 80 &&
    !startIcons[3].classList.contains("active")
  ) {
    startIcons[3].classList.add("active");
    questions = Step2;
    handleStartReached(0);
  } else if (
    percentage >= 80 &&
    percentage < 100 &&
    !startIcons[4].classList.contains("active")
  ) {
    startIcons[4].classList.add("active");
    questions = Step1;
    handleStartReached(0);
  } else if (percentage == 100 && !startIcons[5].classList.contains("active")) {
    startIcons[5].classList.add("active");
    questions = Step2;
    handleStartReached(0);
  }
});
