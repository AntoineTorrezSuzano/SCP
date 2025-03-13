import shelly from "./shelly_script_model.js";
import calendar from "./calendar.js";

document.addEventListener("DOMContentLoaded", () => {
    const UI = {
        outputStatusSpan: document.getElementById("output_status"),
        toggleBtn: document.getElementById("buttonOn"),
        offLed: document.getElementById("offLed"),
        onLed: document.getElementById("onLed"),
        buttonTurnOn: document.getElementById("buttonTurnOn"),
        buttonTurnOff: document.getElementById("buttonTurnOff"),
        nextEventSubject: document.getElementById("calendarNextEventSubject"),
        nextEventStartDate: document.getElementById("calendarNextEventStartDate"),
        nextEventEndDate: document.getElementById("calendarNextEventEndDate"),
        nextEventTimeLeft: document.getElementById("calendarNextEventTimesLeft"),
        nextEventTimeLeftUntilEnd: document.getElementById("calendarNextEventTimesLeftUntilEnd"),
        timerStartButton: document.getElementById("timer_start"),
        timerStopButton: document.getElementById("timer_stop"),
        timerInput: document.getElementById("timer_set"),
    };



    function initializePanel() {
        refreshStatus();

    }

    async function refreshStatus() {
        shelly.getOutputStatus().then(output => {
            updateToggleButton(output);
        });
        await refreshCalendarContainer();

    }


    function handleToggle() {
        UI.toggleBtn.disabled = true;
        shelly.toggleRelay().then(_ => {
            refreshStatus();
        })
    }
    function turnOnHandling() {
        shelly.turnOnRelay().then(_ => {
            refreshStatus();
        })
    }
    function turnOffHandling() {
        shelly.turnOffRelay().then(_ => {
            refreshStatus();
        })
    }

    function startTimer() {
        const seconds = UI.timerInput.value;
        shelly.setTimer(seconds);
    }


    function updateToggleButton(status) {
        if (status === true) {
            UI.onLed.style.backgroundColor = "blue";
            UI.offLed.style.backgroundColor = "white";
            console.log("STATUS IS TRUE, REFRESH FINISHED")
        } else if (status === false) {
            UI.onLed.style.backgroundColor = "white";
            UI.offLed.style.backgroundColor = "red";
            console.log("STATUS IS FALSE, REFRESH FINISHED")
        } else {
            UI.onLed.style.backgroundColor = "grey";
            UI.offLed.style.backgroundColor = "grey";
            console.log("STATUS IS DEAD, REFRESH FINISHED")
        }
        UI.toggleBtn.disabled = false;
    }
    async function refreshCalendarContainer() {
        calendar.getNextEventSubject().then(subject => {
            UI.nextEventSubject.textContent = "Subject: " + subject;
        });
        calendar.getNextEventStartDate().then(startDate => {
            UI.nextEventStartDate.textContent = "Start date: " + startDate;

        })
        calendar.getNextEventEndDate().then(endDate => {
            UI.nextEventEndDate.textContent = "End date: " + endDate;

        })
        calendar.getTimeLeftUntilNextEvent().then(timeLeft => {
            UI.nextEventTimeLeft.textContent = "Times Left until start: " + timeLeft;
        });
        calendar.getTimeLeftUntilNextEventEnd().then(timeLeft => {
            UI.nextEventTimeLeftUntilEnd.textContent = "Times Left until end: " + timeLeft;
        });
    }



    UI.toggleBtn.addEventListener("click", handleToggle);
    UI.buttonTurnOn.addEventListener("click", turnOnHandling);
    UI.buttonTurnOff.addEventListener("click", turnOffHandling);
    UI.timerStartButton.addEventListener("click", startTimer);


    initializePanel();
    setInterval(refreshStatus, 1000);

});
