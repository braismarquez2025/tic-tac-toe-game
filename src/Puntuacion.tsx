import React from "react";

export const Puntuacion = ({title, score, bgColor, color}) => {
    return (
        <div className="puntuacion_player" style={{backgroundColor: bgColor, color: color}}>
            <p className="cuerpo">{title}</p>
            <p className="heading-S">{score}</p>
        </div>
    )
}