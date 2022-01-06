import './Dice.scss'
import ActionDice1 from './images/1.png'
import ActionDice2 from './images/2.png'
import ActionDice3 from './images/3.png'
import ActionDice4 from './images/4.png'
import ActionDice5 from './images/5.png'

interface DiceProps {
	value: number
}

const DiceImages: { [value:number]: string } = {
	1: ActionDice1,
	2: ActionDice2,
	3: ActionDice3,
	4: ActionDice4,
	5: ActionDice5
}

export default function Dice({ value }: DiceProps) {

	const src = DiceImages[value]

	return (
		<div className='dice'>
			{ src && <img src={src} /> }
		</div>
	)
}
