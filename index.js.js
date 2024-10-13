document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('userForm');
    const userTableBody = document.getElementById('userList').getElementsByTagName('tbody')[0];

    // Load previously stored users
    retrieveSavedUsers();

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const userName = document.getElementById('fullName').value;
        const userEmail = document.getElementById('userEmail').value;
        const userPassword = document.getElementById('userPass').value;
        const userBirthdate = document.getElementById('birthDate').value;
        const hasAcceptedTerms = document.getElementById('acceptTerms').checked;

        // Check if user is within the valid age range (18-55)
        const userAge = getUserAge(userBirthdate);
        if (userAge < 18 || userAge > 55) {
            alert('Registration is only allowed for users between 18 and 55 years old.');
            return;
        }

        // Store user data locally
        storeUserData(userName, userEmail, userPassword, userBirthdate, hasAcceptedTerms);

        // Display the new user in the table
        appendToUserTable(userName, userEmail, userPassword, userBirthdate, hasAcceptedTerms);

        // Reset the form after submission
        registrationForm.reset();
    });

    function getUserAge(birthDateString) {
        const currentDate = new Date();
        const birthDate = new Date(birthDateString);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthOffset = currentDate.getMonth() - birthDate.getMonth();
        if (monthOffset < 0 || (monthOffset === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function storeUserData(fullName, email, password, dob, acceptedTerms) {
        const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        storedUsers.push({ fullName, email, password, dob, acceptedTerms });
        localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
    }

    function retrieveSavedUsers() {
        const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
        savedUsers.forEach(user => {
            appendToUserTable(user.fullName, user.email, user.password, user.dob, user.acceptedTerms);
        });
    }

    function appendToUserTable(fullName, email, password, dob, acceptedTerms) {
        const row = userTableBody.insertRow();
        row.innerHTML = `
            <td>${fullName}</td>
            <td>${email}</td>
            <td>${password}</td>
            <td>${dob}</td>
            <td>${acceptedTerms ? 'Yes' : 'No'}</td>
        `;
    }
});
