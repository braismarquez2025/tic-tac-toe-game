import logo from "./assets/logo.svg"
import restart from "./assets/icon-restart.svg"
import iconXGris from "./assets/icon-x-not-selected.svg"
import iconOGris from "./assets/icon-o-not-selected.svg"
import iconX from "./assets/icon-x.svg";
import iconO from "./assets/icon-o.svg";
//import iconXSelected from "./assets/icon-x-selected.svg";
//import iconOSelected from "./assets/icon-o-selected.svg";
import XHover from "./assets/icon-x-outline.svg";
import OHover from "./assets/icon-o-outline.svg";
import { Casilla } from "./Casilla";


import { useContext, useState } from "react"
import { PlayerContext } from "./context/PlayerContext"
import { Puntuacion } from "./Puntuacion"
import { ModalRestart } from "./modals/ModalRestart";
import { ModalWinner } from "./modals/ModalWinner";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";
import { winningCombos } from "./utils/WinningCombos";
import { cpuMoveIntermediate } from "./LogicaCpu";
import { useCallback } from "react";


export const Game = () => {
    const [casillas, setCasillas] = useState(Array(9).fill(null));
    const { selected } = useContext(PlayerContext);
    const [turno, setTurno] = useState(selected);
    const [showModalRestart, setShowModalRestart] = useState(false);
    const [showModalWinner, setShowModalWinner] = useState(false);
    const [showModalEmpate, setShowModalEmpate] = useState(false);
    const [winner, setWinner] = useState(null);
    const [score, setScore] = useState(0);
    const [scoreCpu, setScoreCpu] = useState(0);
    const [numeroPartidas, setNumeroPartidas] = useState(0);
    const { newGame } = useContext(PlayerContext);
    const [winningSquares, setWinningSquares] = useState([]);

    
    const navigate = useNavigate();

    const backHome = () => {
        setShowModalWinner(false);
        setShowModalEmpate(false);
        navigate("/");
    }

    const cpu = selected === "X" ? "O" : "X";


    const checkWinner = useCallback((casillas) => {
        for (let combo of winningCombos) {
          const [a, b, c] = combo;
          if (casillas[a] && casillas[a] === casillas[b] && casillas[a] === casillas[c]) {
            const ganador = casillas[a];
            setWinner(ganador);

            setWinningSquares(combo);

            if (ganador === selected) {
                setScore((prev) => prev + 1);
                setNumeroPartidas((prev) => prev + 1);
            } else {
                setScoreCpu((prev) => prev + 1);
                setNumeroPartidas((prev) => prev + 1);
            }

            return;
          }
        }
        if (!casillas.includes(null)) {
          setWinner("Empate");
          setShowModalEmpate(true);
        }
      }, [selected, setScore, setScoreCpu, setNumeroPartidas, setWinner, setWinningSquares, setShowModalEmpate]);


    

    const handleClick = useCallback((index) => {
        if (casillas[index] || winner) return;
      
        const nuevasCasillas = [...casillas];
        nuevasCasillas[index] = turno;
      
        setCasillas(nuevasCasillas);
        checkWinner(nuevasCasillas);
      
        setTurno(turno === "X" ? "O" : "X");
      }, [casillas, turno, winner, checkWinner]);
    
      
    // Efecto Turno CPU
    useEffect(() => {
        if (newGame === "cpu" && turno === "O" && !winner) {
            const move = cpuMoveIntermediate(casillas, "O", "X");
            if (move !== null) {
            const timer = setTimeout(() => handleClick(move), 500);
            return () => clearTimeout(timer);
            }
        }
    }, [turno, casillas, winner, handleClick, newGame]);
    
    

    //Asignamos imagenes de 'x' y 'o' a las casillas

    

    function restartGame() {
        setCasillas(Array(9).fill(null));
        setTurno(selected);
        setShowModalRestart(false);
        setShowModalWinner(false);
        setShowModalEmpate(false);
        setWinningSquares([]);
        setWinner(null);
    }


    useEffect(() => {
        if (winner === "X" || winner == "O") {
          const timer = setTimeout(() => {
            setShowModalWinner(true);
          }, 2000);
      
          return () => clearTimeout(timer);
        } else {
          setShowModalWinner(false);
        }
      }, [winner]);
    

    return (
        <section className="game">
            <header className="game_header">
                <img src={logo} alt="logotipo" className="game_header-logo" onClick={backHome}/>
                <div className="game_header-turno cuerpo">{turno === "X" ? <img src={iconXGris} alt="X" /> : <img src={iconOGris} alt="O" />} TURN</div>
                <div className="game_header-restart" onClick={() => setShowModalRestart(true)}>
                    <img src={restart} alt="restart_button" />
                </div>
            </header>

            <article className="tablero">
                {casillas.map((valor, index) => {
                    return (
                        <Casilla
                        key={index}
                        valor={valor}
                        isWinner={winningSquares.includes(index)}
                        onClick={() => handleClick(index)}
                      />
                    )
                })}
            </article>

            <article className="puntuacion">
                <Puntuacion title = {newGame === "cpu" ? `${selected} (YOU)` : `${selected} (P1)`}  score={score} bgColor={"#65E9E4"} color={"#1A2A33"} />

                <Puntuacion title={"TIES"} score={numeroPartidas} bgColor={"#A8BFC9"} color={"#1A2A33"} />
            
                <Puntuacion 
                    title = {newGame === "cpu" ? `${selected} (CPU)` : `${cpu} (P2)`} 
                    score={scoreCpu} bgColor={"#FFC860"} color={"#1A2A33"} />
                
            </article>
            
            
            {showModalRestart && (
                <ModalRestart>
                    <h2 className="modal_title">RESTART GAME?</h2>
                        <div className="modal_buttons">
                        <div className="modal_buttons-cancelar heading-XS" 
                            onClick={() => setShowModalRestart(false)}>
                                NO, CANCEL
                        </div>
                        <div className="modal_buttons-restart heading-XS" onClick={restartGame}>YES, RESTART</div>
                    </div>
                </ModalRestart> 
            )}

            {showModalEmpate && (
                <ModalRestart>
                    <h2 className="modal_title">ROUND QUIET</h2>
                        <div className="modal_buttons">
                        <div className="modal_buttons-cancelar heading-XS" 
                            onClick={() => backHome()}>
                                QUIT
                        </div>
                        <div className="modal_buttons-restart heading-XS" onClick={restartGame}>NEXT ROUND</div>
                    </div>
                </ModalRestart> 
            )}

            {showModalWinner && (
                <ModalWinner>
                    <p className="winner_text cuerpo">
                        {winner === selected
                        ? (newGame === "cpu" ? "YOU WON!" : "PLAYER 1 WINS!")
                        : (newGame === "cpu" ? "OH NO, YOU LOST…" : "PLAYER 2 WINS!")}
                    </p>
                    
                    <div className="winner_container">
                        {winner === "X" ? <img src={iconX} alt="X" className="winner_img" /> : <img src={iconO} alt="O" className="winner_img" />}
                        <h2 className={`winner_title ${winner === 'X' ? 'azul' : 'yellow'}`}>TAKES THE ROUND</h2>
                    </div>
                        <div className="modal_buttons">
                        <div className="modal_buttons-cancelar heading-XS" 
                            onClick={() => backHome()}>
                                QUIT
                        </div>
                        <div className="modal_buttons-restart heading-XS" onClick={restartGame}>NEXT ROUND</div>
                    </div>
                </ModalWinner>     
            )}
        </section>

    )
}