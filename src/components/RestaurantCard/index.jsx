import React from "react";
import ReactStars from "react-rating-stars-component";
import photoDefault from "../../assets/restaurante-fake.png";

import {
    RestaurantContainer,
    Restaurant,
    RestaurantInfo,
    RestaurantName,
    RestaurantAddress,
    RestaurantPhoto,
} from "./styles";

const RestaurantCard = ({ restaurant }) => {
    const photoUrl = restaurant.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
        : photoDefault;
    return (
        <RestaurantContainer>
            <Restaurant>
                <RestaurantInfo>
                    <RestaurantName>{restaurant.name}</RestaurantName>
                    <ReactStars
                        count={5}
                        isHalf={true}
                        activeColor="#e7711c"
                        edit={false}
                        value={restaurant.rating}
                    />
                    <RestaurantAddress>
                        {restaurant.vicinity || restaurant.formatted_address}
                    </RestaurantAddress>
                </RestaurantInfo>
                <RestaurantPhoto src={photoUrl} alt={restaurant.name} />
            </Restaurant>
        </RestaurantContainer>
    );
};

export default RestaurantCard;
