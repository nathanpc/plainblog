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

		$("#blogBody").append("<div id='articleBody' " + selectedTitle + "><br />" + $(this).find("Content").text() + "</div><br />");

		$("#blogBody").append("<hr class='lineBreak'>");
	});

	$("#blogBody").css("min-height", $("#articleImage").outerHeight());

	param = getParamByName("entry");
	if(param != "null") {
		$(".hidden").remove();
		$(".lineBreak").remove();
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