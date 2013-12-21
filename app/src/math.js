function Point() {

	this.x = null;
	this.y = null;
};

function bezier(p0, p1, p2, p3, t) {

	var p4 = linearInterpolation(p0, p1, t);
	var p5 = linearInterpolation(p1, p2, t);
	var p6 = linearInterpolation(p2, p3, t);
	var p7 = linearInterpolation(p4, p5, t);
	var p8 = linearInterpolation(p5, p6, t);
	var p9 = linearInterpolation(p7, p8, t);

	return p9;
}

function linearInterpolation(p0, p1, t) {

    var xlerp = p0.x + (p1.x - p0.x) * t;
    var ylerp = p0.y + (p1.y - p0.y) * t;

    var newPoint = new Point();
    newPoint.x = xlerp;
    newPoint.y = ylerp;
    return newPoint;
}

function TravelPath() {
	this.P0 = null;
	this.P1 = null;
	this.P2 = null;
	this.P3 = null;

	this.generateRandom = function() {
		
		var constraint = 200;

		this.P0 = new Point();
		this.P0.x = ((game.height + constraint) / 2) - (Math.random() * (game.height+ constraint));
		this.P0.y = game.width / 2;

		this.P1 = new Point();
		this.P1.x = ((game.height + constraint) / 2) - (Math.random() * (game.height + constraint));
		this.P1.y = Math.random() * 100 + 100;

		this.P2 = new Point();
		this.P2.x = ((game.height + constraint) / 2) - (Math.random() * (game.height + constraint));
		this.P2.y = Math.random() * -200 - 50;

		this.P3 = new Point();
		this.P3.x = ((game.height + constraint) / 2) - (Math.random() * (game.height + constraint));
		this.P3.y = (game.width / 2* -1)-50;
	}
};
