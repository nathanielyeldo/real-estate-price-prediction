function getBathValue() {
    const uiBathrooms = document.getElementsByName("uiBathrooms");
    for (let i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    const uiBHK = document.getElementsByName("uiBHK");
    for (let i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(i) + 1;
        }
    }
    return -1; // Invalid Value
}

async function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");

    const sqft = document.getElementById("uiSqft").value;
    const bhk = getBHKValue();
    const bathrooms = getBathValue();
    const location = document.getElementById("uiLocations").value;
    const estPrice = document.getElementById("uiEstimatedPrice");

    try {
        const response = await fetch('/predict_home_price', {
            method: 'POST',
            body: new URLSearchParams({
                total_sqft: parseFloat(sqft),
                bhk: bhk,
                bath: bathrooms,
                location: location
            })
        });
        const data = await response.json();
        console.log(data.estimated_price);
        estPrice.innerHTML = `<h2>${data.estimated_price} Lakh</h2>`;
    } catch (error) {
        console.error("Error estimating price:", error);
        estPrice.innerHTML = "<h2>Error estimating price</h2>";
    }
}

async function onPageLoad() {
    console.log("document loaded");
    try {
        const response = await fetch('/get_location_names');
        const data = await response.json();

        if (data) {
            const locations = data.locations;
            const uiLocations = document.getElementById("uiLocations");
            uiLocations.innerHTML = ""; // clear previous options
            locations.forEach(loc => {
                const opt = new Option(loc, loc);
                uiLocations.appendChild(opt);
            });
        }
    } catch (error) {
        console.error("Error fetching location names:", error);
    }
}

window.onload = onPageLoad;
