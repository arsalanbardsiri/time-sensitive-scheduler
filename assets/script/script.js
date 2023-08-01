// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  function renderTimeBlocks() {
    var businessHours = 9; // Start at 9am
    var totalHours = 9; // 9am to 5pm
  
    for (let i = 0; i < totalHours; i++) {
      var hour = businessHours + i;
      var formattedHour = dayjs().hour(hour).format('h A');
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
  // Function to display the current day at the top of the calendar
  function displayCurrentDay() {
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  }

  renderTimeBlocks();
  displayCurrentDay();

  // Update time block colors every minute to handle changes in time
  setInterval(function () {
    updateTimeBlockColors();
  }, 60000); // 1 minute interval
});
