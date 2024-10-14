document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('userForm');
    const userTableBody = document.getElementById('userList').getElementsByTagName('tbody')[0];
    retrieveSavedUsers();

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const userName = document.getElementById('fullName').value;
        const userEmail = document.getElementById('userEmail').value;
        const userPassword = document.getElementById('userPass').value;
        const userBirthdate = document.getElementById('birthDate').value;
        const hasAcceptedTerms = document.getElementById('acceptTerms').checked;

        
        const userAge = getAge(userBirthdate);
        if (userAge < 18 || userAge > 55) {
            alert('Registration is only allowed for users between 18 and 55 years old.');
            return;
        }

        
        storeUser(userName, userEmail, userPassword, userBirthdate, hasAcceptedTerms);

        
        append(userName, userEmail, userPassword, userBirthdate, hasAcceptedTerms);

        
        registrationForm.reset();
    });

    function getAge(birthDateString) {
        const currentDate = new Date();
        const birthDate = new Date(birthDateString);
        let age = currentDate.getFullYear() - birthDate.getFullYear();
        const monthOffset = currentDate.getMonth() - birthDate.getMonth();
        if (monthOffset < 0 || (monthOffset === 0 && currentDate.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function storeUser(fullName, email, password, dob, acceptedTerms) {
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

    function append(fullName, email, password, dob, acceptedTerms) {
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
