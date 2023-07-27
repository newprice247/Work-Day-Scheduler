
$(function () {
  
  let hourArr= [[9, 9,'am'], [10, 10, 'am'], [11,11, 'am'], [12, 12,'pm'],[ 1,13,'pm'], [2,14,'pm'], [3, 15,'pm'],[ 4, 16,'pm'], [5, 17,'pm']]

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

  $('.btn').on('click', function() {
    var txt = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id')
    localStorage.setItem(time,txt)
  })

  $('.btn-2').on('click', function() {
    var txt = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id')
    localStorage.removeItem(time,txt)
    $(this).siblings('.description').val('')
  })

  
  var dateDisplay = () => {

    var currentDate = dayjs().format('MM/DD/YYYY hh:mm:ss');

    $('#currentDay').text(currentDate);
  }

  setInterval(dateDisplay, 1000)

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

    var getItemsFromLocal = () => {
      $.each($('.description'), function() {
        var textBlock = $(this).attr('name')
        $(this).val(localStorage.getItem(`${textBlock}`))
        console.log(textBlock)
      })
}  

getItemsFromLocal()

});
