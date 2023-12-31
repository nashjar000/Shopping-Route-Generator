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

document.getElementById("shareRouteButton").addEventListener("click", shareRoute);

function shareRoute() {
    const routeText = generateRouteText(); // Generate the route text
    if (navigator.share) {
        navigator.share({
            title: "Shopping Route",
            text: routeText,
        })
        .then(() => {
            console.log("Route shared successfully.");
        })
        .catch((error) => {
            console.error("Error sharing route:", error);
        });
    } else {
        copyToClipboard(routeText);
        console.log("Route copied to clipboard:", routeText);
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

        document.getElementById("addButton").addEventListener("click", () => {
            const product = document.getElementById("product").value;
            const aisle = document.getElementById("aisle").value;
            if (product && aisle) {
                groceryList.push({ item: product, aisle: aisle, checked: false });
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
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.checked = item.checked;
                checkbox.addEventListener("change", () => {
                    item.checked = checkbox.checked;
                });
                listItem.appendChild(checkbox);
                listItem.appendChild(document.createTextNode(`${index + 1}. ${item.aisle} - ${item.item}`));
                routeList.appendChild(listItem);
            });
        }

        function generateRoute() {
            const sortedList = groceryList.sort((a, b) =>
                b.aisle[0].localeCompare(a.aisle[0]) || parseInt(b.aisle.slice(1)) - parseInt(a.aisle.slice(1))
            );
            sortedList.push({ item: "Checkout", aisle: "Checkout", checked: false });
            updateRouteList();
        }

        document.getElementById("clearRouteButton").addEventListener("click", clearRoute);

        function clearRoute() {
            groceryList.length = 0;
            updateRouteList();
        }

        document.getElementById("shareRouteButton").addEventListener("click", shareRoute);

        function shareRoute() {
            const routeText = generateRouteText(); // Generate the route text
            if (navigator.share) {
                navigator.share({
                    title: "Shopping Route",
                    text: routeText,
                })
                .then(() => {
                    console.log("Route shared successfully.");
                })
                .catch((error) => {
                    console.error("Error sharing route:", error);
                });
            } else {
                copyToClipboard(routeText);
                console.log("Route copied to clipboard:", routeText);
            }
        }

        function generateRouteText() {
            let routeText = "Shopping Route:\n";
            groceryList.forEach((item, index) => {
                if (item.checked) {
                    routeText += `[X] ${index + 1}. ${item.aisle} - ${item.item}\n`;
                } else {
                    routeText += `[ ] ${index + 1}. ${item.aisle} - ${item.item}\n`;
                }
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
