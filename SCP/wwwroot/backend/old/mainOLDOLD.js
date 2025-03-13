import shelly from "./shelly_script.js";


document.addEventListener("DOMContentLoaded", () => {
    const refresh_btn = document.getElementById("refresh");
    const output_status_span = document.getElementById("output_status");
    const toggle_btn = document.getElementById("toggle");
    const timer_dsp = document.getElementById("timer_display");
    const timer_start_btn = document.getElementById("timer_start");
    const timer_stop_btn = document.getElementById("timer_stop");
    const timer_set_input = document.getElementById("timer_set");
    const refresh_time_left = document.getElementById("refresh_time_left")
    //////////
    let timer = { time: 5, left: null }
    let refreshTimer = { time: 2, left: null }
    let timerInterval = null;

    initializePanel();


    refresh_btn.addEventListener("click", refresh);
    toggle_btn.addEventListener("click", toggle);
    timer_start_btn.addEventListener("click", startTimer);
    timer_stop_btn.addEventListener("click", stopTimer)

    function initializePanel() {
        refresh();
        initializeTimerPanel();
        updateRefreshPanel();
    }
    function startTimer() {
        timer_start_btn.disabled = true;
        timer_stop_btn.disabled = false;
        timer.left = timer.time;
        timer_dsp.textContent = timer.left;
        setTimeout(timerInterval = setInterval(updateTimerPanel, 1000), 1000);
    }
    function stopTimer() {
        timer_stop_btn.disabled = true;
        timer_start_btn.disabled = false;
        clearInterval(timerInterval);
        initializeTimerPanel();
    }
    function updateRefreshPanel() {
        refresh_time_left.textContent = refreshTimer.left;
        refreshTimer.left--;
        if (refreshTimer.left <= -1) {
            refreshTimer.left = refreshTimer.time;
            refresh();
        }
        setTimeout(updateRefreshPanel, 1000);
    }
    function updateTimerPanel() {
        timer.left--;
        timer_dsp.textContent = timer.left;
        if (timer.left === 0) {
            clearInterval(timerInterval);
            toggle();
            timer_start_btn.disabled = false;
        }
    }
    function initializeTimerPanel() {
        timer_dsp.textContent = 0;
        timer_stop_btn.disabled = true;
    }
    function toggle() {
        shelly.toggleRelay();
        refresh();
    }
    function refresh() {
        refreshOutputStatus();
        refreshToggleButton();
    }
    function refreshOutputStatus() {
        shelly.getOutputStatus().then(output => {
            updateOutputStatus(output);
        })
    }
    function refreshToggleButton() {
        shelly.getOutputStatus().then(output => {
            updateToggleButton(output);
        });
    }
    function updateToggleButton(status) {
        if (status == true) {
            toggle_btn.style.backgroundColor = "blue";
        } else if (status == false) {
            toggle_btn.style.backgroundColor = "red";
        } else {
            toggle_btn.style.backgroundColor = "grey";
        }
    }
    function updateOutputStatus(status) {
        if (status == true) {
            output_status_span.style.color = "#005eff";
            output_status_span.textContent = "ON";
        } else if (status == false) {
            output_status_span.style.color = "#c41818";
            output_status_span.textContent = "OFF";
        } else {
            output_status_span.style.color = " #e80000";
            output_status_span.textContent = "ERROR";
        }
    }
});
