

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function getUrl() {

    return "http://127.0.0.1:3000";
}
async function toggleRelay() {
    console.log("Toggled !")
    const url = getUrl() + "/relay/0?turn=toggle";
    await fetch(url);
}
async function getStatus() {
    const url = getUrl() + "/rpc/Shelly.GetStatus";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
async function getOutputStatus() {
    const data = await getStatus();
    return data["switch:0"]["output"];
}


const shelly = {
    sleep,
    getUrl,
    toggleRelay,
    getStatus,
    getOutputStatus,
}





export default shelly;

