const form = document.getElementById("user-form");
const table = document.getElementById("user-table").getElementsByTagName('tbody')[0];
document.addEventListener('DOMContentLoaded', () => {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(entry => addEntryToTable(entry));
});
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert('You must be between 18 and 55 years old to register.');
        return;
    }
    const entry = { name, email, password, dob, terms };
    addEntryToTable(entry);
    saveEntryToLocalStorage(entry);
    form.reset();
});
function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
function addEntryToTable(entry) {
    const row = table.insertRow();
    Object.values(entry).forEach(value => {
        const cell = row.insertCell();
        cell.textContent = value;
    });
}
function saveEntryToLocalStorage(entry) {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
}
