function getUrl() {
    return "https://localhost:7264"; ///IP du proxy
}
async function toggleRelay() {
    console.log("Toggled !")
    const url = getUrl() + "/Relay/Toggle";
    await fetch(url);
}
async function turnOnRelay() {
    console.log("Turned on !")
    const url = getUrl() + "/Relay/TurnOn";
    await fetch(url);
}
async function turnOffRelay() {
    console.log("Turned off !")
    const url = getUrl() + "/Relay/TurnOff";
    await fetch(url);
}
async function getOutputStatus() {
    const url = getUrl() + "/Relay/getStatus";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function setTimer(seconds) {
    const url = getUrl() + "/Relay/Timer";
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ seconds })
    });
}


const shelly = {
    getUrl,
    toggleRelay,
    getOutputStatus,
    turnOnRelay,
    turnOffRelay,
    setTimer,
}

export default shelly;

