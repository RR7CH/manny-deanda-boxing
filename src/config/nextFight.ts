export const nextFight = {
  eventName: "The El Tigre Fight Night",
  date: "2026-06-06T18:00:00-05:00", // 6:00 PM CT
  dateDisplay: "JUNE 6, 2026",
  dayDisplay: "Saturday",
  timeDisplay: "6:00 PM CT",
  venue: "Galveston Island Convention Center",
  city: "Galveston, TX",
  opponent: {
    name: "Pedro Guevara",
    // Used in disambiguating copy to avoid confusion with the famous
    // former WBC light flyweight champion of the same name.
    weightClassLabel: "Lightweight (135 lbs)",
  },
  rounds: 8,
  weightClass: "Lightweight",
  promoter: "El Tigre Promotions",
  ticketsUrl: "https://tickets.eltigrepromotions.com/event/fight-series-tickets-06-06-2026-1800/el-tigre-fight-night-tickets",
} as const;

export const ticketCtaUrl = `${nextFight.ticketsUrl}?utm_source=mannolo-site&utm_medium=cta&utm_campaign=el-tigre-jun6`;
