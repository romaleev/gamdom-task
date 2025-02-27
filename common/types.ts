export enum Bet {
	Home,
	Draw,
	Away,
}

export interface Odd {
	odd_id: number
	event_id: number
	odd_value: string
	bet_type: Bet
}

export interface Event {
	event_id: number
	event_name: string
}

export interface EventOdds {
	event_id: number
	event_name: string
	odds: number[]
}