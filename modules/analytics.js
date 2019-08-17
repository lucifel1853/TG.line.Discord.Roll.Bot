// Load `*.js` under roll directory as properties
//  i.e., `User.js` will become `exports['User']` or `exports.User`
require('fs').readdirSync('./roll/').forEach(function (file) {
	if (file.match(/\.js$/) !== null && file !== 'index.js') {
		var name = file.replace('.js', '');
		exports[name] = require('../roll/' + file);
	}
});
try {

	//用來呼叫骰組,新增骰組的話,要寫條件式到下面呼叫 
	//格式是 exports.骰組檔案名字.function名
	function parseInput(inputStr) {
		//console.log('InputStr: ' + inputStr);
		_isNaN = function (obj) {
			return isNaN(parseInt(obj));
		}

		let msgSplitor = (/\S+/ig);
		let mainMsg = inputStr.match(msgSplitor); //定義輸入字串
		let trigger = mainMsg[0].toString().toLowerCase(); //指定啟動詞在第一個詞&把大階強制轉成細階

		if (trigger.match(/^成長$/) != null && mainMsg[1] <= 1000) { //ccb指令開始於此
			//DevelopmentPhase幕間成長指令開始於此
			if ((trigger == '成長') && mainMsg[1] <= 1000) return exports.coc.DevelopmentPhase(mainMsg[1], mainMsg[2]);
		}
		else if (trigger.match(/^成長$/) != null && mainMsg[2] <= 1000) { //ccb指令開始於此
			//DevelopmentPhase幕間成長指令開始於此
			if ((trigger == '成長') && mainMsg[2] <= 1000) return exports.coc.DevelopmentPhase(mainMsg[2], mainMsg[1]);
		}
	}

} catch (e) {
	console.log('error: ' + e)
}

module.exports = {
	parseInput: parseInput
};
