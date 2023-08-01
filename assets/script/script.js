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
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var hour = parseInt($(this).attr("id").split("-")[1]);
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
  
  // Function to load saved events from local storage
  function loadSavedEvents() {
    $(".time-block").each(function () {
      const hour = $(this).attr("id").split("-")[1];
      const savedEvent = localStorage.getItem(`event-${hour}`);
      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  }
  
  // TODO: Add code to display the current date in the header of the page.
  // Function to display the current day at the top of the calendar
  function displayCurrentDay() {
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  }

  // Event listener to handle saving events when the save button is clicked
  $(".container-fluid").on("click", ".saveBtn", function () {
    var hour = $(this).closest(".time-block").attr("id").split("-")[1];
    var eventText = $(this).prev(".description").val();
    saveEvent(hour, eventText);
  });

  function saveEvent(hour, eventText) {
    localStorage.setItem(`event-${hour}`, eventText);
  }
  

  renderTimeBlocks();
  updateTimeBlockColors();
  loadSavedEvents();
  displayCurrentDay();

  // Update time block colors every minute to handle changes in time
  setInterval(function () {
    updateTimeBlockColors();
  }, 60000); // 1 minute interval
});
