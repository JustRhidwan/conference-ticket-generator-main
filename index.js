const day = document.querySelector('.date');
if (day) {
  const myDate = new Date();
  day.innerHTML = myDate.toLocaleDateString();
} else {
  console.warn("The '.date' element is missing in the HTML.");
}

const pages = () => {
  function handleFirstPage() {
    const nextPageButton = document.getElementById("nextPage");
    if (nextPageButton) {
        nextPageButton.addEventListener("click", function () {
          const name = document.querySelector(".username").value.trim(); // Get the username value
          const email = document.querySelector(".user-email").value.trim(); // Get the email value
          const githubUsername = document.querySelector("#github-username").value.trim();
        
          console.log(name, email, githubUsername); // Log the values for debugging

          if (name && email) { // Ensure both fields are filled
            localStorage.setItem("s_username", name); // Save the name to local storage
            localStorage.setItem("s_email", email); // Save the email to local storage
            localStorage.setItem("s_github", githubUsername); // Save GitHub username to local storage

             // Navigate to the ticket page
        window.location.href = "index-ticket.html";

            // Optionally, you can also clear the input fields after saving
            document.querySelector(".username").value = ""; // Clear the username field
            document.querySelector(".user-email").value = ""; // Clear the email field
            document.querySelector("#github-username").value = ""; // Clear the GitHub username field
           
          } else {
            alert("Please fill in both your name and email."); // Alert if fields are empty
          }
        });
    }
  }

  function handleSecondPage() {
    const ticketPage = document.querySelector(".oruko");
    if (ticketPage) {
      const displayName = localStorage.getItem("s_username");
      const email = localStorage.getItem("s_email");
      document.querySelector(".oruko").innerHTML = displayName;
      document.querySelector('.cong').innerHTML = `Congrats, ${displayName}! Your ticket is ready!`;
      document.querySelector('.e_news').innerHTML = `We've emailed your ticket to ${email} and will send updates in the run-up to the event.`;
      document.querySelector(".email").innerHTML = `${email}`
    }
  }

   // Call handleFirstPage only on the first page
   if (document.getElementById("firstPage")) {
    handleFirstPage();
  }

  // Call handleSecondPage only on the second page
  if (window.location.pathname.includes("index-ticket.html")) {
    handleSecondPage();
  }
};

window.onload = function () {
  pages();
};