import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
    Container,
    Search,
    LogoContainer,
    Logo,
    Wrapper,
    CarrouselTitle,
    Carousel,
    ModalTitle,
    ModalContent,
} from "./styles";
import logo from "../../assets/logo.svg";
import TextField, { Input } from "@material/react-text-field";
import MaterialIcon from "@material/react-material-icon";
import {
    ImageCard,
    RestaurantCard,
    Modal,
    Map,
    Loader,
    Skeleton,
} from "../../components";
import photoDefault from "../../assets/restaurante-fake.png";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [valueToSearch, setValueToSearch] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const [placeId, setPlaceId] = useState(null);
    const { restaurants, restaurantSelected } = useSelector(
        (state) => state.restaurants
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        rows: 1,
        autoplay: true,
    };

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            setValueToSearch(inputValue);
        }
    }

    function handleOpenModal(placeId) {
        setPlaceId(placeId);
        setModalOpened(true);
    }

    return (
        <Wrapper>
            <Container>
                <Search>
                    <LogoContainer>
                        <Logo src={logo} alt="Logo do restaurante" />
                    </LogoContainer>
                    <TextField
                        label="Pesquisar"
                        outlined
                        trailingIcon={
                            <MaterialIcon role="button" icon="search" />
                        }
                    >
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />
                    </TextField>
                    {restaurants.length > 0 ? (
                        <>
                            <CarrouselTitle>
                                O que você deseja comer?
                            </CarrouselTitle>
                            <Carousel {...settings}>
                                {restaurants.map((restaurant) => {
                                    const photoUrl = restaurant.photos
                                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${restaurant.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
                                        : photoDefault;

                                    return (
                                        <ImageCard
                                            key={restaurant.place_id}
                                            photo={photoUrl}
                                            title={restaurant.name}
                                        />
                                    );
                                })}
                            </Carousel>
                        </>
                    ) : (
                        <Loader />
                    )}
                </Search>

                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.place_id}
                        restaurant={restaurant}
                        onClick={() => handleOpenModal(restaurant.place_id)}
                    />
                ))}
            </Container>
            <Map valueToSearch={valueToSearch} placeId={placeId} />
            <Modal
                open={modalOpened}
                onClose={() => setModalOpened(!modalOpened)}
            >
                {restaurantSelected ? (
                    <>
                        <ModalTitle>{restaurantSelected?.name}</ModalTitle>
                        <ModalContent>
                            {restaurantSelected?.formatted_phone_number}
                        </ModalContent>
                        <ModalContent>
                            {restaurantSelected?.formatted_address}
                        </ModalContent>
                        <ModalContent>
                            {restaurantSelected?.opening_hours?.open_now
                                ? "Aberto agora :-)"
                                : "Fechado agora :-("}
                        </ModalContent>
                    </>
                ) : (
                    <>
                        <ModalContent>loading...</ModalContent>
                        <Skeleton width="10px" height="10px" />
                    </>
                )}
            </Modal>
        </Wrapper>
    );
};

export default Home;
