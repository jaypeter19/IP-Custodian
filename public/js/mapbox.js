if (!window.MAPBOX_ACCESS_TOKEN) {
    throw new Error('Missing Mapbox access token. Create public/js/config.js locally or generate it in the Pages deploy workflow.');
}

mapboxgl.accessToken = window.MAPBOX_ACCESS_TOKEN;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jptelles19/cmnz4m2lt008r01qu2a5095j9',
    center: [-82, 10],
    zoom: 2
});

fetch('public/json/geojson.json')
    .then((response) => response.json())
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
    });
