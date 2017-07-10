console.log("im rdy");

var sports_arr = ["crossfit", "speedwalking", "soccer", "basketball", "softball", "baseball", "pool", "poker", 
	"running", "jogging", "skating", "rollerskating", "swiming", "bowling", "waterski"];


$(document).ready( function() {
	for (var i = 0; i < sports_arr.length; i++) {
		create_button( sports_arr[i]);
	}

});


function create_button (button_name) {
	var new_button = $('<button type="button" class="btn btn-success btn-md button_style" onclick="display_page()">').text(button_name);
	$("#button_div").append(new_button);
}

function display_page() {
	console.log("i was pressed");
}

function add_button_from_input() {
	console.log("checking if button already exits");
	var input_from_user = $.trim($("#input_div #add_a_button").val() );
	input_from_user = input_from_user.replace(/[ ]+/g, "+")

	if (sports_arr.indexOf(input_from_user) === -1) {
		sports_arr.push(input_from_user);
		create_button(input_from_user);

	} else {
		console.log("it Already exits in the array");
	}

	

}