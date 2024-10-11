document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tableBody = document.querySelector('#studentTable tbody');
    const MAX_STUDENTS = 10; // Maximum number of students

    // Fetch students from localStorage, or create an empty array if none exist
    const students = JSON.parse(localStorage.getItem('students')) || [];

    // Function to render student table
    function renderTable() {
        tableBody.innerHTML = ''; // Clear current table body

        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})">Reset</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Function to validate email
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to validate contact number
    function isValidContact(contact) {
        const contactPattern = /^[0-9]{10}$/;  // Only 10 digit numbers
        return contactPattern.test(contact);
    }

    // Add new student with validation and remove oldest if limit exceeds
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const id = document.getElementById('id').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();

        // Basic validations for empty fields
        if (!name || !id || !email || !contact) {
            alert('All fields are required!');
            return;
        }

        // Validate email format
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        // Validate contact number (must be exactly 10 digits)
        if (!isValidContact(contact)) {
            alert('Contact number must be exactly 10 digits!');
            return;
        }

        // Check if the students list exceeds 10
        if (students.length >= MAX_STUDENTS) {
            // Remove the first (oldest) student
            students.shift();
        }

        // Add new student to the list
        students.push({ name, id, email, contact });
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
        form.reset();  // Clear form after adding
    });

    // Delete student by index
    window.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    // Edit student by index
    window.editStudent = (index) => {
        const student = students[index];

        // Populate form with the current student details
        document.getElementById('name').value = student.name;
        document.getElementById('id').value = student.id;
        document.getElementById('email').value = student.email;
        document.getElementById('contact').value = student.contact;

        // Remove the student being edited
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    // Render initial table from localStorage
    renderTable();
});


