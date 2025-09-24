import logo from "./assets/logo.svg"
import iconX from "./assets/icon-x-not-selected.svg"
import iconO from "./assets/icon-o-not-selected.svg"
import iconXSelected from "./assets/icon-x-selected.svg"
import iconOSelected from "./assets/icon-o-selected.svg"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { PlayerContext } from "./context/PlayerContext"

export const PaginaInicio = () => {

    const {selected, setSelected} = useContext(PlayerContext);

    const { setNewGame } = useContext(PlayerContext);

    const navigate = useNavigate();

    const HandleClickCpu = () => {
        navigate("/game");
        setNewGame("cpu");
    }

    const HandleClickPlayer = () => {
        navigate("/game");
        setNewGame("player");
    }


    return(
        <section className="inicio">
            <div className="inicio_logo">
                <img src={logo} alt="Logotipo de la página" />
            </div>

            <article className="inicio_selectPlayer">
                <h1 className="inicio_selectPlayer-title heading-XS">PICK PLAYER 1’S MARK</h1>

                <div className="inicio_selectPlayer-container">
                    <div className={`inicio_selectPlayer-container-option ${selected === "X" ? "selected" : ""}`} onClick={() => setSelected("X")}>
                        <img src={selected === "X" ? iconXSelected : iconX} alt="jugador-x"/>
                    </div>
                    <div className={`inicio_selectPlayer-container-option gris-claro ${selected === "O" ? "selected" : ""}`} onClick={() => setSelected("O")}>
                        <img src={selected === "O" ? iconOSelected : iconO} alt="jugador-o"/>
                    </div>
                    
                </div>

                <h2 className="inicio_selectPlayer-subtitle cuerpo">REMEMBER : {selected} GOES FIRST</h2>
            </article>

            <div className="inicio_newGameCpu button heading-XS" onClick={HandleClickCpu}>NEW GAME (VS CPU)</div>
            <div className="inicio_newGamePlayer button heading-XS" onClick={HandleClickPlayer}>NEW GAME (VS PLAYER)</div>
      </section>
    )
}