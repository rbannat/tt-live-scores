const now = new Date()
const month = now.getMonth() // 0 = Jan, 8 = Sep
const year = now.getFullYear()

export const firstHalfCompleted = month < 8

export const currentSeason = (() => {
  const seasonStart = month >= 8 ? year : year - 1
  const start = String(seasonStart % 100).padStart(2, '0')
  const end = String((seasonStart + 1) % 100).padStart(2, '0')
  return `${start}/${end}`
})()
