// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.


{/* <div id="hour" class="row time-block future">
      <div class="col-2 col-md-1 hour text-center py-3"></div>
      <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div> */}


var body = $('#container');

  //gets the current time and date, and prints it
setInterval(function () {
  var today = dayjs();
 $('#currentDay').text(today.format('MMM D, YYYY, h:mm:ss a'));
}, 1000);
setInterval;

function setHourBlocks() {
var container = $('<div>');
container.addClass('row time-block future');
body.append(container);

var textDiv = $('<div>');
textDiv.addClass('col-2 col-md-1 hour text-center py-3');
container.append(textDiv);

var descriptionDiv = $('<textArea>');
descriptionDiv.addClass('col-8 col-md-10 description');
container.append(descriptionDiv);

//still need to add aria-label="save"
var saveBtn = $('<button>');
saveBtn.addClass('btn saveBtn col-2 col-md-1');
container.append(saveBtn);

//still need to add aria-hidden="true"
var faSaveI = $('<i>');
faSaveI.addClass('fas fa-save');
saveBtn.append(faSaveI);
}




for(var a = 9; a <= 17; a++){
  setHourBlocks();
  

}
