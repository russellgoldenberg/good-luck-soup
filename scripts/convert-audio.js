var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');

var _directory = '../story-audio-convert/';
var _files;
var _len;

var mp3ify = function(params, cb) {
	var mp3 = ffmpeg(params.filepath)
		.audioCodec('libmp3lame')
		.audioBitrate('64k')
		.audioChannels(1)
		.format('mp3')
		.on('end', function() {
			console.log('mp3-ed');
			cb();
		})
		.on('error', function(err) {
			console.log('error: ' + err.message);
			cb();
		})
		.save(params.outpath + '.mp3');
};	

var convert = function(i) {
	if(_files[i] !== '.DS_Store') {
		var params = {
			filepath: _directory + _files[i],
			outpath: '../story-audio-output/' + _files[i]
		};

		var dotIndex = params.outpath.lastIndexOf('.');
		params.outpath = params.outpath.substring(params.outpath, dotIndex);


		mp3ify(params, function() {
			next(i);
		});
	} else {
		next(i);
	}
};

var next = function(i) {
	i++;
	if(i < _len) {
		convert(i);
	} else {
		console.log('-- done --');
	}
};

var init = function() {
	fs.readdir(_directory, function(err, arr) {
		if(err) {
			console.log(err);
		} else {
			_files = arr;
			_len = _files.length;
			convert(0);
		}
	});
};

init();