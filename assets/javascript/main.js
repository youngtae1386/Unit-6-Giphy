$( document ).ready(function() {

// my array
var fighters = ["Anderson Silva", "Fedor Emelianenko", "Georges St. Pierre", "Daniel Cormier", "Royce Gracie", "Khabib Nurmagomedov", "korean zombie","Conor McGregor","Jon Jones"];


function displayGifButtons() {
	$("#gifButtonsView").empty();
	for (var i = 0; i < fighters.length; i++) {
		var gifButton = $("<button>");
		gifButton.addClass("mmaFighter");
		gifButton.addClass("btn btn-primary")
		gifButton.attr("data-name", fighters[i]);
		gifButton.text(fighters[i]);
		$("#gifButtonsView").append(gifButton);
	}
}

function addNewButton() {
	$("#addGif").on("click", function() {
		var mmaFighter = $("#topicInput").val().trim();
		if (mmaFighter == ""){
			return false;
		}
		fighters.push(mmaFighter);

		displayGifButtons();
		return false;
		});
}

function removeLastButton() {
	$("removeLastMma").on("click", function() {
		fighters.pop(mmaFighter);
		displayGifButtons();
		return false;
	});

}


function displayGifs() {
	var mmaFighter = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + mmaFighter + "&api_key=dc6zaTOxFJmzC&limit=10";
	
	$.ajax({
		url: queryURL,
		method: 'GET'
	})

	.done(function(response) {
		$("#removeMma").empty();
		var results = response.data;
		if (results == ""){
			alert("No GIF FOUND! Search again");	
		}
		for (var i = 0; i<results.length; i++){
			var gifDiv = $("<div1>");
			var gifRating = $("<p>").text("Rating " + results[i].rating);
			gifDiv.append(gifRating);

			var mmaImage = $("<img>");
			mmaImage.attr("data-animate", results[i].images.fixed_height_small.url);
			mmaImage.attr("data-still", results[i].images.fixed_height_small_still.url);
			mmaImage.attr("src", results[i].images.fixed_height_small_still.url);
			mmaImage.attr("data-state", "still");
			mmaImage.addClass("image");
			gifDiv.append(mmaImage);
			$("#mma").prepend(gifDiv);
		}
	});
}


displayGifButtons();
addNewButton();
removeLastButton();

$(document).on("click", ".mmaFighter",displayGifs);
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}

	});

});