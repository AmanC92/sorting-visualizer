export function mergeSort(array, tempArray, start, end, animations) {
	const middle = Math.floor((start + end) / 2);

	// Base case
	if (start >= end) return;
	else {
		// Array can be divided, divide array and call mergeSort() again
		mergeSort(array, tempArray, start, middle, animations);
		mergeSort(array, tempArray, middle + 1, end, animations);
	}

	// Sort divided arrays
	sortArray(array, tempArray, start, middle, end, animations);
}

function sortArray(array, tempArray, start, middle, end, animations) {
	let index = start;
	let firstHalf = start;
	let secondHalf = middle + 1;

	// As long as we haven't reach the end of the first half of the array
	// or the second half, continue to compare values
	while (firstHalf <= middle && secondHalf <= end) {
		// Pushes index of what bars are being compared so
		// they can be shown as 'comparison' colour
		animations.push([ firstHalf, secondHalf ]);
		// Pushes same index again to change colour of bars being
		// compared to new 'sorted' colour
		animations.push([ firstHalf, secondHalf ]);

		// Compare values between the first and second half of the array
		// and update the tmeporary array accordingly to whichever value is lower
		if (array[firstHalf] <= array[secondHalf]) {
			tempArray[index] = array[firstHalf];

			// Pushes the index of the bar to be changed along with it's
			// new corresponding height value
			animations.push([ index, array[firstHalf] ]);

			firstHalf++;
		} else {
			tempArray[index] = array[secondHalf];

			// Pushes the index of the bar to be changed along with it's
			// new corresponding height value
			animations.push([ index, array[secondHalf] ]);

			secondHalf++;
		}

		index++;
	}

	// If there are any leftover elements in the first half
	// copy them into the temporary array
	if (firstHalf <= middle) {
		for (let i = firstHalf; i <= middle; i++) {
			tempArray[index] = array[i];

			// Pushes index of what bars are being compared so
			// they can be shown as 'comparison' colour
			animations.push([ i, i ]);

			// Pushes same index again to change colour of bars being
			// compared to new 'sorted' colour
			animations.push([ i, i ]);

			// Pushes the index of the bar to be changed along with it's
			// new corresponding height value
			animations.push([ index, array[i] ]);

			index++;
		}
	}

	// If there are any leftover elements in the second half
	// copy them into the temporary array
	if (secondHalf <= end) {
		for (let i = secondHalf; i <= end; i++) {
			tempArray[index] = array[i];

			// Pushes index of what bars are being compared so
			// they can be shown as 'comparison' colour
			animations.push([ i, i ]);

			// Pushes same index again to change colour of bars being
			// compared to new 'sorted' colour
			animations.push([ i, i ]);

			// Pushes the index of the bar to be changed along with it's
			// new corresponding height value
			animations.push([ index, array[i] ]);

			index++;
		}
	}

	// Copy the now sorted interval in the temporary array to the main array
	for (let i = start; i <= end; i++) {
		array[i] = tempArray[i];
	}
}

export function bubbleSort(array, animations) {
	let flag = true;
	let loopCount = 1;
	let temp;

	while (flag) {
		flag = false;

		for (let i = 0; i < array.length - loopCount; i++) {
			animations.push([ i, i + 1 ]);
			animations.push([ i, i + 1 ]);

			if (array[i] > array[i + 1]) {
				flag = true;

				animations.push([ true, i, i + 1, array[i], array[i + 1] ]);

				temp = array[i];
				array[i] = array[i + 1];
				array[i + 1] = temp;
			} else {
				animations.push([ false, i, i + 1, array[i], array[i + 1] ]);
			}
		}
		loopCount++;
	}
}

export function heapSort(array, animations) {
	let heap = [ null ];

	for (let i = 0; i < array.length; i++) {
		heapInsert(heap, array[i], animations);
	}

	for (let i = 0; i < array.length; i++) {
		array[i] = heapRemove(heap, i, animations);
	}
}

function heapInsert(heap, num, animations) {
	heap.push(num);

	// #########################################################################
	// This is for the case when the number is just inserted into the heap array
	// #########################################################################
	// Comparison animation pushed to change bar to comparison colour
	animations.push([ heap.length - 2, heap.length - 2 ]);
	// Comparison animation pushed again to change bar to sorted colour
	animations.push([ heap.length - 2, heap.length - 2 ]);
	// Index and height of bars pushed to be swapped
	animations.push([ heap.length - 2, heap.length - 2, num, num ]);

	if (heap.length > 2) {
		let childNode = heap.length - 1;
		let parentNode = Math.floor(childNode / 2);

		while (heap[childNode] > heap[parentNode]) {
			// Comparison animation pushed to change bar to comparison colour
			animations.push([ childNode - 1, parentNode - 1 ]);
			// Comparison animation pushed again to change bar to sorted colour
			animations.push([ childNode - 1, parentNode - 1 ]);
			// Index and height of bars pushed to be swapped
			animations.push([ childNode - 1, parentNode - 1, heap[childNode], heap[parentNode] ]);

			[ heap[childNode], heap[parentNode] ] = [ heap[parentNode], heap[childNode] ];

			childNode = parentNode;
			parentNode = Math.floor(childNode / 2);

			if (childNode <= 1) break;
		}
	}
}

