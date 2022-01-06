import './DiceRollerApp.scss'
import Dice from '../Dice/Dice'

export default function DiceRollerApp() {
	return (
	<div className="DiceRollerApp">
		<Dice value={1} />
		<Dice value={2} />
		<Dice value={3} />
		<Dice value={4} />
		<Dice value={5} />
		<Dice value={6} />
	</div>
	)
}
