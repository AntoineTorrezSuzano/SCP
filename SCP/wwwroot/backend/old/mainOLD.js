import shelly from "./shelly_script_model.js";


document.addEventListener("DOMContentLoaded", () => {
    const UI = {
        refreshBtn: document.getElementById("refresh"),
        outputStatusSpan: document.getElementById("output_status"),
        toggleBtn: document.getElementById("toggle"),
        timerDisplay: document.getElementById("timer_display"),
        timerStartBtn: document.getElementById("timer_start"),
        timerStopBtn: document.getElementById("timer_stop"),
        timerSetInput: document.getElementById("timer_set"),
        refreshTimeLeft: document.getElementById("refresh_time_left"),
    };

    //////////
    let toggleTimer = { duration: 5, remaining: null }
    const refreshTimer = { duration: 5, remaining: null }
    let toggleInterval = null;
    let refreshInterval = null;


    function initializePanel() {
        refreshStatus();
        initializeToggleTimerPanel();
        startRefreshInterval();
    }


    async function refreshStatus() {
        const output = await shelly.getOutputStatus();
        updateOutputStatus(output);
        updateToggleButton(output);
    }


    function startToggleTimer() {
        UI.timerStartBtn.disabled = true;
        UI.timerStopBtn.disabled = false;

        getSetTimerValue();

        toggleTimer.remaining = toggleTimer.duration;
        UI.timerDisplay.textContent = toggleTimer.remaining;
        setTimeout(toggleInterval = setInterval(updateToggleTimer, 1000), 1000);
    }



    function stopToggleTimer() {
        UI.timerStopBtn.disabled = true;
        UI.timerStartBtn.disabled = false;
        clearInterval(toggleInterval);
        initializeToggleTimerPanel();
    }

    function getSetTimerValue() {
        let rawValue = UI.timerSetInput.value;
        console.log(rawValue);
    }

    function updateToggleTimer() {
        toggleTimer.remaining--;
        UI.timerDisplay.textContent = toggleTimer.remaining;
        if (toggleTimer.remaining === 0) {
            clearInterval(toggleInterval);
            shelly.toggleRelay();
            refreshStatus();
            UI.timerStartBtn.disabled = false;
        }
    }
    function initializeToggleTimerPanel() {
        UI.timerDisplay.textContent = 0;
        UI.timerStopBtn.disabled = true;
    }

    function startRefreshInterval() {
        refreshTimer.remaining = refreshTimer.duration;
        UI.refreshTimeLeft.textContent = refreshTimer.remaining;
        refreshInterval = setInterval(updateRefreshTimer, 1000);
    }

    function updateRefreshTimer() {
        refreshTimer.remaining--;
        UI.refreshTimeLeft.textContent = refreshTimer.remaining;
        if (refreshTimer.remaining <= 0) {
            refreshTimer.remaining = refreshTimer.duration + 1;
            refreshStatus();
        }

    }

    function handleToggle() {
        shelly.toggleRelay();
        refreshStatus();
    }
    function updateToggleButton(status) {
        if (status === true) {
            UI.toggleBtn.style.backgroundColor = "blue";
        } else if (status === false) {
            UI.toggleBtn.style.backgroundColor = "red";
        } else {
            UI.toggleBtn.style.backgroundColor = "grey";
        }
    }
    function updateOutputStatus(status) {
        if (status == true) {
            UI.outputStatusSpan.style.color = "#005eff";
            UI.outputStatusSpan.textContent = "ON";
        } else if (status == false) {
            UI.outputStatusSpan.style.color = "#c41818";
            UI.outputStatusSpan.textContent = "OFF";
        } else {
            UI.outputStatusSpan.style.color = " #e80000";
            UI.outputStatusSpan.textContent = "ERROR";
        }
    }


    UI.refreshBtn.addEventListener("click", refreshStatus);
    UI.toggleBtn.addEventListener("click", handleToggle);
    UI.timerStartBtn.addEventListener("click", startToggleTimer);
    UI.timerStopBtn.addEventListener("click", stopToggleTimer)


    initializePanel();





});
