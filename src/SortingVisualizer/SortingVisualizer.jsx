import React from 'react';
import './SortingVisualizer.css';
import { mergeSort, bubbleSort, heapSort, quickSort } from '../SortingAlgorithms/sortingAlgorithms.js';

// Speed of Animation in MS
const SPEED_MS = 3;

// Change this percent to change the amount of the viewport width taken up by number bars
// Range from 0 - 1
const WIDTH_PERCENT = 0.8;

// Change this percent to change the amount of viewport heigh taken up by the number bars
// Range from 0 - 1
const HEIGHT_PERCENT = 0.88;

// This px value corresponds to the number bar width
const BAR_WIDTH = 10;

// This px value corresponds to the number bar left & right margin
const MARGIN = 1;

export const DEFAULT_COLOUR = `white`;
const COMPARISON_COLOUR = `red`;
const SORTED_COLOUR = `teal`;

class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			array: []
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];
		const arrayLength = Math.floor(window.innerWidth * WIDTH_PERCENT / (BAR_WIDTH + MARGIN * 2));
		const height = Math.floor(window.innerHeight * HEIGHT_PERCENT);

		for (let i = 0; i < arrayLength; i++) {
			let num = Math.floor(Math.random() * height + 1) + 5;
			array.push(num);
		}
		this.setState({ array });
	}

	mergeSort() {
		// Animating sequences are triplets where first pair says what values are being compared and to turn red
		// Second pair is the same values being compared and is used to turn to new 'sorted' colour
		// Third pair is the index and height, where index inidcates the bar and the height is the now new height value
		const animations = [];
		const { array } = this.state;
		mergeSort(array, array.slice(), 0, array.length - 1, animations);
		console.log(`Sorting speed: ${animations.length * SPEED_MS / 1000}`);

		for (let i = 0; i < animations.length; i++) {
			const bars = document.getElementsByClassName('array-bar');

			setTimeout(() => {
				const [ idx1, idx2 ] = animations[i];
				const [ index, height ] = animations[i];

				if (i % 3 === 0) {
					// If first part of triple colour bars being compared to red
					bars[idx1].style.backgroundColor = COMPARISON_COLOUR;
					bars[idx2].style.backgroundColor = COMPARISON_COLOUR;
				} else if (i % 3 === 1) {
					// If second part of triple, colour bars being compared are changed to new sorted color
					bars[idx1].style.backgroundColor = SORTED_COLOUR;
					bars[idx2].style.backgroundColor = SORTED_COLOUR;
				} else {
					// If last part of triple, then change the height of the bar at the corresponding index
					bars[index].style.height = `${height}px`;
				}
				// i * SPEED_MS is required because all loops are run concurrently and this allows each loop to be delayed
				// by it's iteration count to give an appearance of the function being run sequentially
			}, i * SPEED_MS);
		}

		this.whileRunning(animations.length * SPEED_MS, 'msort');
	}

	bubbleSort() {
		const { array } = this.state;
		const animations = [];
		bubbleSort(array, animations);
		console.log(`Sorting speed: ${animations.length * SPEED_MS / 1000}`);

		for (let i = 0; i < animations.length; i++) {
			const bars = document.getElementsByClassName(`array-bar`);

			setTimeout(() => {
				if (i % 3 === 0) {
					const [ idx1, idx2 ] = animations[i];

					bars[idx1].style.backgroundColor = COMPARISON_COLOUR;
					bars[idx2].style.backgroundColor = COMPARISON_COLOUR;
				} else if (i % 3 === 1) {
					const [ idx1, idx2 ] = animations[i];

					bars[idx1].style.backgroundColor = SORTED_COLOUR;
					bars[idx2].style.backgroundColor = SORTED_COLOUR;
				} else {
					const [ flag, idx1, idx2, idx1Height, idx2Height ] = animations[i];

					if (flag) {
						bars[idx1].style.height = `${idx2Height}px`;
						bars[idx2].style.height = `${idx1Height}px`;
					}
				}
			}, i * SPEED_MS);
		}

		this.whileRunning(animations.length * SPEED_MS, 'bsort');
	}

	heapSort() {
		const { array } = this.state;
		const animations = [];
		heapSort(array, animations);
		console.log(`Sorting speed: ${animations.length * SPEED_MS / 1000}`);

		for (let i = 0; i < animations.length; i++) {
			const bars = document.getElementsByClassName(`array-bar`);

			setTimeout(() => {
				if (i % 3 === 0) {
					const [ idx1, idx2 ] = animations[i];

					bars[idx1].style.backgroundColor = COMPARISON_COLOUR;
					bars[idx2].style.backgroundColor = COMPARISON_COLOUR;
				} else if (i % 3 === 1) {
					const [ idx1, idx2 ] = animations[i];

					bars[idx1].style.backgroundColor = SORTED_COLOUR;
					bars[idx2].style.backgroundColor = SORTED_COLOUR;
				} else {
					const [ idx1, idx2, idx1Height, idx2Height ] = animations[i];

					bars[idx1].style.height = `${idx2Height}px`;
					bars[idx2].style.height = `${idx1Height}px`;
				}
			}, i * SPEED_MS);
		}

		this.whileRunning(animations.length * SPEED_MS, 'hsort');
	}

	quickSort() {
		const { array } = this.state;
		const animations = [];
		quickSort(array, 0, array.length - 1, animations);
		console.log(`Sorting speed: ${animations.length * SPEED_MS / 1000}`);

		for (let i = 0; i < animations.length; i++) {
			const bars = document.getElementsByClassName(`array-bar`);

			setTimeout(() => {
				if (i % 3 === 0) {
					const [ idx1, idx2 ] = animations[i];

					bars[idx1].style.backgroundColor = COMPARISON_COLOUR;
					bars[idx2].style.backgroundColor = COMPARISON_COLOUR;
				} else if (i % 3 === 1) {
					const [ idx1, idx2 ] = animations[i];

					bars[idx1].style.backgroundColor = SORTED_COLOUR;
					bars[idx2].style.backgroundColor = SORTED_COLOUR;
				} else {
					const [ idx1, idx2, idx1Height, idx2Height ] = animations[i];

					bars[idx1].style.height = `${idx2Height}px`;
					bars[idx2].style.height = `${idx1Height}px`;
				}
			}, i * SPEED_MS);
		}

		this.whileRunning(animations.length * SPEED_MS, 'qsort');
	}

	whileRunning(time, id) {
		const buttons = [ 'newarray', 'msort', 'hsort', 'bsort', 'qsort' ];

		buttons.forEach((element) => {
			document.getElementById(element).disabled = true;
			document.getElementById(element).style.color = 'grey';
		});

		document.getElementById(id).style.backgroundColor = '#1e1e26';
		document.getElementById(id).style.border = '2px solid #444757';

		setTimeout(() => {
			buttons.forEach((element) => {
				document.getElementById(element).disabled = false;
				document.getElementById(element).style.color = 'white';
			});

			document.getElementById(id).style.backgroundColor = '';
			document.getElementById(id).style.border = '';
		}, time);
	}

	test(algorithim) {
		for (let i = 0; i < 100; i++) {
			const array = [];
			const animations = [];

			const arrayLength = Math.floor(window.innerWidth * WIDTH_PERCENT / (BAR_WIDTH + MARGIN * 2));
			const height = Math.floor(window.innerHeight * HEIGHT_PERCENT);

			for (let i = 0; i < arrayLength; i++) {
				let num = Math.floor(Math.random() * height + 1) + 5;
				array.push(num);
			}

			const mergeSortArray = [ ...array ];
			const bubbleSortArray = [ ...array ];
			const heapSortArray = [ ...array ];
			const quickSortArray = [ ...array ];

			mergeSort(mergeSortArray, mergeSortArray.splice(), 0, mergeSortArray.length - 1, animations);
			bubbleSort(bubbleSortArray, animations);
			heapSort(heapSortArray, animations);
			quickSort(quickSortArray, 0, quickSortArray.length - 1, animations);

			array.sort(function(a, b) {
				return a - b;
			});

			let mergeFlag = true;
			let bubbleFlag = true;
			let heapFlag = true;
			let quickFlag = true;

			for (let i = 0; i < array.length; i++) {
				if (array[i] !== mergeSortArray[i]) mergeFlag = false;
				if (array[i] !== bubbleSortArray[i]) bubbleFlag = false;
				if (array[i] !== heapSortArray[heapSortArray.length - 1 - i]) heapFlag = false;
				if (array[i] !== quickSortArray[i]) quickFlag = false;
			}

			if (algorithim === 0) console.log(`MergeSort sorted: ${mergeFlag}`);
			else if (algorithim === 1) console.log(`BubbleSort sorted: ${bubbleFlag}`);
			else if (algorithim === 2) console.log(`HeapSort sorted: ${heapFlag}`);
			else console.log(`QuickSort sorted: ${quickFlag}`);
		}
	}
	render() {
		const { array } = this.state;

		return (
			<div>
				<div className="nav-wrapper">
					<div className="generate-array">
						<button
							id="newarray"
							className="nav-button"
							style={{ display: `block` }}
							onClick={() => {
								this.resetArray();
								const bars = document.getElementsByClassName(`array-bar`);
								for (let i = 0; i < bars.length; i++) bars[i].style.backgroundColor = DEFAULT_COLOUR;
							}}
						>
							New Array
						</button>
					</div>
					<div className="sort-array">
						<button
							id="msort"
							className="nav-button"
							style={{ display: `block` }}
							onClick={() => this.mergeSort()}
						>
							Merge Sort
						</button>
						<button
							id="bsort"
							className="nav-button"
							style={{ display: `block` }}
							onClick={() => this.bubbleSort()}
						>
							Bubble Sort
						</button>
						<button
							id="hsort"
							className="nav-button"
							style={{ display: `block` }}
							onClick={() => this.heapSort()}
						>
							Heap Sort
						</button>
						<button
							id="qsort"
							className="nav-button"
							style={{ display: `block` }}
							onClick={() => this.quickSort()}
						>
							Quick Sort
						</button>
					</div>
					<div className="hide-if-small">
						<p className="brand">AMAN CHHINA</p>
					</div>
				</div>
				<div className="array-container">
					{/* This div is created to have a fixed bar with a height that is the max possible height in the array.
						This then allows the bars to not move while they are written over in Merge Sort */}
					<div
						className="array-fixed-height"
						style={{
							display: `inline-block`,
							height: `${Math.floor(window.innerHeight * HEIGHT_PERCENT) + 5}px`,
							width: `${BAR_WIDTH}px`,
							margin: `0 ${MARGIN}px`
						}}
					/>
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{
								height: `${value}px`,
								width: `${BAR_WIDTH}px`,
								margin: `0 ${MARGIN}px`,
								backgroundColor: DEFAULT_COLOUR
							}}
						/>
					))}
				</div>
			</div>
		);
	}
}

export default SortingVisualizer;
