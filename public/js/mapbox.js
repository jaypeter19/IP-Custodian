if (!window.MAPBOX_ACCESS_TOKEN) {
    throw new Error('Missing Mapbox access token. Create public/js/config.js locally or generate it in the Pages deploy workflow.');
}

mapboxgl.accessToken = window.MAPBOX_ACCESS_TOKEN;

const mapboxScriptUrl = new URL(document.currentScript.src);
const geojsonUrl = new URL('../json/geojson.json', mapboxScriptUrl);
const isMobile = window.matchMedia('(max-width: 575px)').matches;

const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
}[character]));

const getPopupImageUrl = (properties) => {
    const imageUrl = (
        properties.imageUrl
        || properties.image
        || properties.backgroundImage
        || properties.background_image
        || ''
    );

    return imageUrl
        ? new URL(imageUrl, mapboxScriptUrl).href
        : '';
};

const getPopupHtml = (properties) => {
    const title = escapeHtml(properties.title);
    const description = escapeHtml(properties.description).replace(/[.,;:]+$/, '');
    const imageUrl = getPopupImageUrl(properties);
    const imageStyle = imageUrl
        ? ` style="--map-popup-image: url('${escapeHtml(imageUrl)}');"`
        : '';

    return `
        <article class="map-popup-card">
            <h3 class="map-popup-title">${title}</h3>
            <div class="map-popup-image"${imageStyle}>
                <span class="map-popup-location">${description}</span>
            </div>
        </article>
    `;
};

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jptelles19/cmnz4m2lt008r01qu2a5095j9',
    center: isMobile ? [-62, 12] : [-60, 12],
    zoom: isMobile ? 1 : 2
});

map.scrollZoom.disable();

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
                    new mapboxgl.Popup({
                        offset: 25,
                        closeButton: false,
                        className: 'ip-map-popup'
                    })
                        .setHTML(getPopupHtml(feature.properties))
                )
                .addTo(map);
        }
    })
    .catch((error) => console.error(error));
