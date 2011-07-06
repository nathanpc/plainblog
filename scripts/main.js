// main.js
// Main stuff for the blog functionality

$(document).ready(function() {
	appendHeader(blogTitle, blogSubTitle);
	
	$.ajax({
		type: "GET",
		url: "variables/headNav.xml",
		dataType: "xml",
		success: appendHeadNav,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Error: " + errorThrown);
		}
	});
	
	$.ajax({
		type: "GET",
		url: "feed.xml",
		dataType: "xml",
		success: parseXML,
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Error: " + errorThrown);
		}
	});
});

function parseXML(xml) {
	$(xml).find("Entry").each(function() {
		var selectedTitle = null;
		var title = $(this).find("Title").text();
		var param = getParamByName("entry");

		if(param = "null") {
			selectedTitle = "class='selected'";
		}
		if(title != getParamByName("entry")) {
			selectedTitle = "class='hidden'";
		} else {
			selectedTitle = "class='selected'";
		}
		$("#blogBody").append("<h1 id='articleTitle' " + selectedTitle + "><a href='?entry=" + escape($(this).find("Title").text()) + "' class='linkTitle'>" + $(this).find("Title").text() + "</a></h1>");

		$("#blogBody").append("<div id='articleAuthor' " + selectedTitle + ">" + $(this).attr("author") + "  -  " + $(this).find("Date").text() + "</div><br />");

		$("#blogBody").append("<img id='articleImage' " + selectedTitle + " src='" + $(this).find("Image").text() + "' />");

		$("#blogBody").append("<div id='articleBody' " + selectedTitle + "><br />" + $(this).find("Content").text() + "</div><br class='break' />");

		$("#blogBody").append("<hr class='lineBreak'>");
	});

	$("#blogBody").css("min-height", $("#articleImage").outerHeight());

	param = getParamByName("entry");
	if(param != "null") {
		document.title = $(".linkTitle").text() + " - " + blogTitle;
		$(".hidden").remove();
		$(".lineBreak").remove();
		$(".break").remove();
		$("#articleTitle").prevAll("br").remove();
		$("#blogBody").append("<a href='http://twitter.com/share' class='twitter-share-button' data-url='" + window.location.href + "' data-text='" + $(".linkTitle").text() + "' data-count='vertical' data-via='nathanpc'>Tweet</a><script type='text/javascript' src='http://platform.twitter.com/widgets.js'></script>");
		$("#blogBody").append(" <iframe src='http://www.facebook.com/plugins/like.php?app_id=217624258276389&amp;" + window.location.href + "&amp;send=false&amp;layout=box_count&amp;width=50&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=60' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:50px; height:60px;' allowTransparency='true'></iframe>");
		$("#blogBody").append(" <script type='text/javascript' src='https://apis.google.com/js/plusone.js'></script><g:plusone size='tall' href='" + window.location.href + "'></g:plusone>");
	}

	$(".lineBreak").filter(":last").remove();
}

function appendHeader(title, subtitle) {
	$("#blogHeader").append("<a href='index.html' class='titleLink'><h1 id='blogTitle'><b>" + title + "</b></h1><h2 id='blogSubTitle'>" + subtitle + "</h2></a><p></p>");
}

function appendHeadNav(xml) {
	$(xml).find("Item").each(function() {
		$("#headNavBar").append("<a id='navItem' href='" + $(this).find("Link").text() + "'>" + $(this).attr("name") + "</a>");
		$("#headNavBar").append("<span class='navItemSep'> | </span>");
	});

	$(".navItemSep").filter(":last").remove();
}