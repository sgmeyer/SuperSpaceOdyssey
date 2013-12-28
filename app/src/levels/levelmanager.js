	function LevelManager() {
		var levels = Levels.getAll();
		this.currentLevel = levels[0];
	}

	LevelManager.prototype.getCurrentLevel = function() {
		var levelData = this.currentLevel;

		var level = new Level(levelData);
		level.initialize();

		return level;
	}
