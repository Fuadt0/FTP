document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    // Load data from local storage
    loadData();

    userForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = parseInt(document.getElementById('age').value);
        
        if (age >= 18) {
            addUser(firstName, lastName, age);
            saveData();
        } else {
            alert("User must be 18 years or older.");
        }

        userForm.reset();
    });

    function addUser(firstName, lastName, age) {
        const newRow = userTable.insertRow();
        
        const firstNameCell = newRow.insertCell(0);
        const lastNameCell = newRow.insertCell(1);
        const ageCell = newRow.insertCell(2);
        
        firstNameCell.textContent = firstName;
        lastNameCell.textContent = lastName;
        ageCell.textContent = age;
    }

    function saveData() {
        const users = [];
        for (let i = 0; i < userTable.rows.length; i++) {
            const row = userTable.rows[i];
            const user = {
                firstName: row.cells[0].textContent,
                lastName: row.cells[1].textContent,
                age: row.cells[2].textContent
            };
            users.push(user);
        }
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadData() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.forEach(user => addUser(user.firstName, user.lastName, user.age));
    }
});
