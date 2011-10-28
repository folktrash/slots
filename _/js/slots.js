 var slots = window.SLOTS || {};//namespace

SLOTS = function () {
	var slots = {
		total: 5,
		match: 3,
		matchCount: 1,
		winner: false,
		seed: [],
		currentt: [],
		numberRange: 20
	}
	var strings = {
		winText: 'yes',
		loseText: 'nope',
		resultsID: 'results',
		setTotalID: 'set-total',
		setMatchID: 'set-match'
	}
	var dom = {}
	var boot = function () {
		dom.results = $('#' + strings.resultsID);
		dom.setTotal = $('#' + strings.setTotalID);
		dom.setMatch = $('#' + strings.setMatchID);
		$('#play').click(function () {
			go();
		});
	}
	var go = function () {
		extendSettings();
		buildSeed();
	}
	var extendSettings = function () {
		if (dom.setTotal.attr('value')) {slots.total = dom.setTotal.attr('value')}
		if (dom.setMatch.attr('value')) {slots.match = dom.setMatch.attr('value')}
	}
	var buildSeed = function () {
		slots.seed = null;
		slots.seed = [];
		for (var i = 0; i < slots.total; i++) {
		    slots.seed.push(0);
			if (i == slots.total - 1) {generationSlots()}
		}
	}
	var generationSlots = function () {
		slots.currentt = null;
		slots.currentt = [];
		slots.seed.forEach(function (value,count) {
			slots.currentt.push(getRandom());
			if (slots.currentt.length == slots.seed.length) {processSlots()}
		});
	}
	var processSlots = function () {
		console.time('processSlots');
		for (var i=0; i < slots.currentt.length; i++) {
			if (slots.currentt[i] == slots.currentt[i - 1]) {
				slots.matchCount++
				if (slots.matchCount == slots.match) {report(true);return;}//hit the magic number?
			} else {
				slots.matchCount = 1;//no match, reset
			}
			if (i == slots.currentt.length - 1) {report(false)}//call report even if no win :(
		}
	}
	var report = function (won) {
		console.timeEnd('processSlots');
		if (won) {
			plopDom(true);
			slots.winner = true;
		} else {
			plopDom();
			slots.winner = false;
		}
	}
	var plopDom = function (winner) {
		var message = (winner) ? strings.winText : strings.loseText;
		//dom.results.prepend('<tr><td>' + slots.currentt + '</td><td>' + message + '</td></tr>');
		dom.results.prepend('<li class="' + message + '"><h2>' + slots.currentt + '</h2><h3>' + message + '</h3></li>');
	}
	var getRandom = function () {
		//return getLetterSwap(Math.floor(Math.random() * slots.numberRange));
		return Math.floor(Math.random() * slots.numberRange)
	}
	var getLetterSwap = function (value) {//make like cards //only if slots.numberRange = 13
		if (value == 11) 		{ value = 'J';
		} else if (value == 12) { value = 'Q';
		} else if (value == 13) { value = 'K';
		} else if (value == 1) 	{ value = 'A';
		}
		return value
	}
	return {boot:boot}
}();
SLOTS.Dev = function () {
	var debug = true;
	var log = function (msg) {if (typeof (console) != "undefined" && debug) {console.log(msg);}}
	return {log: log}
}();








