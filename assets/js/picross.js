new Vue({
	el: '#picross',
	
	data: {
		single_cell: 0,

		css_classes: {
			'-1': 'crossed',
			0: 'empty',
			1: 'filled',
		},

		solution: [
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
			[0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
			[1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
			[1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
		],

		grid: [
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		],

		gride_size: {x: 10, y: 10},
	},

	computed: {
		valid: function() {
			var grid = this.grid,
				solution = this.solution,
				valid = true;

			for (var line_key = solution.length - 1; line_key >= 0; line_key--) {
				var line = solution[line_key];

				for (var cell_key = line.length - 1; cell_key >= 0; cell_key--) {
					var solution_cell = line[cell_key];

					if (solution_cell < 1) {
						if (grid[line_key][cell_key] > 0) {
							valid = false;
							break;
						};
					} else {
						if (solution_cell != grid[line_key][cell_key]) {
							valid = false;
							break;
						};
					}
				};
			};

			return valid;
		},

		hints: function() {
			var solution = this.solution,
				x = [],
				y = [];

			var size = 0;

			for (var i = solution.length - 1; i >= 0; i--) {
				x.push(this.getHint(solution[i]));

				size = solution[i].length;
			};

			for (var j = 0; j < size; j++) {
				var _y = [];
				for (var k = solution.length - 1; k >= 0; k--) {
					var line = solution[k];

					_y.push(line[j]);
				};
				y.push(this.getHint(_y));
			};

			return {
				x: x,
				y: y,
			};
		},
	},

	methods: {
		updateCell: function(event, line_key, cell_key, right_click) {
			event.preventDefault();

			var old_value = this.grid[line_key][cell_key],
				new_value = (right_click) ? -1 : 1;

			if (old_value == new_value) {
				new_value = 0;
			}

			this.setCellValue(line_key, cell_key, new_value);
		},

		setCellValue: function(line_key, cell_key, value) {
			var line = this.grid[line_key],
				cell = line[cell_key];

			line.$set(cell_key, value);

			this.grid.$set(line_key, line);
		},

		getCellCssClasses: function(value) {
			var cell_class = this.css_classes[value];
			return ['cell', cell_class];
		},

		getHint: function(array) {
			var hint = [0];
			for (var i = array.length - 1; i >= 0; i--) {
				var value = array[i];

				if (value == 1) {
					hint[hint.length - 1]++;
				} else {
					hint.push(0);
				}
			};

			hint = hint.filter(function(item) {
				return item > 0;
			});

			return hint;
		},
	},

	ready: function () {

	},
})