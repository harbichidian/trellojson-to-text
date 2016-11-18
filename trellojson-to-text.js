if(!process.argv[2]) {
	console.log("Please provide a JSON file!");
	return;
}

var fs = require("fs");

var board = JSON.parse(fs.readFileSync(process.argv[2]));

board.lists.filter(l => !l.closed)
.sort(function(a, b) {
	if(a.pos < b.pos) return -1;
	if(a.pos == b.pos) return 0;
	if(a.pos > b.pos) return 1;
})
.forEach(function(list) {
	console.log(`${list.name}:`);
	
	board.cards.filter(c => (c.idList == list.id) && !c.closed)
	.sort(function(a, b) {
		if(a.pos < b.pos) return -1;
		if(a.pos == b.pos) return 0;
		if(a.pos > b.pos) return 1;
	})
	.forEach(function(card) {
		console.log(`- ${card.name}`);
		
		if(card.badges.comments > 0) {
			let comments = board.actions.filter(a => a.type == "commentCard" && a.data.card.id == card.id)
			.sort((a, b) => {
				let ad = Date.parse(a.data.date);
				let bd = Date.parse(b.data.date);
				
				if(ad < bd) return -1;
				if(ad == bd) return 0;
				if(ad > bd) return 1;
			});
			
			console.log(`  (${comments[comments.length - 1].data.text})`);
		}
		
		if(list.name != "Completed" && card.idChecklists.length != 0) {
			board.checklists.filter(cl => cl.idCard == card.id).forEach(function(checklist) {
				if(checklist.name != "Checklist") console.log(`  ${checklist.name}:`);
				
				checklist.checkItems.forEach(function(checkItem) {
					console.log(`  [${checkItem.state == "complete" ? "x" : " "}] ${checkItem.name}`);
				});
			});
		}
	});
	
	console.log("");
});
