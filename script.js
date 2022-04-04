const slidePage = document.querySelector(".slidepage");
const firstNextBtn = document.querySelector(".firstNextBtn");
const prevBtnOne = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
const container = document.querySelector(".screen-container");
const count = document.querySelector("#count");
const title = document.querySelector("#title");
const firstName = document.querySelector("#name");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const seat = document.querySelector("#seat");
const allSeats = document.querySelector("#allSeats");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const takePersonalData = () => {
  if (localStorage.getItem("formData")) {
    const deneme = JSON.parse(localStorage.getItem("formData"));
    title.value = deneme.title;
    firstName.value = deneme.firstName;
    lastName.value = deneme.lastName;
    email.value = deneme.email;
    seat.value = deneme.seat;
  }
};
window.onload = takePersonalData();

const progressBarAdd = () => {
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
};

firstNextBtn.addEventListener("click", function (event) {
  if (
    title.value &&
    firstName.value &&
    lastName.value &&
    email.value &&
    seat.value > 0 &&
    seat.value <= 100
  ) {
    // event.preventDefault();
    slidePage.style.marginLeft = "-25%";
    progressBarAdd();
  }
});

function updateSelectedCount() {
  const seats = document.querySelectorAll(".row .seat:not(.occupied)");
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat) + 1;
  });

  console.log("seatsIndex", seatsIndex);

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
}

let countSeat = 0;

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied") &&
    !e.target.classList.contains("selected") &&
    countSeat < seat.value
  ) {
    e.target.classList.add("selected");
    countSeat += 1;
  } else if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied") &&
    countSeat > 0 &&
    e.target.classList.contains("selected")
  ) {
    e.target.classList.remove("selected");
    countSeat -= 1;
  }

  updateSelectedCount();
});

prevBtnOne.addEventListener("click", function (event) {
  // event.preventDefault();
  slidePage.style.marginLeft = "0%";
  progressBarRemove();
});

nextBtnSec.addEventListener("click", function (event) {
  // event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  progressBarAdd();
});

populateUI();

// Get data from localstorage and populate the ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  console.log("selectedSeats", selectedSeats);
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}

console.log(localStorage.getItem("selectedSeats"));

for (let i = 0; i <= 10; i++) {
  const seatRow = document.createElement("div");
  seatRow.classList.add("row");
  allSeats.appendChild(seatRow);
  for (let j = 0; j <= 10; j++) {
    const seatCol = document.createElement("div");
    seatCol.classList.add("seat");
    seatRow.appendChild(seatCol);
  }
}

const progressBarRemove = () => {
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
};

let current = 1;

updateSelectedCount();

prevBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  progressBarRemove();
});

function displayData() {
  if (localStorage.getItem("formData")) {
    const { title, firstName, lastName, email, seat } = JSON.parse(
      localStorage.getItem("formData")
    );
    const output = document.querySelector("#output");
    output.innerHTML = `
    <div class="ticket">
      <div class="ticket-header">
          <div class="lane">
            Title: ${title.split("")[0].toUpperCase()}${title[1]}.
          </div>
          <div class="lane">
            Firstname: ${firstName}
          </div>
          <div class="lane">
            Lastname: ${lastName}
          </div>
          <div class="lane">
            Email: ${email}
          </div>
          <div class="lane">
            No of Seat: ${seat}
          </div>
      </div>
    </div>

    `;
  }
}

const signUp = (e) => {
  const formData = {
    title: title.value,
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    seat: seat.value,
  };

  localStorage.setItem("formData", JSON.stringify(formData));

  displayData();
  e.preventDefault();
};

submitBtn.addEventListener("click", function (event) {
  progressBarAdd();
  signUp();
  // displayData();
  setTimeout(() => {
    alert(`You are successfuly created your own ticket`);
  }, 800);
});
