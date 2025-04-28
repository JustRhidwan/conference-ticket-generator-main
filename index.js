const day = document.querySelector('.date');
const myDate = new Date();
day.textContent = myDate;

const pages = () => {
  function handleFirstPage() {
    const nextPageButton = document.getElementById("nextPage");
    if (nextPageButton) {
      nextPageButton.addEventListener("click", function () {
        const name = document.querySelector(".username").value; // Get the username value
        const email = document.querySelector(".email").value; // Get the email value

        if (name && email) { // Ensure both fields are filled
          localStorage.setItem("username", name); // Save the name to local storage
          localStorage.setItem("email", email); // Save the email to local storage

          // Hide the first page and show the second page
          document.getElementById("firstPage").style.display = "none";
          document.getElementById("secondPage").style.display = "block";

          // Call handleSecondPage to populate the second page
          handleSecondPage();
        } else {
          alert("Please fill in both your name and email."); // Alert if fields are empty
        }
      });
    }
  }

  function handleSecondPage() {
    const ticketPage = document.querySelector(".oruko");
    if (ticketPage) {
      const displayName = localStorage.getItem("username");
      const email = localStorage.getItem("email");
      document.querySelector(".oruko").innerHTML = displayName;
      document.querySelector('.cong').innerHTML = `Congrats, ${displayName}! Your ticket is ready!`;
      document.querySelector('.e_news').innerHTML = `We've emailed your ticket to ${email} and will send updates in the run-up to the event.`;
    }
  }

  handleFirstPage();
};

window.onload = function () {
  pages();
};