import { winningCombos } from "./utils/WinningCombos";

export const cpuMoveIntermediate = (board, cpu = "O", player = "X") => {
    // 1. Si puede ganar en esta jugada → juega
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      const values = [board[a], board[b], board[c]];
      if (values.filter(v => v === cpu).length === 2 && values.includes(null)) {
        return combo[values.indexOf(null)];
      }
    }
  
    // 2. Si el jugador puede ganar en la siguiente → bloquea
    for (let combo of winningCombos) {
      const [a, b, c] = combo;
      const values = [board[a], board[b], board[c]];
      if (values.filter(v => v === player).length === 2 && values.includes(null)) {
        return combo[values.indexOf(null)];
      }
    }
  
    // 3. Si el centro está libre → cogerlo
    if (board[4] === null) return 4;
  
    // 4. Buscar esquinas libres
    const corners = [0, 2, 6, 8];
    const freeCorners = corners.filter(i => board[i] === null);
    if (freeCorners.length > 0) {
      return freeCorners[Math.floor(Math.random() * freeCorners.length)];
    }
  
    // 5. Buscar laterales libres
    const sides = [1, 3, 5, 7];
    const freeSides = sides.filter(i => board[i] === null);
    if (freeSides.length > 0) {
      return freeSides[Math.floor(Math.random() * freeSides.length)];
    }
  
    return null; // empate o tablero lleno
  }