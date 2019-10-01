export function movePoint(point: Array<number>, offset: Array<number>): Array<number> {
	return [
		point[0] + offset[0],
		point[1] + offset[1], 
	]
}