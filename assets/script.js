  // Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  let hourArr= [[9, 9,'am'], [10, 10, 'am'], [11,11, 'am'], [12, 12,'pm'],[ 1,13,'pm'], [2,14,'pm'], [3, 15,'pm'],[ 4, 16,'pm'], [5, 17,'pm']]

  $.each(hourArr, (i,val) => {
    $('.container-lg').append(`
    <div id="${val[1]}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${val[0]}${val[2]}</div>
        <textarea id='txt'class="col-8 col-md-10 description" name="${val[1]}" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
        <button class="btn-2 col-1 col-md-2" aria-label="clear">
        <i class="fas fa-solid fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    `)
  })

  $('.btn').on('click', function() {
    var txt = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id')
    localStorage.setItem(time,txt)
  })

  
  var dateDisplay = () => {

    var currentDate = dayjs().format('MM/DD/YYYY hh:mm:ss');

    $('#currentDay').text(currentDate);
  }

  setInterval(dateDisplay, 1000)
  

  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  var colorAssigner = () => {
    var currentHour = dayjs().format('HH')
    
    $.each($('.time-block'), function() {

      var timeBlock = parseInt($(this).attr("id"))

      if (timeBlock < currentHour) {
        $(this).addClass('past')
      } else if (timeBlock == currentHour) {
        $(this).addClass('present')
      } else {
        $(this).addClass('future')
      }
    })
  }

  colorAssigner()

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  // 
    var getItemsFromLocal = () => {
      $.each($('.description'), function() {
        var textBlock = $(this).attr('name')
        $(this).val(localStorage.getItem(`${textBlock}`))
        console.log(textBlock)
      })
}  

getItemsFromLocal()



// TODO: Add code to display the current date in the header of the page.
});
