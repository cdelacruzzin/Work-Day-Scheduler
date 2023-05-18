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



var body = $('#container');
var container;
var textDiv;
var descriptionDiv;
var saveBtn;
var faSaveI;
var savedText = {

}


//gets the current time and date, and prints it
setInterval(function () {
  var today = dayjs();

  $('#currentDay').text(today.format('MMM D, YYYY, h:mm:ss a'));
}, 1000);
setInterval;

function createHourBlocks() {
  container = $('<div>');
  container.addClass('row time-block');
  body.append(container);

  textDiv = $('<div>');
  textDiv.addClass('col-2 col-md-1 hour text-center py-3');
  container.append(textDiv);

  descriptionDiv = $('<textArea>');
  descriptionDiv.addClass('col-8 col-md-10 description');
  container.append(descriptionDiv);

  //still need to add aria-label="save"
  saveBtn = $('<button>');
  saveBtn.addClass('btn saveBtn col-2 col-md-1');
  saveBtn.attr('aria-label', 'save');
  container.append(saveBtn);

  //still need to add aria-hidden="true"
  faSaveI = $('<i>');
  faSaveI.addClass('fas fa-save');
  faSaveI.attr('aria-hidden', 'true');
  faSaveI.data('state', 'unsaved');
  saveBtn.append(faSaveI);
}

for (var a = 9; a <= 17; a++) {
  createHourBlocks();
  setClasses(a);
  setBlockTime(a);
}



function setClasses(thisHour) {
  var className = 'hour' + thisHour;
  console.log(className);
  descriptionDiv.addClass(className);
  savedText.className = $('.'+className);
  console.log(savedText.className);
}


function setBlockTime(hours) {
  var timeBlock = dayjs().set('hour', hours);
  var tempTime = dayjs().set('hour', 13);//delete this! for test case only
  var today = dayjs();
  textDiv.text(timeBlock.format('h a'));
  compareTime(timeBlock, tempTime);
}

function compareTime(timeBlock, tempTime) {
  if (tempTime.isBefore(timeBlock)) {
    container.addClass('future');
  }
  if (tempTime.isAfter(timeBlock)) {
    container.addClass('past');
  }
  if (tempTime.isSame(timeBlock)) {
    container.addClass('present');
  }
}

body.on('click', function(event) {
  var element = event.target;
  var textDescription = $(element).parent().siblings().eq(1);
  if (element.matches('i')) {
    var state = element.getAttribute("data-state");

    if(state == 'unsaved'){
      element.dataset.state = "saved";
      var desc =textDescription.val();
    } else {
      element.dataset.state = 'unsaved';
    }
    console.log(desc, ' state: ', element.dataset);
  }
});




