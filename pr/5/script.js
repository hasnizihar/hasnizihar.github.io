
// Fullscreen toggle function
function toggleFullscreen() {
    const elem = document.documentElement;
    const fullscreenBtn = document.getElementById('fullscreen-btn-img');

    if (!document.fullscreenElement) {
        elem.requestFullscreen();
        fullscreenBtn.src = 'exit-full-screen.png'; // Change to b.png when entering fullscreen
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullscreenBtn.src = "full-screen.png"; // Change to a.png when exiting fullscreen
        }
    }
}

// Function to update clock and date
function updateClock() {
    const clock = document.getElementById('clock');
    const dateDiv = document.getElementById('date');

    const now = new Date();

    // Time calculation
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hour is 0, set to 12

    // Add leading zero if minutes or seconds are less than 10
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    // Format the time
    const timeString = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
    clock.textContent = timeString;

    // Date calculation
    const day = now.getDate();
    const month = now.getMonth() + 1; // Months are 0-indexed
    const year = now.getFullYear();

    // Format the date
    const dateString = month + '/' + day + '/' + year;
    dateDiv.textContent = dateString;
}

// Initialize clock and date and update every second
setInterval(updateClock, 1000);
updateClock(); // Call immediately to avoid delay
