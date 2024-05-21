export function sumHour(hour: string, amount: number): string {
  const [hh, mm] = hour.split(':').map(Number)
  const totalMinutes = hh * 60 + mm + amount * 60
  const newHour = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, '0')
  const newMinute = (totalMinutes % 60).toString().padStart(2, '0')
  return `${newHour}:${newMinute}`
}
