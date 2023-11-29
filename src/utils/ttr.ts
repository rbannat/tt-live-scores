export function calculateTtr(
  ttr: number,
  opponentTtr: number,
  u21 = false,
  u16 = false,
  totalBelow30 = false,
  below15AfterOneYear = false,
) {
  const winProbability = 1 / (1 + Math.pow(10, (opponentTtr - ttr) / 150))
  const k =
    16 +
    (u16 ? 8 : u21 ? 4 : 0) +
    (totalBelow30 ? 4 : 0) +
    (below15AfterOneYear ? 4 : 0)
  const winPoints = Math.round((1 - winProbability) * k)
  const losePoints = Math.round(0 - winProbability * k)
  const winTtr = ttr + winPoints
  const loseTtr = ttr + losePoints
  return {
    winPoints,
    losePoints,
    winTtr,
    loseTtr,
    winProbability: (winProbability * 100).toFixed(2),
  }
}
