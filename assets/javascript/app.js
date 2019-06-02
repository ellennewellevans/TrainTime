

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyD6PMD7QQbHIF5B2su867JaXR4rK-36Q2c",
    authDomain: "bootcamp-42f3d.firebaseapp.com",
    databaseURL: "https://bootcamp-42f3d.firebaseio.com",
    projectId: "bootcamp-42f3d",
    storageBucket: "bootcamp-42f3d.appspot.com",
    messagingSenderId: "751457492019",
    appId: "1:751457492019:web:82008d0e6f1c0171"
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrainTime: trainFirst,
      frequency: trainFrequency
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().role;
    var trainFirst = childSnapshot.val().start;
    var trainFrequency = childSnapshot.val().rate;
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFirst);
    console.log(trainFrequency);
  
    // Prettify the employee start
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YYYY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainMonths = moment().diff(moment(trainStart, "X"), "months");
    console.log(trainMonths);
  
    // Calculate the total billed rate
    var trainBilled = trainMonths * trainRate;
    console.log(trainBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainStartPretty),
      $("<td>").text(trainMonths),
      $("<td>").text(trainRate),
      $("<td>").text(trainBilled)
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  