function heapRemove(heap, iteration, animations) {
	let largest = heap[1];

	if (heap.length > 1) {
		let parentNode = 1;
		let childNodeLeft = 2 * parentNode;
		let childNodeRight = 2 * parentNode + 1;

		// Comparison animation pushed to change bar to comparison colour
		animations.push([ heap.length - 2, 0 ]);
		// Comparison animation pushed again to change bar to sorted colour
		animations.push([ heap.length - 2, 0 ]);
		// Index and height of bars pushed to be swapped
		animations.push([ heap.length - 2, 0, heap[heap.length - 1], largest ]);

		heap[1] = heap[heap.length - 1];
		heap.splice(heap.length - 1);

		if (heap.length === 2) {
		} else if (heap.length === 3) {
			if (heap[parentNode] < heap[childNodeLeft]) {
				// Comparison animation pushed to change bar to comparison colour
				animations.push([ childNodeLeft - 1, parentNode - 1 ]);
				// Comparison animation pushed again to change bar to sorted colour
				animations.push([ childNodeLeft - 1, parentNode - 1 ]);
				// Index and height of bars pushed to be swapped
				animations.push([ childNodeLeft - 1, parentNode - 1, heap[childNodeLeft], heap[parentNode] ]);

				[ heap[parentNode], heap[childNodeLeft] ] = [ heap[childNodeLeft], heap[parentNode] ];
			}
		} else {
			while (heap[parentNode] <= heap[childNodeLeft] || heap[parentNode] <= heap[childNodeRight]) {
				if (heap[childNodeLeft] > heap[childNodeRight]) {
					// Comparison animation pushed to change bar to comparison colour
					animations.push([ childNodeLeft - 1, parentNode - 1 ]);
					// Comparison animation pushed again to change bar to sorted colour
					animations.push([ childNodeLeft - 1, parentNode - 1 ]);
					// Index and height of bars pushed to be swapped
					animations.push([ childNodeLeft - 1, parentNode - 1, heap[childNodeLeft], heap[parentNode] ]);

					[ heap[parentNode], heap[childNodeLeft] ] = [ heap[childNodeLeft], heap[parentNode] ];
					parentNode = childNodeLeft;
				} else {
					// Comparison animation pushed to change bar to comparison colour
					animations.push([ childNodeRight - 1, parentNode ]);
					// Comparison animation pushed again to change bar to sorted colour
					animations.push([ childNodeRight - 1, parentNode ]);
					// Index and height of bars pushed to be swapped
					animations.push([ childNodeRight - 1, parentNode - 1, heap[childNodeRight], heap[parentNode] ]);

					[ heap[parentNode], heap[childNodeRight] ] = [ heap[childNodeRight], heap[parentNode] ];
					parentNode = childNodeRight;
				}
				childNodeLeft = 2 * parentNode;
				childNodeRight = 2 * parentNode + 1;

				if (heap[childNodeLeft] === undefined || heap[childNodeRight] === undefined) break;
			}
		}
	} else return null;

	return largest;
}

export function quickSort(array, start, end, animations) {
	let pivotIndex = end;

	if (end - start < 1) return;

	pivotIndex = quickSortPartition(array, start, end, animations);

	animations.push([ pivotIndex, end ]);
	animations.push([ pivotIndex, end ]);
	animations.push([ pivotIndex, end, array[pivotIndex], array[end] ]);

	let temp = array[pivotIndex];
	array[pivotIndex] = array[end];
	array[end] = temp;

	// Sorting left of pivot index
	quickSort(array, start, pivotIndex - 1, animations);
	// Sorting right of pivot index
	quickSort(array, pivotIndex + 1, end, animations);
}

function quickSortPartition(array, start, end, animations) {
	let leftIndex = start;
	let rightIndex = end - 1;
	let pivotIndex = end;

	while (leftIndex <= rightIndex) {
		while (array[leftIndex] < array[pivotIndex]) {
			animations.push([ leftIndex, pivotIndex ]);
			animations.push([ leftIndex, pivotIndex ]);
			animations.push([ leftIndex, pivotIndex, array[pivotIndex], array[leftIndex] ]);

			leftIndex++;
		}

		while (array[rightIndex] > array[pivotIndex]) {
			animations.push([ rightIndex, pivotIndex ]);
			animations.push([ rightIndex, pivotIndex ]);
			animations.push([ rightIndex, pivotIndex, array[pivotIndex], array[rightIndex] ]);

			rightIndex--;
		}
		if (leftIndex <= rightIndex) {
			animations.push([ leftIndex, rightIndex ]);
			animations.push([ leftIndex, rightIndex ]);
			animations.push([ leftIndex, rightIndex, array[leftIndex], array[rightIndex] ]);

			let temp = array[leftIndex];
			array[leftIndex] = array[rightIndex];
			array[rightIndex] = temp;

			leftIndex++;
			rightIndex--;
		}
	}
	pivotIndex = leftIndex;

	return pivotIndex;
}
