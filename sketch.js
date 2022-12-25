let cx = 10
let cy = 8
let colors = ["ff595e", "ffca3a", "8ac926", "1982c4", "6a4c93"]
let setter = 0
let clicks = 0

let squares = [[], [], [], [], [], [], [], [], [], []]
let findColorCell = function (x, y) {
	let up, down, left, right;
	if (x > 0 && squares[x - 1][y]) { left = squares[x - 1][y] }
	if (x < cx - 1 && squares[x + 1][y]) { right = squares[x + 1][y] }
	if (y > 0 && squares[x][y - 1]) { up = squares[x][y - 1] }
	if (y < cy - 1 && squares[x][y + 1]) { down = squares[x][y + 1] }
	let filling = false
	if (up && up.state == '' && up.color == colors[setter]) {
		up.state = 'control'
		findColorCell(up.x, up.y)
	}
	if (down && down.state == '' && down.color == colors[setter]) {
		down.state = 'control'
		findColorCell(down.x, down.y)
	}
	if (left && left.state == '' && left.color == colors[setter]) {
		left.state = 'control'
		findColorCell(left.x, left.y)
	}
	if (right && right.state == '' && right.color == colors[setter]) {
		right.state = 'control'
		findColorCell(right.x, right.y)
	}
	if ( (!up || (up.state == 'control' || up.state == 'filling')) &&
	(!down || (down.state == 'control' || down.state == 'filling')) &&
	(!left || (left.state == 'control' || left.state == 'filling')) &&
	(!right || (right.state == 'control' || right.state == 'filling')) ) {
		squares[x][y].state = 'filling'
	}

}
let w = 400 / cx
function setup() {
	createCanvas(400, 400);
	noLoop()
	noStroke()
	//textAlign(CENTER, CENTER)
	setter = floor(random(colors.length))
	for (let i = 0; i < cy; i++) {
		for (let j = 0; j < cx; j++) {
			squares[j].push({
				x:j,y:i,
				color: random(colors),
				state: i == 0 && j == 0 ? 'control' : ''
			})
		}
	}
}

function draw() {
	background(220);
	for (let row = 0; row < squares.length; row++) {
		squares[row].forEach((s, i) => {
			if (s.state == 'control') {
				findColorCell(row,i)
			}
			let colorSetted = s.state == 'control' || s.state == 'filling' ? colors[setter] : s.color
			fill('#' + colorSetted)
			rect(row * w, i * w, w)
		})
	}
	/*for (let row = 0; row < squares.length; row++) {
		squares[row].forEach((s, i) => {
			fill(0)
			textSize(w*2)
			text(
				s.state ? s.state[0] : '',
				row * w + w / 2, i * w + w / 2)
			})}*/
	fill(0)
	text(`clicks: ${clicks}`, 5, 335)
	for (let c = 0; c < colors.length; c++) {
		fill('#' + colors[c])
		rect(c * 80, height, 80, -60)
	}
}

function mouseClicked() {
	let colorClicked = floor(mouseX / 80)
	if (mouseY < height - 60 || colorClicked >= colors.length) return
	//console.log(floor(mouseX/80))
	setter = colorClicked
	clicks++
	redraw()
}