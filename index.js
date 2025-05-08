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
    const avatarInput = document.querySelector("#avatar-input");

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

          // Clear the input fields
          document.querySelector(".username").value = "";
          document.querySelector(".user-email").value = "";
          document.querySelector("#github-username").value = "";
        } else {
          alert("Please fill in both your name and email."); // Alert if fields are empty
        }
      });
    }

    if (avatarInput) {
      avatarInput.addEventListener("change", function () {
        const file = avatarInput.files[0];
        const maxSizeInKB = 500;
        const maxSizeInBytes = maxSizeInKB * 1024; // Convert KB to Bytes

        if (file) {
          if (file.size > maxSizeInBytes) {
            alert("File size exceeds 500KB. Please choose a smaller file.");
            return;
          } else {
            console.log("File size is within the limit.");
          }

          const avatarUrl = URL.createObjectURL(file); // Create a URL for the uploaded file
          localStorage.setItem("s_avatar", avatarUrl); // Save the avatar URL to local storage
        }
      });
    }
  }

  function handleSecondPage() {
    const ticketPage = document.querySelector(".oruko");
    const avatarImg = document.querySelector(".info img");

    if (ticketPage) {
      const displayName = localStorage.getItem("s_username");
      const email = localStorage.getItem("s_email");
      const avatarUrl = localStorage.getItem("s_avatar");

      document.querySelector(".oruko").innerHTML = displayName;
      document.querySelector(".cong").innerHTML = `Congrats, ${displayName}! Your ticket is ready!`;
      document.querySelector(".e_news").innerHTML = `We've emailed your ticket to ${email} and will send updates in the run-up to the event.`;
      document.querySelector(".email").innerHTML = `${email}`;

      if (avatarImg && avatarUrl) {
        avatarImg.src = avatarUrl;
      }
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