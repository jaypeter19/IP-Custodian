if (!window.MAPBOX_ACCESS_TOKEN) {
    throw new Error('Missing Mapbox access token. Create public/js/config.js locally or generate it in the Pages deploy workflow.');
}

mapboxgl.accessToken = window.MAPBOX_ACCESS_TOKEN;

const mapboxScriptUrl = new URL(document.currentScript.src);
const geojsonUrl = new URL('../json/geojson.json', mapboxScriptUrl);
const isMobile = window.matchMedia('(max-width: 575px)').matches;


const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jptelles19/cmnz4m2lt008r01qu2a5095j9',
    center: isMobile ? [-62, 12] : [-60, 12],
    zoom: isMobile ? 1.2 : 2
});

fetch(geojsonUrl)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to load map data: ${response.status}`);
        }

        return response.json();
    })
    .then((geojson) => {
        for (const feature of geojson.features) {
            const el = document.createElement('div');
            el.className = 'marker';

            new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 })
                        .setHTML(
                            `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                        )
                )
                .addTo(map);
        }
    })
    .catch((error) => console.error(error));
