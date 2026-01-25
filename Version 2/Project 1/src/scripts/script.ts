let container = document.getElementById("Main-Container") as HTMLDivElement;
let startButton = document.getElementById("btn-start") as HTMLButtonElement;

interface Question {
  question: string;
  options: string[];
  answer: string;
}

type Quiz = Question[];

const quiz: Quiz = [
  {
    question: "ما هي عاصمة المغرب؟",
    options: ["الرباط", "الدار البيضاء", "مراكش", "فاس", "طنجة"],
    answer: "الرباط",
  },
  {
    question: "ما هو أكبر كوكب في المجموعة الشمسية؟",
    options: ["الأرض", "المريخ", "المشتري", "زحل", "الزهرة"],
    answer: "المشتري",
  },
  {
    question: "أي من هذه اللغات برمجية؟",
    options: ["HTML", "CSS", "JavaScript", "Photoshop", "Excel"],
    answer: "JavaScript",
  },
  {
    question: "ما هو أسرع حيوان بري؟",
    options: ["الفهد", "الأسد", "الغزال", "النمر", "الكنغر"],
    answer: "الفهد",
  },
  {
    question: "كم عدد الكواكب في النظام الشمسي؟",
    options: ["7", "8", "9", "10", "6"],
    answer: "8",
  },
];

let score: number = 0;

function startQuiz(index: number) {
  container.innerHTML = "";

  const currentQuestion: Question = quiz[index]!;

  const h1 = document.createElement("h1");
  h1.className = "Question-Title";
  h1.textContent = `${currentQuestion.question}`;

  const div = document.createElement("div");
  div.className = "Number-Quize-And-Score";

  const h4Question = document.createElement("h4");
  h4Question.textContent = `Question ${index + 1} of ${quiz.length}`;

  const h4Score = document.createElement("h4");
  h4Score.textContent = `Score: ${score}`;

  div.appendChild(h4Question);
  div.appendChild(h4Score);

  container.appendChild(h1);
  container.appendChild(div);

  currentQuestion.options.forEach((option) => {
    const divOption = document.createElement("div");
    divOption.className = "Reponse";
    const paragraphOption = document.createElement("p");
    paragraphOption.textContent = option;
    divOption.appendChild(paragraphOption);

    divOption.addEventListener("click", () => {
      if (option === currentQuestion.answer) {
        score++;
      }

      container.querySelectorAll(".Reponse").forEach((optDiv) => {
        (optDiv as HTMLElement).style.pointerEvents = "none";// نوقف الضغط على كل الاختيارات فقط
        if (optDiv.textContent === currentQuestion.answer) {
          optDiv.className = "Reponse Success-question"; // الجواب الصحيح
        } else if (optDiv === divOption) {
          optDiv.className = "Reponse Wrong-question"; // الخيار اللي ضغط عليه خاطئ
        } else {
          optDiv.className = "Reponse"; // باقي الخيارات تبقى عادية
        }
      });

      // الانتقال للسؤال التالي
      if (index < quiz.length - 1) {
        setTimeout(() => {
          startQuiz(index + 1);
        }, 2000);
      } else {
        setTimeout(() => showResults(), 1000);
      }
    });
    container.appendChild(divOption);
  });

  const progressBarContainer = document.createElement("div");
  progressBarContainer.className = "Progress-container";
  const progressBar = document.createElement("div");
  progressBar.className = "Progress-bar";
  progressBar.style.width = `${(index / (quiz.length - 1)) * 100}%`;
  progressBarContainer.appendChild(progressBar);
  container.appendChild(progressBarContainer);
}

function showResults() {
  container.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.className = "Question-Title";
  h1.textContent = "Quiz Results";

  const div = document.createElement("div");
  div.className = "Final-Result-Container";

  const p1 = document.createElement("p");
  p1.className = "simple-paragraph";
  p1.textContent = `You scored ${score} out of ${quiz.length}`;
  const p2 = document.createElement("p");
  p2.className = "status-of-quize";
  p2.textContent = "Good effort! Keep learning";
  div.appendChild(p1);
  div.appendChild(p2);

  const restartButton = document.createElement("button");
  restartButton.className = "btn-start";
  restartButton.textContent = "Restart Quiz";

  container.appendChild(h1);
  container.appendChild(div);
  container.appendChild(restartButton);
  restartButton.addEventListener("click", () => {
    score = 0;
    startQuiz(0);
 });
}

startButton.addEventListener("click", () => startQuiz(0));
