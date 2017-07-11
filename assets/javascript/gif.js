console.log("im rdy");

var sports_arr = ["crossfit", "speedwalking", "soccer", "basketball", "softball", "baseball", "pool", "poker", 
	"running", "jogging", "skating", "rollerskating", "swiming", "bowling", "waterski"];

var images_arr = [];

$(document).ready( function() {
	for (var i = 0; i < sports_arr.length; i++) {
		create_button( sports_arr[i]);
	}

});

$("#button_div").on("click", ".button_style", function() {

	$("#images_div").empty();
	images_arr = [];

	console.log(this.value + " pressed");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + this.value + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
    	url: queryURL,
    	method: 'GET'
    }).done(function(response) {

    	display_images(response);

    });
});

$("#images_div").on("click", ".img", function(){
	console.log(this);
	console.log("i was clicked: " + this.alt);
	var index = parseInt(this.alt)
	if (images_arr[index].flag) 
		this.src = images_arr[index].gif_url;
	else 
		this.src = images_arr[index].still_img;
	

	images_arr[index].flag = !images_arr[index].flag;

});


function display_images(json_response) {
	console.log(json_response);
	var gif_url;
	var rating;
	var still_img;
	var height;
	var width;
	var image_obj = {};

	for (var i = 0; i < json_response.data.length; i++) {
		
		image_obj.gif_url = json_response.data[i].images.fixed_height.url;
		image_obj.rating = json_response.data[i].rating;
		image_obj.still_img = json_response.data[i].images.fixed_height_still.url;
		image_obj.height = json_response.data[i].images.fixed_height_still.height;
		image_obj.width = json_response.data[i].images.fixed_height_still.width;
		image_obj.flag = true;
		

		// push to imaes array to use later when clicling on images 
		images_arr.push(image_obj);
		// empty the object in order to create a new one, tho i dont know if is necessary
		image_obj = {};
	}

	var outter_div;
	var rating_div;
	var image_div;

	for (var i = 0; i < images_arr.length; i++) {
		
		outter_div = $("<div class='image_class' style='float:left;' >  " );
		rating_div = $("<p>").text("Rating: " + images_arr[i].rating);
		image_div = $('<img alt="'+i+'" class="img-thumbnail img" src=' + images_arr[i].still_img + ' style="width:' + images_arr[i].width + 'px;height:' + images_arr[i].height +'px;" >');

		outter_div.append(rating_div);
		outter_div.append(image_div);

		$("#images_div").append(outter_div);
	}
		
}

function valid_req (req) {
	
	var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + req + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
    	url: queryURL,
    	method: 'GET'
    }).done(function(response) {
    	console.log("function returned: " + response.meta.status === 200);
    	return (response.meta.status === 200) 

    });
}

function create_button (button_name) {
	var new_button = $('<button type="button" class="btn btn-success btn-md button_style" value=' + button_name + '>').text(button_name.replace(/[+]+/g, " "));
	$("#button_div").append(new_button);
}

function add_button_from_input() {
	console.log("checking if button already exits");
	var input_from_user = $.trim($("#input_div #add_a_button").val() );
	input_from_user = input_from_user.replace(/[ ]+/g, "+").toLowerCase();

	if (sports_arr.indexOf(input_from_user) === -1 && valid_req(input_from_user) ) {
		sports_arr.push(input_from_user);
		create_button(input_from_user);
		console.log(input_from_user + " added to array and screen");
	} else {
		console.log("it Already exits in the array or not valid input");
	}
}