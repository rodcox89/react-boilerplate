function debugEnabled() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
	function(m,key,value) {
		vars[key] = value;
	});
	if(vars['debug']){
		return true;
	}
	return false;
}

module.exports = {
	api_base_url: 'http://opsapi.riskrecon.com/',
	api_version: 'v1',
	debug: debugEnabled()
}
