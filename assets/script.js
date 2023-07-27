
$(function () {

  // This array stores the id's that will be used in the time-block divs created below, as well as the time-box descriptors(i.e. the block times: 9am through 5pm)
  let hourArr= [[9, 9,'am'], [10, 10, 'am'], [11, 11, 'am'], [12, 12,'pm'],[ 1, 13,'pm'], [2, 14,'pm'], [3, 15,'pm'],[ 4, 16,'pm'], [5, 17,'pm']]

  //This loops through the hourArr array and appends a time-block container to the HTML file for every item in the array. It then calls on the values stored in the array to assign new id's to each container, injects the time-box descriptors(9am - 5pm), and assigns new names to each of the text fields for use in getting those specific values back from local storage and displaying them on screen. There is also the addition of a clear button attached to each of the containers, to clear the text field and the values stored in local storage for that specific time-block.
  $.each(hourArr, (i,val) => {
    $('.container-xl').append(`
    <div id="${val[1]}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${val[0]}${val[2]}</div>
        <textarea id='txt'class="col-8 col-md-9 description" name="${val[1]}" rows="3"> </textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">Save
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
        <button class="btn-2 col-md-1 col-2" aria-label="clear">Clear
        <i class="fas fa-solid fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    `)
  })

  //Event handler for the Save Button
  $('.btn').on('click', function() {
    //Pulls the text the user has entered in the textarea and stores it as a variable.
    var txt = $(this).siblings('.description').val();
    //Pulls the id for the time-block the button is attached to and stores it as a variable.
    var id = $(this).parent().attr('id')
    //Stores the text and container id to local storage.
    localStorage.setItem(id,txt)
  })

  //Event Handler for the Clear Button
  $('.btn-2').on('click', function() {
    // Creates a variable that stores the id of the container the user wants to clear.
    var id = $(this).parent().attr('id')
    //Locates the object matching the id of the container and removes it.
    localStorage.removeItem(id)
    //Clears the on-screen text field for that specific container.
    $(this).siblings('.description').val('')
  })

  
  var dateDisplay = () => {

    var currentDate = dayjs().format('MM/DD/YYYY hh:mm:ss');

    $('#currentDay').text(currentDate);
  }

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

    var getItemsFromLocal = () => {
      $.each($('.description'), function() {
        var textBlock = $(this).attr('name')
        $(this).val(localStorage.getItem(`${textBlock}`))
        console.log(textBlock)
      })
}  

colorAssigner()

setInterval(dateDisplay, 1000)

getItemsFromLocal()

});
