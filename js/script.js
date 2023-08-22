// Store user input and generate route
const groceryList = [];

document.getElementById("addButton").addEventListener("click", () => {
    const product = document.getElementById("product").value;
    const aisle = document.getElementById("aisle").value;
    if (product && aisle) {
        groceryList.push({ item: product, aisle: aisle });
        document.getElementById("product").value = "";
        document.getElementById("aisle").value = "";
        updateRouteList();
    }
});

document.getElementById("generateRouteButton").addEventListener("click", generateRoute);

function updateRouteList() {
    const routeList = document.getElementById("routeList");
    routeList.innerHTML = "";
    groceryList.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${index + 1}. ${item.aisle} - ${item.item}`;
        routeList.appendChild(listItem);
    });
}

function generateRoute() {
    const sortedList = groceryList.sort((a, b) =>
        b.aisle[0].localeCompare(a.aisle[0]) || parseInt(b.aisle.slice(1)) - parseInt(a.aisle.slice(1))
    );
    sortedList.push({ item: "Checkout", aisle: "Checkout" });
    updateRouteList();
}

document.getElementById("clearRouteButton").addEventListener("click", clearRoute);

function clearRoute() {
    groceryList.length = 0;
    updateRouteList();
}

document.getElementById("sendSMSButton").addEventListener("click", sendSMS);

function sendSMS() {
    const phoneNumber = prompt("Enter the phone number to send the shopping route to:");
    if (phoneNumber) {
        const routeText = generateRouteText(); // Generate the route text
        const smsLink = `sms:${phoneNumber}&body=${encodeURIComponent(routeText)}`;
        window.location.href = smsLink;
    }
}

function generateRouteText() {
    let routeText = "Shopping Route:\n";
    groceryList.forEach((item, index) => {
        routeText += `${index + 1}. ${item.aisle} - ${item.item}\n`;
    });
    routeText += "Checkout. Thank you for shopping! :)";
    return routeText;
}

document.getElementById("shareButton").addEventListener("click", sharePage);

function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: "Grocery Shopping Route",
            text: "Check out my shopping route!",
            url: window.location.href
        })
        .then(() => {
            console.log("Shared successfully");
        })
        .catch(error => {
            console.error("Error sharing:", error);
        });
    } else {
        console.log("Web Share API not supported on this device.");
    }
}

document.getElementById("shareRouteButton").addEventListener("click", shareRoute);

function shareRoute() {
    const routeText = generateRouteText(); // Generate the route text
    if (navigator.share) {
        navigator.share({
            text: routeText,
            title: "Shopping Route",
        })
        .then(() => {
            console.log("Route shared successfully.");
        })
        .catch((error) => {
            console.error("Error sharing route:", error);
        });
    } else {
        alert("Sharing is not supported on this browser/device.");
    }
}


