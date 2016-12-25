$(document).ready(function() {
$("#post-button").click(function (e) {
    e.preventDefault();
    $("#toggle-form").slideToggle();
});

var form = $("#bbs-form");

form.submit(function (event) {
    event.preventDefault();
	var titleInput = $("#title");
	var contentInput = $("#content");

	var newTitle = titleInput.val();
	var newContent = contentInput.val();

	$.ajax({
      		type: 'POST',
      		url: "/bbs",
      		contentType: 'application/json',
      		data: JSON.stringify({
                    title: newTitle,
                    content: newContent
                })
      	}).then(function (responseMessage) {
        		var newContent = $("#new");
    				newContent.append("<tr><td>" + responseMessage.bbs.title + 
    					"</td><td>" + responseMessage.bbs.content + "</td></tr>"); 
        });	      
});
});