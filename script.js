
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

function init() {
  
  for (var a = 9; a <= 17; a++) {
  createHourBlocks();
  setClasses(a);
  setBlockTime(a);


  var className = 'hour' + a;
  var lastText = JSON.parse(localStorage.getItem('savedText'));
  
  if (lastText[className] !== '') {
    $("."+className).text(lastText[className]);
    console.log(lastText[className]);
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
  savedText[className]="";
 

}

function setBlockTime(hours) {
  var timeBlock = dayjs().set('hour', hours);
  var tempTime = dayjs().set('hour', 13);//delete this! for test case only
  var today = dayjs();
  textDiv.text(timeBlock.format('h a'));
  compareTime(timeBlock, today);
}



function compareTime(timeBlock, today) {
  container.children().eq(2).addClass('bg-primary');
  if (today.isBefore(timeBlock)) {
    container.children().eq(1).addClass('future');
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
  var textDescription = $(element).parent().siblings().eq(1);
  var elementBtn =  $(element).parent();
  var textDescriptionClass = textDescription.attr('class');
  var state = $(event.target).data("state");

  if (element.matches('i')) {
  
console.log('first: ', state);
    if (state === 'unsaved') {
      elementBtn.toggleClass('bg-secondary');
      $(event.target).data("state", "saved");

      // console.log(element, ": ",state);
      
      var desc = textDescription.val();
      var selectedClass = textDescriptionClass.split(' ').filter(className => className.startsWith('hour'))[0];
      // textDescriptionClass.split(' ') creates an array: ['col-8', 'col-md-10', 'description', 'hour9']
      // .filter(className => className.startsWith('hour')) iterates over each classname in the array and checks if it starts with the string 'hour', and keeps the element with 'hour' in it.

      savedText[selectedClass] = desc; // assigns the text value of the textDescription to the selectedClass property in the savedText object.
      localStorage.setItem("savedText", JSON.stringify(savedText)); // stores the object to local storage
    } else {
      $(event.target).data("state", "unsaved");
      // console.log(state);
    }
      

      
    

    console.log(element, ": ",state);
  }
 
});


init();



