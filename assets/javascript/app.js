

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
    var trainFirst = $("#first-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      first: trainFirst,
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
    var trainDestination = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var trainFrequency = childSnapshot.val().frequency;

    var trainFirstTime = childSnapshot.val().first;
    var trainTimeFormat = "HH:mm";
    var convertedDate = moment(trainFirstTime, trainTimeFormat);
    console.log(convertedDate);


    var firstTrainTemp = moment(childSnapshot.val().trainFirst, "HH:mm").subtract(1, "years");
        var timeDifference = moment().diff(moment(firstTrainTemp), "minutes");
        var remainder = timeDifference % childSnapshot.val().trainFrequency;
        console.log(firstTrainTemp);

        //Calculate minutes away
        var minutesAway = childSnapshot.val().trainFrequency - remainder;

        var nextArrivalTemp = moment().add(minutesAway, "minutes");
        nextArrival = moment(nextArrivalTemp).format("HH:mm");
  
    // Train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    console.log(nextArrival);
    console.log(minutesAway);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text(nextArrival),
      $("<td>").text(minutesAway)
    );
  
    // Append the new row to the table
    $("#train-table").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  