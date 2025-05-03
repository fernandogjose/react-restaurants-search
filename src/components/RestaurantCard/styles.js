import styled from "styled-components";

export const RestaurantContainer = styled.div`
    cursor: pointer;
    background-color: #ffffff;
    :hover {
        background-color: #00000021;
        border-left-color: ${(props) => props.theme.colors.primary};
    }
`;

export const Restaurant = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 16px;
    margin-top: 6px;
    cursor: pointer;
    background-color: #ffffff;
    border-left: 5px solid transparent;
`;

export const RestaurantInfo = styled.div`
    display: flex;
    flex-direction: column;
    pointer-events: none;
    flex: 1;
`;

export const RestaurantName = styled.span`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.text};
    font-size: 24px;
    font-weight: bold;
    line-height: 29px;
    margin-bottom: 10px;
`;

export const RestaurantAddress = styled.span`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.text};
    font-size: 16px;
    line-height: 19px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const RestaurantPhoto = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 6px;
    margin-left: 10px;
    pointer-events: none;
    flex: 1;
    object-fit: cover;
`;