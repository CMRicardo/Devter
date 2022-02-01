import { useEffect, useState } from "react"

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
]

const getTimeDiff = (timestamp) => {
  const now = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === "second") {
      const value = Math.floor(elapsed / secondsInUnit)
      return { value, unit }
    }
  }
}

export default function useTimeAgo(timestamp) {
  const [timeAgo, setTimeAgo] = useState(() => getTimeDiff(timestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getTimeDiff(timestamp)
      setTimeAgo(newTimeAgo)
    }, 5000)
    return () => clearInterval(interval)
  }, [timestamp])

  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" })
  const { value, unit } = timeAgo
  return rtf.format(value, unit)
}
