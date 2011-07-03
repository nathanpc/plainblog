// entry_param.js
// Captures the url parameter and parse it

function getParamByName(name) {
	return decodeURIComponent((RegExp(name + "=" + "(.+?)(&|$)").exec(location.search)||[,null])[1]);
}