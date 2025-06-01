// Sample tutors data
const tutors = [
    { id: 1, name: "Dr. Sarah Johnson", specialties: ["Mathematics", "Physics"] },
    { id: 2, name: "Prof. Michael Chen", specialties: ["Computer Science", "Programming"] },
    { id: 3, name: "Ms. Emily Rodriguez", specialties: ["English", "Literature"] },
    { id: 4, name: "Dr. David Kim", specialties: ["Chemistry", "Biology"] },
    { id: 5, name: "Prof. Maria Garcia", specialties: ["Spanish", "Portuguese"] }
];

// Available time slots (9 AM to 5 PM)
const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

let currentViewMonth;
let currentViewYear;

function showTutoringBookingForm() {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    
    const currentDate = new Date();
    currentViewMonth = currentDate.getMonth();
    currentViewYear = currentDate.getFullYear();

    modal.innerHTML = `
        <div class="booking-content">
            <span class="close-button">&times;</span>
            <h2>Schedule Online Tutoring Session</h2>
            
            <div class="booking-form">
                <div class="form-group">
                    <label for="tutor-select">Select Tutor:</label>
                    <select id="tutor-select" required>
                        <option value="">Choose a tutor</option>
                        ${tutors.map(tutor => `
                            <option value="${tutor.id}">${tutor.name} - ${tutor.specialties.join(', ')}</option>
                        `).join('')}
                    </select>
                </div>

                <div class="calendar-container">
                    <div class="calendar-header">
                        <button id="prev-month">&lt;</button>
                        <h3 id="calendar-month"></h3>
                        <button id="next-month">&gt;</button>
                    </div>
                    <div class="calendar-grid">
                        <div class="weekday">Sun</div>
                        <div class="weekday">Mon</div>
                        <div class="weekday">Tue</div>
                        <div class="weekday">Wed</div>
                        <div class="weekday">Thu</div>
                        <div class="weekday">Fri</div>
                        <div class="weekday">Sat</div>
                    </div>
                    <div id="calendar-days" class="calendar-days"></div>
                </div>

                <div class="form-group">
                    <label for="time-select">Select Time:</label>
                    <select id="time-select" required>
                        <option value="">Choose a time</option>
                        ${timeSlots.map(time => `
                            <option value="${time}">${time}</option>
                        `).join('')}
                    </select>
                    <span class="session-duration-note">Note: Each tutoring session is 30 minutes long</span>
                </div>

                <div class="form-group">
                    <label for="notes">Session Notes:</label>
                    <textarea id="notes" placeholder="Please describe what you'd like to discuss in the tutoring session" rows="4"></textarea>
                </div>

                <button type="submit" class="btn-primary" onclick="submitBooking()">Book Session</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close button functionality
    const closeButton = modal.querySelector('.close-button');
    closeButton.onclick = () => modal.remove();

    // Month navigation buttons
    const prevMonthBtn = modal.querySelector('#prev-month');
    const nextMonthBtn = modal.querySelector('#next-month');
    
    prevMonthBtn.onclick = () => navigateMonth(-1);
    nextMonthBtn.onclick = () => navigateMonth(1);

    // Initialize calendar
    initializeCalendar(currentViewMonth, currentViewYear);
}

function navigateMonth(direction) {
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    
    let newMonth = currentViewMonth + direction;
    let newYear = currentViewYear;
    
    if (newMonth > 11) {
        newMonth = 0;
        newYear++;
    } else if (newMonth < 0) {
        newMonth = 11;
        newYear--;
    }
    
    const newDate = new Date(newYear, newMonth, 1);
    
    // Prevent navigation to past months or more than 3 months ahead
    if (newDate < new Date(currentDate.getFullYear(), currentDate.getMonth(), 1) ||
        newDate > maxDate) {
        return;
    }
    
    currentViewMonth = newMonth;
    currentViewYear = newYear;
    initializeCalendar(currentViewMonth, currentViewYear);
}

function initializeCalendar(month, year) {
    const calendarDays = document.getElementById('calendar-days');
    const monthDisplay = document.getElementById('calendar-month');
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    monthDisplay.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;
    
    // Clear previous calendar
    calendarDays.innerHTML = '';
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        const currentDate = new Date(year, month, day);
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        
        // Disable weekends, past dates, and dates more than 3 months ahead
        const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
        const isPast = currentDate < today.setHours(0, 0, 0, 0);
        const isFuture = currentDate > maxDate;
        
        if (isWeekend || isPast || isFuture) {
            dayElement.className += ' disabled';
        } else {
            dayElement.className += ' selectable';
            dayElement.onclick = () => selectDate(currentDate);
        }
        
        dayElement.textContent = day;
        calendarDays.appendChild(dayElement);
    }
}

function selectDate(date) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selection to clicked date
    const selectedDay = Array.from(document.querySelectorAll('.calendar-day')).find(
        el => el.textContent === date.getDate().toString()
    );
    if (selectedDay) {
        selectedDay.classList.add('selected');
    }
}

function submitBooking() {
    const tutorId = document.getElementById('tutor-select').value;
    const timeSlot = document.getElementById('time-select').value;
    const notes = document.getElementById('notes').value;
    const selectedDate = document.querySelector('.calendar-day.selected');

    if (!tutorId || !timeSlot || !selectedDate) {
        alert('Please fill in all required fields');
        return;
    }

    // Here you would typically send this data to your backend
    const bookingData = {
        tutorId,
        date: selectedDate.textContent,
        time: timeSlot,
        notes
    };

    console.log('Booking submitted:', bookingData);
    alert('Booking submitted successfully!');
    document.querySelector('.booking-modal').remove();
} 