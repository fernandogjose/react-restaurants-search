import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

const defaultCenter = {
    lat: -23.55052,
    lng: -46.633308,
};

const libraries = ["places"];

function MapComponent(props) {
    const [map, setMap] = useState(null);
    const [places, setPlaces] = useState([]);
    const [mapCenter, setMapCenter] = useState(defaultCenter);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries: libraries,
    });

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    const { valueToSearch } = props;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setMapCenter(userLocation);
                },
                (error) => {
                    console.error("Erro ao obter localização:", error);
                }
            );
        }
    }, []);

    useEffect(() => {
        if (isLoaded && map) {
            const fetchPlaces = async () => {
                const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
                const { lat, lng } = mapCenter;
                const radius = 1000;
                const url = `https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${apiKey}`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    if (data.status === "OK") {
                        setPlaces(data.results);
                        console.log("Restaurantes encontrados:", data.results);
                    } else {
                        console.error(
                            "Erro na resposta da API Places:",
                            data.status
                        );
                    }
                } catch (error) {
                    console.error("Erro na requisição HTTP:", error);
                }
            };

            fetchPlaces();
        }
    }, [isLoaded, map, mapCenter]);

    useEffect(() => {
        if (valueToSearch) searchByQuery(valueToSearch);
    }, [valueToSearch]);

    function searchByQuery(valueToSearch) {
        const fetchPlaces = async () => {
            const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
            const { lat, lng } = mapCenter;
            const radius = 1000;
            const query = encodeURIComponent(valueToSearch);
            const url = `https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${lat},${lng}&radius=${radius}&key=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.status === "OK") {
                    setPlaces(data.results);
                    console.log("Restaurantes encontrados:", data.results);
                } else {
                    console.error(
                        "Erro na resposta da API Places:",
                        data.status
                    );
                }
            } catch (error) {
                console.error("Erro na requisição HTTP:", error);
            }
        };

        fetchPlaces();
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={14}
            onLoad={onLoad}
        ></GoogleMap>
    ) : (
        <div>Carregando mapa...</div>
    );
}

export default React.memo(MapComponent);
