console.log("im rdy");


// initial button array
var sports_arr = ["crossfit", "speedwalking", "soccer", "basketball", "softball", "baseball", "pool", "poker", 
	"running", "jogging", "skating", "rollerskating", "swiming", "bowling", "waterski"];


// keep track of the images on the screen in order 
// to add objects and modify screen
var images_arr = [];

// ****************************
// creates buttons on screen after load with the initial array
// ****************************
$(document).ready( function() {
	for (var i = 0; i < sports_arr.length; i++) {
		create_button( sports_arr[i]);
	}
});

// ****************************
// when a button is clicked it populates div
// with the images requested
// ****************************
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


// ****************************
// when an image is clicled it changes its src
// to animate the gif or to stop the gif
// ****************************
$("#images_div").on("click", ".img", function(){
	console.log("i was clicked: " + this.alt);
	var index = parseInt(this.alt)
	if (images_arr[index].flag) 
		this.src = images_arr[index].gif_url;
	else 
		this.src = images_arr[index].still_img;
	

	images_arr[index].flag = !images_arr[index].flag;

});

// ****************************
// creates an object and then adds it to the image
// array in order to keep track of the images on screen
// then it populates the screen with images divs with its
// respective image and rating
// ****************************
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

// ****************************
// creates a button and adds to the top 
// ****************************
function create_button (button_name) {
	var new_button = $('<button type="button" class="btn btn-success btn-md button_style" value=' + button_name + '>').text(button_name.replace(/[+]+/g, " "));
	$("#button_div").append(new_button);
}

// ****************************
// grabs input from text form
// removes trailing white space and 
// modifies teh string to send the requests
// then checks if requests is good or not
// ****************************
function add_button_from_input() {
	console.log("checking if button already exits");
	var input_from_user = $.trim($("#input_div #add_a_button").val() );
	input_from_user = input_from_user.replace(/[ ]+/g, "+").toLowerCase();


	var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + input_from_user + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
    	url: queryURL,
    	method: 'GET'
    }).done(function(response) {
    	console.log(response);

    	if (response.meta.status !== 200) {	
			alert ("not valid input, with status: " + response.meta.msg);
		} else if (response.data.length === 0) {
			alert ("No match found");

		}else if (sports_arr.indexOf(input_from_user) !== -1 ){
			alert ("it Already exits in the array or");
		} else  {
			sports_arr.push(input_from_user);
			create_button(input_from_user);
			console.log(input_from_user + " added to array and screen");
		} 
 

    });

	
}