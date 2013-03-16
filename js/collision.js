function collides(a, b) {

	var a_x = (a.y * -1) + (game.width/2) - a.width;
	var a_y = a.x + (game.height/2);
	var a_width = a.height;
	var a_height = a.width;

	var b_x = b.y + (game.width/2);
	var b_y = (b.x * -1) + (game.height/2) - b.height;	

	return a_x < b_x + b.width &&
			a_x + a.width > b_x &&
			a_y < b_y + b.height &&
			a_y + a.height > b_y;
}