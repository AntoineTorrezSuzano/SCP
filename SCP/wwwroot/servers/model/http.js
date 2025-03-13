function getUrl() {
    return "http://157.26.121.93"; ///IP du Shelly pro 1
}

async function toggleRelay() {
    try {
        const response = await fetch(getUrl() + "/relay/0?turn=toggle");

        const data = await response.text();
        console.log("Response from shelly:", data);
    } catch (error) {
        console.error("error toggling relay: ", error);
    }
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


module.exports = {
    toggleRelay,
    getOutputStatus
};