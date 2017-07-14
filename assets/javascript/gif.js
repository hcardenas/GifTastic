
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
// with the images requested by clearing the screen first
// then setting the image-object array empty and then 
// running the querry.
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
// keeps track of the submit button 
// ****************************
$("#submit-btn").on("click", function(event) {
	event.preventDefault(); 		// this function is supposed to prevent the reload of the page
									// it works on click but not when u hit enter so i used on the form
									// onkeypress="return event.keyCode != 13"

	add_button_from_input();

});


// ****************************
// when an image is clicked it checks if it needs to be animated
// by checking its corresponding object stored in the array.
// this is done by storing its value on the attribute 'index-number'
// ****************************
$("#images_div").on("click", ".img", function(){
	// gets index number from image tag
	var index = parseInt($(this).attr("index-number"));
	console.log("i was clicked: " + index);
	

	// using index it checks on the array if needs to be animated
	if (images_arr[index].flag) 
		this.src = images_arr[index].gif_url;
	else 
		this.src = images_arr[index].still_img;	

	// changes the object flag attribute to the oposite
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
	var image_obj = {};

	// creates the images objects and stores in an array to access later
	// it has the gif-url, still image url, rating, width, heigh and a flag
	// used to animate or stop animation of a gif 
	for (var i = 0; i < json_response.data.length; i++) {
		
		image_obj.gif_url = json_response.data[i].images.fixed_height.url;
		image_obj.rating = json_response.data[i].rating;
		image_obj.still_img = json_response.data[i].images.fixed_height_still.url;
		image_obj.height = json_response.data[i].images.fixed_height_still.height;
		image_obj.width = json_response.data[i].images.fixed_height_still.width;
		image_obj.flag = true;
		

		// push to images array to use later when clicling on images 
		images_arr.push(image_obj);
		// empty the object in order to create a new one, tho i dont know if is necessary
		image_obj = {};
	}

	/* im aware that we can do the next loop in same loop above but in order to be more redable 
	   i decided to break it into 2 */

	var outter_div;
	var rating_div;
	var image_div;
	var image_string;

	// uses the array created above and makes the images divs with its respective rating
	for (var i = 0; i < images_arr.length; i++) {
		
		outter_div = $("<div class='image_class' style='float:left;' >  " );
		rating_div = $("<p>").text("Rating: " + images_arr[i].rating);
		image_string = '<img class="img-thumbnail img" src=' + images_arr[i].still_img + 
					   ' style="width:' + images_arr[i].width + 'px;' +
					   'height:' + images_arr[i].height + 'px;" >';
		image_div = $(image_string).attr("index-number" , i);

		outter_div.append(rating_div);
		outter_div.append(image_div);

		$("#images_div").append(outter_div);
	}
		
}

// ****************************
// creates a button and adds to the top 
// ****************************
function create_button (button_name) {
	var new_button = $('<button type="button" class="btn btn-success btn-md button_style"' + 
					   'value=' + button_name + '>').text(button_name.replace(/[+]+/g, " "));
	$("#button_div").append(new_button);
}

// ****************************
// grabs input from text form
// removes trailing white space and 
// modifies the string to send the requests
// then checks if requests is good or not
// ****************************
function add_button_from_input() {
	console.log("checking if button already exits");
	// grabs input and removes trailing white space
	var input_from_user = $.trim($("#input_div #add_a_button").val() );
	// replaces in between white space with + 
	input_from_user = input_from_user.replace(/[ ]+/g, "+").toLowerCase();


	var queryURL = "https://api.giphy.com/v1/gifs/search?q= " + input_from_user + 
					"&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
    	url: queryURL,
    	method: 'GET'
    }).done(function(response) {
    	console.log(response);
    	// checks if response is good
    	if (response.meta.status !== 200) {	
			alert ("not valid input, with status: " + response.meta.msg);
		} 
		// if response is good but returns nothing then show alert 
		// otherwise user wont see anything happening 
		else if (response.data.length === 0) {
			alert ("No match found");

		}
		// if the button already exists then alert user
		else if (sports_arr.indexOf(input_from_user) !== -1 ){
			alert ("it Already exits in the array or");
		} 
		// create button and clear input text
		else  {
			sports_arr.push(input_from_user);
			create_button(input_from_user);
			$("#input_div #add_a_button").val('');
			console.log(input_from_user + " added to array and screen");
		} 
 

    });

	
}