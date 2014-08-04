var fields = [{field:'last name',start:1,end:10,width:10},{field:'first name',start:11,end:18,width:8},{field:'middle initial',start:19,end:19,width:1},{field:'relocation project',start:20,end:20,width:1},{field:'assembly center',start:21,end:21,width:1},{field:'last permament address',start:22,end:26,width:5},{field:'last permanent address state',start:22,end:23,width:2},{field:'last permanent address county',start:24,end:25,width:2},{field:'last permament address population density',start:26,end:26,width:1},{field:'birthplace of parents',start:27,end:27,width:1},{field:'fathers occupation in u.s.',start:28,end:28,width:1},{field:'fathers occupation abroad',start:29,end:29,width:1},{field:'total years of schooling in japan',start:30,end:30,width:1},{field:'years of schooling in japan',start:31,end:31,width:1},{field:'educational degrees',start:32,end:32,width:1},{field:'year of first arrival in territorial u.s.',start:33,end:34,width:2},{field:'total length of time in japan',start:35,end:35,width:1},{field:'number of times in japan',start:36,end:36,width:1},{field:'age at time in japan',start:37,end:37,width:1},{field:'military and naval service, public assistance and pensions, physical defects',start:38,end:38,width:1},{field:'individual number',start:39,end:44,width:6},{field:'sex and marital status',start:45,end:45,width:1},{field:'race of individual and spouse',start:46,end:46,width:1},{field:'year of birth',start:47,end:48,width:2},{field:'birth place',start:49,end:50,width:2},{field:'alien registration number, social security number, and japanese language school',start:51,end:51,width:1},{field:'highest grade completed or grade attending',start:52,end:52,width:1},{field:'language',start:53,end:53,width:1},{field:'religion',start:54,end:54,width:1},{field:'primary occupation',start:55,end:57,width:3},{field:'secondary occupation',start:58,end:60,width:3},{field:'tertiary occupation',start:61,end:53,width:3},{field:'potential occupation 1',start:64,end:66,width:3},{field:'potential occupation 2',start:67,end:69,width:3},{field:'file number',start:70,end:75,width:6},{field:'blank 1',start:76,end:80,width:5}];

var fs = require('fs');

var output = fs.createWriteStream('camp-data-output.csv');
var campData = fs.readFileSync('camp-data.txt').toString().split('\n');

for(var i = 0; i < campData.length; i++) {
	var d = campData[i];
	var str = '';
	for(var f = 0; f < fields.length; f++) {
		var title = fields[f].field,
			start = fields[f].start - 1,
			end = fields[f].end;

		str += '"' + d.substring(start,end) + '",';
	}
	console.log(i);
	output.write(str + '\n');
}

output.on('error', function(err) {
	console.log(err);
});

output.end();