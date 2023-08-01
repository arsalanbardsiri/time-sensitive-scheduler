// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  function renderTimeBlocks() {
    var businessHours = 9; // Start at 9am
    var totalHours = 9; // 9am to 5pm

    for (let i = 0; i < totalHours; i++) {
      var hour = businessHours + i;
      var formattedHour = dayjs().hour(hour).format("h A");
      var timeBlock = `
        <div id="hour-${hour}" class="row time-block">
          <div class="col-2 col-md-1 hour text-center py-3">${formattedHour}</div>
          <textarea class="col-8 col-md-10 description" rows="3"></textarea>
          <button type ="button" class="btn saveBtn col-2 col-md-1 bg-info" aria-label="save">
            <i class="fas fa-save" aria-hidden="true"></i>
          </button>
        </div>
      `;
      $(".container-fluid").append(timeBlock);
    }
  }
  // Function to update time block colors based on current time
  function updateTimeBlockColors() {
    const currentHour = dayjs().hour();

    $(".time-block").each(function () {
      const hour = parseInt($(this).attr("id").split("-")[1]);
      $(this).removeClass("past present future");
      if (hour < currentHour) {
        $(this).addClass("past");
      } else if (hour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  // Function to display the current day at the top of the calendar
  function displayCurrentDay() {
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  }

  renderTimeBlocks();
  updateTimeBlockColors();
  displayCurrentDay();

  // Update time block colors every minute to handle changes in time
  setInterval(function () {
    updateTimeBlockColors();
  }, 60000); // 1 minute interval
});
