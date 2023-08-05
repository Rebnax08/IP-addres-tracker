//output message

const ipAddres = document.getElementById ('ipaddres');
const locationip = document.getElementById ('locationip');
const timezone = document.getElementById ('timezone');
const isp = document.getElementById ('isp');

//input message

const inputip = document.getElementById ('inputip');
const btnip = document.getElementById ('btnip');

const apiKey = 'at_76rhZFZFAcvCb0pEllzG4I7aaFVCE';

//GeoApi

const map = L.map('map').fitWorld();

const searchip = async(ip) => {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;
    try{
        const res = await geoapi(url);
        ipAddres.innerText = res.ip;
        locationip.innerText = res.location.city;
        timezone.innerText = res.location.timezone;
        isp.innerText = res.isp; 
        updatemap(res);
    } 
    catch (err) {
        console.log(err);
    }
}

const geoapi = async (url) => {
    try {
        const datageo = await fetch(url);
        const resultdata = await datageo.json();
        return resultdata;
    }
    catch (err) {
        console.log(err);
    }
}

//Mapa

const updatemap = (res) => {
    map.setView([res.location.lat, res.location.lng],13);
    map.eachLayer(function (Layer) {
    map.removeLayer(Layer);
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
const marker = L.marker([res.location.lat, res.location.lng]).addTo(map);
}

btnip.addEventListener('click', () => searchip(inputip.value));
