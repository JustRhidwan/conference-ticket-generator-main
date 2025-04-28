document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('userInfoForm');
    const preview = document.getElementById('preview');
    const profilePictureInput = document.getElementById('profilePicture');

    // Image preview functionality
    profilePictureInput.addEventListener('change', () => {
        const file = profilePictureInput.files[0];
        preview.style.display = file ? 'block' : 'none';
        preview.src = file ? URL.createObjectURL(file) : '#';
    });

    // Form submission handling
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fullName = form.fullName.value;
        const email = form.email.value;
        const githubUsername = form.githubUsername.value;
        const profilePictureFile = profilePictureInput.files[0];

        let pictureSrc = null;

        if (profilePictureFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                displayTicket(fullName, email, githubUsername, e.target.result);
            };
            reader.readAsDataURL(profilePictureFile);
        } else {
            displayTicket(fullName, email, githubUsername, pictureSrc);
        }
    });

    function displayTicket(name, email, github, pictureSrc) {
        const ticketHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Your Ticket</title>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <div class="ticket">
                    ${pictureSrc ? <img src="${pictureSrc}" alt="Profile Picture" class="profile-pic"> : ''}
                    <h2>${name}</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>GitHub:</strong> ${github}</p>
                    <p>This is your generated ticket!</p>
                </div>
            </body>
            </html>
        `;
        document.body.innerHTML = ticketHTML;
    }
});