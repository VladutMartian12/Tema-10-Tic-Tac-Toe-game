import React, {Component} from 'react'
import Square from './Square'

export default class Board extends Component {
	constructor(props) {
		super(props)

		this.state = {
			squares: Array(9).fill(null),
			isXTurn: true, 
			winner: '',
			gameOver: false
		}
	}

	getWinner(squares){
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6]
		];
		for(let i = 0 ; i<lines.length; i ++) {
			const [a,b,c] = lines[i];
			if( squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a];
			}
		}
		return null;
	}

	onSquareClick(index) {
		const squares = [...this.state.squares];
		if(squares[index] == null && this.state.gameOver == false){
		squares[index] = this.state.isXTurn ? 'X' : '0'
		this.setState({
			squares,
			isXTurn: !this.state.isXTurn
		})

		if(this.getWinner(squares) != null) {
			this.state.gameOver = true;
			this.state.winner = this.getWinner(squares);
		}
	 }
	}

	

	render() {
		return <div className="board">
			{
				this.state.squares.map( 
					(value, index) => <Square key={index}
					value={value}
					onSquareClick={() => this.onSquareClick(index)}
				/>)
			}

	<div className = "result">
	{this.state.winner != '' ? "Winner is: " + this.state.winner : ""} 
	</div>
		</div>

	
    }
}
     