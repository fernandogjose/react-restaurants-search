import React from "react";
import ReactStars from "react-rating-stars-component";
import restaurant from "../../assets/restaurante-fake.png";

import {
    Restaurant,
    RestaurantInfo,
    RestaurantName,
    RestaurantAddress,
    RestaurantPhoto,
} from "./styles";

const RestaurantCard = () => (
    <Restaurant>
        <RestaurantInfo>
            <RestaurantName>The Gardens Seasons</RestaurantName>
            <ReactStars
                count={5}
                isHalf={true}
                activeColor="#e7711c"
                edit={false}
                value={4}
            />
            <RestaurantAddress>Rua Ulisses Cruz, 668</RestaurantAddress>
        </RestaurantInfo>
        <RestaurantPhoto src={restaurant} alt="Foto do Restaurante" />
    </Restaurant>
);

export default RestaurantCard;
