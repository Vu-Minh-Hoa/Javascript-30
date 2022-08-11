let countDown = 0;
const displayTime = document.querySelector('.display__time-left');
const displayEndTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    clearInterval(countDown);

    let currentTime = Date.now();
    let then = currentTime + seconds * 1000;

    displayTimeLeft(seconds);
    displayTimeEnd(then);
    countDown = setInterval( () => {
        const timeLeft = Math.round((then - Date.now()) / 1000);

        if(timeLeft < 0) {
            clearInterval(countDown);
            return;
        }

        displayTimeLeft(timeLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.trunc(seconds / 60);
    const hours = Math.trunc(minutes / 60);
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;
    const display = 
            `${minutes >= 60 ? hours : '00'}:${
                remainingMinutes < 10 ? '0' : ''}${
                    remainingMinutes}:${
                        remainingSeconds < 10 ? '0' : ''}${
                remainingSeconds}`; 
    document.title = display;
    displayTime.textContent = display;
};

function displayTimeEnd(timeStamp) {
    const end = new Date(timeStamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    const display = 
            `Be back at ${hours}:${minutes < 10 ? '0' : ''}${
                minutes}`; 
    displayEndTime.textContent = display;
}

buttons.forEach(button => {
    button.addEventListener('click', startTimer);
});

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
})
