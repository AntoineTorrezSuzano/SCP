// Clendar Handler
const jsonFilePath = "../assets/json/data.json";
async function getCalendarAsJson() {
    const serverIP = "https://localhost:7264/Calendar";
    const response = await fetch(serverIP);
    let data = await response.json();
    data = data["value"];
    return data;
}

async function getNextEvent() {
    const serverIP = "https://localhost:7264/Calendar/nextEvent";
    const response = await fetch(serverIP);
    let data = await response.json();
    data = data[0];
    return data;
}

async function getNextEventSubject() {
    const link = "https://localhost:7264/Calendar/nextEvent/subject";
    const response = await fetch(link);
    const data = await response.json();
    return data.subject;
}
async function getTimeLeftUntilNextEvent() {
    const serverIP = "https://localhost:7264/Calendar/nextEvent/TimeLeftUntilNextEvent/HMS";
    const response = await fetch(serverIP);
    let data = await response.json();
    return data.timeLeft;
}
async function getTimeLeftUntilNextEventEnd() {
    {
        const serverIP = "https://localhost:7264/Calendar/nextEvent/TimeLeftUntilNextEventEnd/HMS";
        const response = await fetch(serverIP);
        let data = await response.json();
        return data.timeLeft;
    }
}
async function getNextEventStartDate() {
    const serverIP = "https://localhost:7264/Calendar/nextEvent/beginning/YMDHM";
    const response = await fetch(serverIP);
    let data = await response.json();
    return data.beginning;
}
async function getNextEventEndDate() {
    const serverIP = "https://localhost:7264/Calendar/nextEvent/ending/YMDHM";
    const response = await fetch(serverIP);
    let data = await response.json();
    return data.end;
}



const calendar = {
    getCalendarAsJson,
    getNextEvent,
    getNextEventSubject,
    getNextEventStartDate,
    getTimeLeftUntilNextEvent,
    getNextEventEndDate,
    getTimeLeftUntilNextEventEnd,
}

export default calendar;


