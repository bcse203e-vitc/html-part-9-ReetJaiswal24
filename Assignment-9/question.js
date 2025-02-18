document.addEventListener('DOMContentLoaded', function() {
  const bookBtns = document.querySelectorAll('.book-btn');
  const modal = document.getElementById('bookingModal');
  const closeModal = document.querySelector('.close');
  const appointmentForm = document.getElementById('appointmentForm');
  const appointmentsList = document.getElementById('appointmentsList');
    bookBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const service = btn.getAttribute('data-service');
      document.getElementById('service').value = service;
      modal.style.display = 'block';
    });
  });
  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  appointmentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const datetime = new Date(document.getElementById('datetime').value);
    const termsChecked = document.getElementById('terms').checked;

    let valid = true;

    if (name.trim() === '') valid = false;
    if (!/\S+@\S+\.\S+/.test(email)) valid = false;
    if (phone.length !== 10 || isNaN(phone)) valid = false;
    if (datetime < new Date()) valid = false;
    if (!termsChecked) valid = false;

    if (!valid) {
      alert("Please correct the form errors.");
      return;
    }

    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointment = {
      name,
      email,
      phone,
      service,
      datetime,
      status: 'Pending'
    };
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    modal.style.display = 'none';
    appointmentForm.reset();
    
    displayAppointments();
    showConfirmation(appointment);
  });

  function displayAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointmentsList.innerHTML = '<h2>Booked Appointments</h2>';
    appointments.forEach(app => {
      const appointmentDiv = document.createElement('div');
      appointmentDiv.innerHTML = `
        <p><strong>${app.name}</strong> - ${app.service} on ${new Date(app.datetime).toLocaleString()} (Status: ${app.status})</p>
      `;
      appointmentsList.appendChild(appointmentDiv);
    });
  }

  function showConfirmation(appointment) {
    alert(`Thank you, ${appointment.name}! Your appointment for ${appointment.service} on ${new Date(appointment.datetime).toLocaleString()} is confirmed.`);
  }
  displayAppointments();
});

