import './DiceRollerApp.scss'
import Dice from '../Dice/Dice'
import { useEffect, useRef, KeyboardEvent, LegacyRef } from 'react'
import { useState } from 'react'

export default function DiceRollerApp() {

	const [ dice, setDice ] = useState<Array<number>>([])
	const [ diceCount, setDiceCount ] = useState<number>(8)

	const [ rolling, setRolling ] = useState<boolean>(false)

	const div = useRef<HTMLDivElement>(null)
	const timer = useRef<NodeJS.Timeout>();

	useEffect(() => {
		setDice(createEmptyRoll(diceCount))

		// startRoller()
		if (div.current) {
			(div.current as unknown as HTMLDivElement).focus()
		}
		return () => { stopRoller() }
	}, [])


	const startRoller = () => {
		if (rolling) {
			return false
		}

		timer.current = setInterval(() => {
			setDice(createRoll(diceCount))
		}, 100)

		setRolling(true)

		return true
	}

	const stopRoller = () => {
		if (!rolling) {
			return false
		}

		if (timer.current) {
			clearInterval(timer.current)
		}

		setRolling(false)

		return true
	}

	const onKeyUp = (event: KeyboardEvent<HTMLDivElement>): void => {
		if (event.code === 'Space') stopRoller()
	}

	const onKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
		if (event.code === 'Space') startRoller()
	}

	return (
		<div
			ref={div}
			tabIndex={-1}
			className="DiceRollerApp"
			onKeyUp={onKeyUp}
			onKeyDown={onKeyDown}
		>
			{dice.map((dice, index) => <Dice key={index} value={dice} />)}
		</div>
	)
}

const randomDiceRoll = () => Math.floor(Math.random() * 6) + 1

function createRoll(diceCount: number) {
	let rolls = []
	for (let i = 0; i < diceCount; i++) rolls.push(randomDiceRoll())
	return rolls
}

function createEmptyRoll(diceCount: number) {
	let rolls = []
	for (let i = 0; i < diceCount; i++) rolls.push(diceCount)
	return rolls
}
