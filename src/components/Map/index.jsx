import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

const center = {
    lat: -23.55052,
    lng: -46.633308,
};

function MapComponent() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        language: "pt-BR",
    });

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={13}
        ></GoogleMap>
    ) : (
        <p>Carregando mapa...</p>
    );
}

export default React.memo(MapComponent);
