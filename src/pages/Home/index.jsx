import React, { useState } from "react";
import {
    Container,
    Search,
    LogoContainer,
    Logo,
    Wrapper,
    CarrouselTitle,
    Carousel,
} from "./styles";
import logo from "../../assets/logo.svg";
import restaurant from "../../assets/restaurante-fake.png";
import TextField, { Input } from "@material/react-text-field";
import MaterialIcon from "@material/react-material-icon";
import { ImageCard, RestaurantCard, Modal, Map } from "../../components";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [valueToSearch, setValueToSearch] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        rows: 1,
    };

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            setValueToSearch(inputValue);
        }
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
                            onKeyUp={handleKeyPress}
                        />
                    </TextField>
                    <CarrouselTitle> O que você deseja comer? </CarrouselTitle>
                    <Carousel {...settings}>
                        <ImageCard photo={restaurant} title="Meu restaurante" />
                        <ImageCard photo={restaurant} title="Meu restaurante" />
                        <ImageCard photo={restaurant} title="Meu restaurante" />
                        <ImageCard photo={restaurant} title="Meu restaurante" />
                        <ImageCard photo={restaurant} title="Meu restaurante" />
                        <ImageCard photo={restaurant} title="Meu restaurante" />
                        <ImageCard photo={restaurant} title="Meu restaurante" />
                    </Carousel>
                </Search>
                <RestaurantCard />
            </Container>
            <Map valueToSearch={valueToSearch} />
            <Modal
                open={modalOpened}
                onClose={() => setModalOpened(!modalOpened)}
            />
        </Wrapper>
    );
};

export default Home;
