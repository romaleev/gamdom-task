export default {
	'eventList': {
		'title': 'Online Betting Dashboard',
		'loadError': 'Failed to fetch events. Please try again',
		'headerMatch': 'Match',
	},
	'betSlip': {
		'title': 'Bet Slip',
		'select': 'Select an odd to place a bet',
		'stakeAmount': 'Stake amount',
		'estPayout': 'Est. Payout:',
		'placeBet': 'Place Bet',
		'betSuccess': 'Bet placed successfully!',
		'betError': 'Failed to place bet, please try again',
	},
	'api': {
		'notFound': 'Event not found',
		'error': 'Internal server error',
	},
	'betSchema': {
		'required': 'Stake amount is required',
		'invalidFormat': 'Invalid stake format, should be positive and up 2 decimals',
		'greaterZero': 'Stake must be greater than 0',
		'invalidEventId': 'Invalid event ID, should be positive integer number',
		'invalidOddId': 'Invalid odd ID, should be integer between 0 and 2',
	},
	'eventSchema': {
		'invalidName': 'Event name must be between 3 and 255 characters long',
		'invalidOdds': 'Odds must be an array of exactly 3 positive numbers',
	},
}