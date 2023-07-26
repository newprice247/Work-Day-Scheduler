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
  let hourArr= [[9,'am'], [10,'am'], [11,'am'], [12,'pm'],[ 1,'pm'], [2,'pm'], [3,'pm'],[ 4,'pm'], [5,'pm']]


  $.each(hourArr, (i,val) => {
    console.log(i,val)
    $('.container-lg').append(`
    <div id="${val[0]}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${val[0]}${val[1]}</div>
        <textarea id='txt'class="col-8 col-md-10 description" name="${val[0]}" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `)
  })

  $('.btn').on('click', function() {
    var txt = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id')
    console.log(`button clicked + ${txt} + ${time}`)
    localStorage.setItem(txt, time)
  })


  
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
});
