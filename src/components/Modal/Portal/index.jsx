import ReactDOM from "react-dom";

const PortalModal = ({ children }) => {
    const Portal = document.getElementById("modal-root");
    return ReactDOM.createPortal(children, Portal);
};

export default PortalModal;
