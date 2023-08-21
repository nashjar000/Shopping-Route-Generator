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
