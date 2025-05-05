import styled from 'styled-components';
import Slider from "react-slick";

export const Wrapper = styled.div`
  display: flex;
`;

export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  width: 360px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const Search = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
  padding: 16px;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Logo = styled.img`
  width: 60%;
  height: auto;
  margin-bottom: 16px;
`;

export const MapContainer = styled.div`
  background-color:rgb(196, 95, 95);
  width: 100%;
`;

export const CarrouselTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  font-size: 24px;
  font-weight: bold;
  line-height: 29px;
  margin: 16px 0;
`;

export const Carousel = styled(Slider)`
  .slick-slide {
    margin: 0 10px; /* Espaço entre os slides */
    box-sizing: border-box;
  }

  .slick-track {
    display: flex !important; /* Garante que fique em uma linha */
    align-items: stretch;
  }
`;

export const ModalTitle = styled.p`
  margin-bottom: 10px;
  letter-spacing: 0.11px;
  font-family: ${(props) => props.theme.fonts.regular};
  color: ${(props) => props.theme.colors.text};
  line-height: 29px;
  font-size: 24px;
  font-weight: bold;
`;

export const ModalContent = styled(ModalTitle)`
  line-height: 19px;
  font-size: 16px;
  font-weight: normal;
`;