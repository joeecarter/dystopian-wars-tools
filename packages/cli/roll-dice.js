#!/usr/bin/env node
const path = require('path')

const ATTACK = 'attack'
const DEFEND = 'defend'

const DICE_EXPLODING_HIT = 1
const DICE_HEAVY_HIT     = 2
const DICE_HIT           = 3
const DICE_HEAVY_COUNTER = 4
const DICE_COUNTER       = 5
const DICE_BLANK         = 6

const ATTACK_RESULT = {
	[DICE_EXPLODING_HIT]: 2,
	[DICE_HEAVY_HIT]:     2,
	[DICE_HIT]:           1,
	[DICE_HEAVY_COUNTER]: 0,
	[DICE_COUNTER]:       0,
	[DICE_BLANK]:         0
}

const DEFEND_RESULT = {
	[DICE_EXPLODING_HIT]: 0,
	[DICE_HEAVY_HIT]:     0,
	[DICE_HIT]:           0,
	[DICE_HEAVY_COUNTER]: 2,
	[DICE_COUNTER]:       1,
	[DICE_BLANK]:         0
}

async function main() {
	const [ , script, type, numberOfDice ] = process.argv

	if (process.argv.length !== 4) {
		console.error(`USAGE: ${path.basename(script)} ${ATTACK}|${DEFEND} <number of dice>`)
		process.exit(127)
	}

	if (type !== ATTACK && type !== DEFEND) {
		console.error(`ERROR: '${type}' is not a valid option please use '${ATTACK}' or '${DEFEND}'.`)
		process.exit(127)
	}

	let parsedNumberOfDice = Number(numberOfDice)
	if (isNaN(parsedNumberOfDice)) {
		console.error(`ERROR: '${numberOfDice}' is not a number.`)
		process.exit(127)
	}

	if (parsedNumberOfDice < 1) {
		console.error('ERROR: Cannot roll zero or negative dice.')
		process.exit(127)
	}

	rollDice(type, numberOfDice)
}

function rollDice(type, numberOfDice) {
	if (type === ATTACK) rollAttack(numberOfDice)
	if (type === DEFEND) rollDefend(numberOfDice)
}

function rollAttack(numberOfDice) {	
	let rolls = []

	const getLastRoll = () => rolls.length > 0 ? rolls[rolls.length - 1] : null
	
	const getExploding = () => count(getLastRoll(), DICE_EXPLODING_HIT)
	
	const shouldContinue = () => getExploding() > 0
	
	const getAllDice = () => rolls
			.reduce((prev, curr) => [].concat(prev, curr), [])
			.sort()

	do {
		const lastRoll = getLastRoll()
		const rollCount = lastRoll === null
				? numberOfDice : getExploding()

		rolls.push(createRoll(rollCount))

		console.log(getLastRoll())
	} while(shouldContinue())

	const total = getAllDice()
				.map(dice => ATTACK_RESULT[dice])
				.reduce((prev, curr) => prev + curr, 0)
	console.log(`Attack total: ${total}`)
	return total
}

function rollDefend(numberOfDice) {
	const roll = createRoll(numberOfDice)
	
	const total = roll
				.map(dice => DEFEND_RESULT[dice])
				.reduce((prev, curr) => prev + curr, 0)
	
	console.log(roll)
	console.log(`Defend total: ${total}`)
}

function createRoll(diceCount) {

	const randomDiceRoll = () => Math.floor(Math.random() * 6) + 1

	let rolls = []
	for (let i = 0; i < diceCount; i++) {
		rolls.push(randomDiceRoll())
	}
	return rolls.sort()
}

const count = (numbers, value) => numbers.filter(number => number === value).length

main()
