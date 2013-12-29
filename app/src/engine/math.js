function Point(x, y) {
	this.x = x || null;
	this.y = y || null;
};

Math.bezier = function(p0, p1, p2, p3, t) {
	var p4 = Math.linearInterpolation(p0, p1, t);
	var p5 = Math.linearInterpolation(p1, p2, t);
	var p6 = Math.linearInterpolation(p2, p3, t);
	var p7 = Math.linearInterpolation(p4, p5, t);
	var p8 = Math.linearInterpolation(p5, p6, t);
	var p9 = Math.linearInterpolation(p7, p8, t);

	return p9;
}

Math.linearInterpolation = function(p0, p1, t) {
  var xlerp = p0.x + (p1.x - p0.x) * t;
  var ylerp = p0.y + (p1.y - p0.y) * t;

  var newPoint = new Point();
  newPoint.x = xlerp;
  newPoint.y = ylerp;
  return newPoint;
}

function TravelPath() {
	this.P0 = undefined;
	this.P1 = undefined;
	this.P2 = undefined;
	this.P3 = undefined;
};

TravelPath.generateRandomPath = function() {
		var constraint = 200 * game.scale;
		var travelPath = new TravelPath();

		var p0 = new Point();
		p0.x = game.width;
		p0.y = game.height - (Math.random() * (game.height + constraint) - constraint/2);

		var p1 = new Point();
		p1.x = game.width * .33;
		p1.y = game.height - (Math.random() * (game.height + constraint) - constraint/2);

		var p2 = new Point();
		p2.x = game.width * .66;
		p2.y = game.height - (Math.random() * (game.height + constraint) - constraint/2);

		var p3 = new Point();
		p3.x = 0;
		p3.y = game.height - (Math.random() * (game.height + constraint) - constraint/2);
		
		var travelPath = new TravelPath();
		travelPath.P0 = p0;
		travelPath.P1 = p1;
		travelPath.P2 = p2;
		travelPath.P3 = p3;

		return travelPath;
	};

	TravelPath.generateStraightPathToRight = function(startPoint, entityWidth) {
		var p1 = new Point();
		p1.x = (game.width - startPoint.x) * .33 + startPoint.x;
		p1.y = startPoint.y;

		var p2 = new Point();
		p2.x = (game.width - startPoint.x) * .66 + startPoint.x;
		p2.y =  startPoint.y;

		var endPoint = new Point();
		endPoint.x = (game.width - startPoint.x) + startPoint.x;
		endPoint.y = startPoint.y;

		var travelPath = new TravelPath();
		travelPath.P0 = startPoint;
		travelPath.P1 = p1;
		travelPath.P2 = p2;
		travelPath.P3 = endPoint;

		return travelPath;
	};

	TravelPath.generateStraightPathToLeft = function(startPoint, entityWidth) {

		startPoint.x -= entityWidth;

		var p1 = new Point();
		p1.x = (startPoint.x - entityWidth) * .66;
		p1.y = startPoint.y;

		var p2 = new Point();
		p2.x = (startPoint.x - entityWidth) * .33;
		p2.y =  startPoint.y;

		var endPoint = new Point();
		endPoint.x = -entityWidth;
		endPoint.y = startPoint.y;

		var travelPath = new TravelPath();
		travelPath.P0 = startPoint;
		travelPath.P1 = p1;
		travelPath.P2 = p2;
		travelPath.P3 = endPoint;

		return travelPath;
	};
