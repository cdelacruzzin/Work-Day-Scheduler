
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



//creates divs for each hour form 9-1
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
// iterates over a range of values 9-17, creates hour blocks, sets appropriate classes and time for each block, retrieves stored text data from localStorage, and updates the text content of the corresponding hour block if there is non-empty saved text available
function start() {

  for (var a = 9; a <= 17; a++) {
    createHourBlocks();
    setClasses(a);
    setBlockTime(a);

    var className = 'hour' + a;
    var lastText = JSON.parse(localStorage.getItem('savedText'));

    if (lastText[className] !== '') {
      $("." + className).text(lastText[className]);
    }

  }
}


// "className" will represent a class with the current hour. e.g hour9, hour10 ...
// adds "className" as a class in the description
// dynamically creates a property in "savedText" obj with the key name of className
// initializes each key with an empty string.
function setClasses(thisHour) {
  var className = 'hour' + thisHour;
  descriptionDiv.addClass(className);
  savedText[className] = descriptionDiv;
  savedText[className] = "";
}

// sets a specific time block, updates the displayed time in a designated element, and performs additional operations based on the comparison between the time block and the current time.
function setBlockTime(hours) {
  var timeBlock = dayjs().set('hour', hours);
  var today = dayjs();
  textDiv.text(timeBlock.format('h a'));
  compareTime(timeBlock, today);
}



function compareTime(timeBlock, today) {
  container.children().eq(2).addClass('bg-primary');//sets the initial bg colour for the buttons
  if (today.isBefore(timeBlock)) {
    container.children().eq(1).addClass('future'); //sets bg colour for the textarea based on past/present/future
  }
  if (today.isAfter(timeBlock)) {
    container.children().eq(1).addClass('past');
  }
  if (today.isSame(timeBlock)) {
    container.children().eq(1).addClass('present');
  }
}

body.on('click', function (event) {

  var element = event.target; 
  var textDescription = $(element).parent().siblings().eq(1); // Selects description element within its container
  var elementBtn = $(element).parent();// Parent element of the event target
  var textDescriptionClass = textDescription.attr('class');// Class attribute of the description element
  var state = $(event.target).data("state");// Value of the "state" data attribute

  if (element.matches('i')) {

    if (state === 'unsaved') {
      elementBtn.toggleClass('bg-success'); // Adds or removes the 'bg-secondary' class to/from the elementBtn
      $(event.target).data("state", "saved");

      var desc = textDescription.val();
      var selectedClass = textDescriptionClass.split(' ').filter(className => className.startsWith('hour'))[0];
      // textDescriptionClass.split(' ') creates an array: ['col-8', 'col-md-10', 'description', 'hour9']
      // .filter(className => className.startsWith('hour')) iterates over each classname in the array and checks if it starts with the string 'hour', and keeps the element with 'hour' in it.

      savedText[selectedClass] = desc; // assigns the text value of the textDescription to the selectedClass property in the savedText object.
      localStorage.setItem("savedText", JSON.stringify(savedText)); // stores the object to local storage
    } else {
      $(event.target).data("state", "unsaved");
      elementBtn.toggleClass("bg-success");  // Adds or removes the 'bg-secondary' class to/from the elementBtn
    }
  }

});


start();



