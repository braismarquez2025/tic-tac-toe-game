export const Casilla = ({ valor, isWinner, onClick }) => {
    return (
      <div
        className={`casilla ${isWinner ? `winner-${valor}` : ""}`}
        onClick={onClick}
      >
        <div
          className={`casilla-icon 
            ${valor === "X" ? "X" : valor === "O" ? "O" : ""} 
            ${isWinner ? "winner" : ""}`}
        />
      </div>
    );
  }