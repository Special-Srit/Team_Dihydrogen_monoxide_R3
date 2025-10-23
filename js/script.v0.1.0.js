const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwV_2L5nEDzJ2egFB82LLSMhRhYqA8DtGakwiu_V-A16NtSwxD9fl3w8-rtVzK-1t0s0w/exec";

const form = document.getElementById('applicationForm');

const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');

function openApplicationForm() {
    document.getElementById('applicationModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeApplicationForm() {
    document.getElementById('applicationModal').classList.remove('show');
    document.body.style.overflow = '';
}

function closeModalOnOutsideClick(event) {
    if (event.target.id === 'applicationModal') {
        closeApplicationForm();
    }
}
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type} show`;
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 5000);
}

document.getElementById('joinBtn').addEventListener('click', openApplicationForm);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const messageDiv = document.getElementById('message');

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    const formData = {
        applicant: document.getElementById('applicant').value,
        team: document.getElementById('team_form').value,
        role: document.getElementById('role').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        reason: document.getElementById('reason').value
    };

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        showMessage('Application submitted successfully! We will review your application and contact you soon.', 'success');
        form.reset();

    } catch (error) {
        showMessage('There was an error submitting your application. Please try again.', 'error');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
    }
    // Close modal with Escape key
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeApplicationForm();
        }
    })
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            const navCollapse = document.getElementById('navMain');
            if (navCollapse.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navCollapse)?.hide();
            }
        }
    });
});