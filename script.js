
let currentQuestion = 0;
const scores = { Emotional: 0, Resilient: 0, Decisive: 0, Analytical: 0, Creative: 0 };

function showQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("question-text").textContent = question.question;
  const answersBox = document.getElementById("answers");
  answersBox.innerHTML = "";

  question.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.textContent = answer.text;
    btn.onclick = () => {
      document.querySelectorAll("#answers button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      btn.dataset.selectedType = answer.type;
      document.getElementById("next-button").disabled = false;
    };
    answersBox.appendChild(btn);
  });

  document.getElementById("next-button").disabled = true;
  document.getElementById("progress-fill").style.width = ((currentQuestion + 1) / questions.length) * 100 + "%";
}

document.getElementById("next-button").onclick = () => {
  const selectedBtn = document.querySelector("#answers button.selected");
  if (selectedBtn) {
    scores[selectedBtn.dataset.selectedType]++;
  }

  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  document.getElementById("question-box").style.display = "none";
  document.getElementById("next-button").style.display = "none";
  document.getElementById("result").style.display = "block";

  const topType = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  const descriptions = {
    Emotional: "You're deeply empathetic, attuned to others’ feelings, and sensitive to emotional dynamics.",
    Resilient: "You're adaptable and mentally strong, bouncing back quickly from setbacks.",
    Decisive: "You make choices quickly and confidently, even under pressure.",
    Analytical: "You think critically and logically, relying on facts over feelings.",
    Creative: "You thrive on imagination and originality, often thinking outside the box."
  };

  document.getElementById("result-text").textContent = descriptions[topType];
}

showQuestion();
