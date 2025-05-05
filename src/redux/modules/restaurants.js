export const Types = {
    SET_RESTAURANTS: 'restaurants/SET_RESTAURANTS',
    SET_RESTAURANT_SELECTED: 'restaurants/SET_RESTAURANT_SELECTED',
}

const initialState = {
    restaurants: [],
    restaurantSelected: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Types.SET_RESTAURANTS:
            return { ...state, restaurants: action.payload };

        case Types.SET_RESTAURANT_SELECTED:
            return { ...state, restaurantSelected: action.payload };

        default:
            return state;
    };
}

export function setRestaurants(restaurants) {
    return {
        type: Types.SET_RESTAURANTS,
        payload: restaurants,
    }
}

export function setRestaurantSelected(restaurantSelected) {
    return {
        type: Types.SET_RESTAURANT_SELECTED,
        payload: restaurantSelected,
    }
}
