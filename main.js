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
		$("#blogBody").append("<h1 id='articleTitle'>" + $(this).find("Title").text() + "</h1>");
		$("#blogBody").append("<div id='articleAuthor'>" + $(this).attr("author") + "  -  " + $(this).find("Date").text() + "</div><br />");
		$("#blogBody").append("<img id='articleImage' class='float' src='" + $(this).find("Image").text() + "' />");
		$("#blogBody").append("<div id='articleBody'><br />" + $(this).find("Content").text() + "</div><br />");
		$("#blogBody").append("<hr class='lineBreak'>");
	});

	$("#blogBody").css("min-height", $("#articleImage").outerHeight());
	$(".lineBreak").filter(":last").remove();
}

function appendHeader(title, subtitle) {
	$("#blogHeader").append("<h1 id='blogTitle'><b>" + title + "</b></h1><h2 id='blogSubTitle'>" + subtitle + "</h2><p></p>");
}

function appendHeadNav(xml) {
	$(xml).find("Item").each(function() {
		$("#headNavBar").append("<a id='navItem' href='" + $(this).find("Link").text() + "'>" + $(this).attr("name") + "</a>");
		$("#headNavBar").append("<span class='navItemSep'> | </span>");
	});

	$(".navItemSep").filter(":last").remove();
}