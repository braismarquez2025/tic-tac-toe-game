import ReactDOM from "react-dom";

export const ModalWinner = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="modal">
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};
