window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new window.SpeechRecognition();
recognition.interimResults = true;

const row = document.querySelector(".row");
const spanNumber = document.createElement("span");
const info = document.querySelector(".info");

let randomNumber = Math.floor(Math.random() * 100);
let quess = 1;
let wins = false;

recognition.addEventListener("result", (e) => {
  const number = Array.from(e.results)
    .map((results) => results[0])
    .map((results) => results.transcript)
    .join("");
  let finalN = Number(number);

  if (e.results[0].isFinal) {
    spanNumber.innerHTML = `Your number : <span class="final">${finalN}</span> <br> <br> Quess number : <span class="final">${quess}</span>`;
    row.appendChild(spanNumber);
    quess++;
  }
  quessNumber(finalN);
});

recognition.addEventListener("end", () => {
  if (wins) {
    quess = 1;
    randomNumber = Math.floor(Math.random() * 100);
    const tryAgain = document.querySelector(".try-again");
    tryAgain.addEventListener("click", () => {
      wins = false;
      spanNumber.innerHTML = "";
      recognition.start();
    });

    return;
  }
  recognition.start();
});
recognition.start();

function quessNumber(finalN) {
  if (finalN > randomNumber) {
    info.style.display = "block";
    if (info.classList.contains("info-low")) {
      info.classList.remove("info-low");
    }
    info.classList.add("info-high");
    info.innerHTML = "Too High.";
  }
  if (finalN < randomNumber) {
    info.style.display = "block";
    if (info.classList.contains("info-high")) {
      info.classList.remove("info-high");
    }
    info.classList.add("info-low");
    info.innerHTML = "Too Low.";
  }
  if (finalN === randomNumber) {
    info.style.display = "none";
    spanNumber.innerHTML = `You win. <span class="final">${finalN}</span> <br><br> Quess Number :  <span class="final">${quess}</span>
    <br><br><button class="try-again">Try Again!</button>`;
    row.appendChild(spanNumber);
    wins = true;
  }
}
