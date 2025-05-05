import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
    setRestaurants,
    setRestaurantSelected,
} from "../../redux/modules/restaurants";

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
    const dispatch = useDispatch();
    const { restaurants } = useSelector((state) => state.restaurants);
    const [map, setMap] = useState(null);
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const { valueToSearch, placeId } = props;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries,
    });

    const onLoad = useCallback((mapInstance) => {
        setMap(mapInstance);
    }, []);

    // Pega a localização do usuário ao carregar
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

    // Realiza a busca ao carregar o mapa ou mudar localização
    useEffect(() => {
        if (isLoaded && map && !valueToSearch) {
            fetchPlacesNearby();
        }
    }, [isLoaded, map, mapCenter, valueToSearch]);

    // Busca por texto quando o usuário digitar algo
    useEffect(() => {
        if (isLoaded && map && valueToSearch) {
            fetchPlacesByQuery(valueToSearch);
        }
    }, [valueToSearch, isLoaded, map, mapCenter]);

    // Busca por restaurante específico quando o usuário clicar em um marcador
    useEffect(() => {
        if (placeId) {
            fetchPlaceById(placeId);
        }
    }, [placeId]);

    const fetchPlacesNearby = async () => {
        dispatch(setRestaurants([]));

        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        const { lat, lng } = mapCenter;
        const radius = 1000;

        const url = `https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === "OK") {
                dispatch(setRestaurants(data.results));
            } else {
                console.error("Erro da API Places (Nearby):", data.status);
            }
        } catch (error) {
            console.error("Erro HTTP (Nearby):", error);
        }
    };

    const fetchPlacesByQuery = async (queryValue) => {
        dispatch(setRestaurants([]));

        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        const { lat, lng } = mapCenter;
        const radius = 1000;
        const query = encodeURIComponent(queryValue);

        const url = `https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${lat},${lng}&radius=${radius}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === "OK") {
                dispatch(setRestaurants(data.results));
            } else {
                console.error("Erro da API Places (Query):", data.status);
            }
        } catch (error) {
            console.error("Erro HTTP (Query):", error);
        }
    };

    const fetchPlaceById = async (placeId) => {
        dispatch(setRestaurantSelected(null));

        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

        const url = `https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === "OK") {
                const placeDetails = data.result;
                dispatch(setRestaurantSelected(placeDetails));
            } else {
                console.error("Erro da API Places (Details):", data.status);
            }
        } catch (error) {
            console.error("Erro HTTP (Details):", error);
        }
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={14}
            onLoad={onLoad}
            {...props}
        >
            {restaurants.map((restaurant) => (
                <Marker
                    key={restaurant.place_id}
                    name={restaurant.name}
                    position={{
                        lat: restaurant.geometry.location.lat,
                        lng: restaurant.geometry.location.lng,
                    }}
                />
            ))}
        </GoogleMap>
    ) : (
        <div>Carregando mapa...</div>
    );
}

export default React.memo(MapComponent);
