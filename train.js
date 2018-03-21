var config = {
    apiKey: "AIzaSyC1ODg4uxCOFhVvKa2dp1ctiZgkRW5WlmA",
    authDomain: "train-schedule-7ffc1.firebaseapp.com",
    databaseURL: "https://train-schedule-7ffc1.firebaseio.com",
    projectId: "train-schedule-7ffc1",
    storageBucket: "train-schedule-7ffc1.appspot.com",
    messagingSenderId: "967691471378"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//   global variables



  // button for adding train
$("#submit-button").on("click", function(event) {
    event.preventDefault();
    var trainName = $("#train-name-input").val().trim();
    var endPoint = $("#destination-input").val().trim();
    var timeStart = $("#time-input").val().trim();
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        train: trainName,
        destination: endPoint,
        time: timeStart,
        frequency: frequency
    };

    database.ref().push(newTrain);
    // console log to test
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);
    // clears values
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");

})

database.ref().on("child_added", function(childSnapshot, prevChildKey){
    var trainName = childSnapshot.val().train;
    var endPoint = childSnapshot.val().destination;
    var timeStart = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(endPoint);
    console.log(timeStart);
    console.log(frequency);



    


var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("kk:mm"));

    var firstTimeConverted = moment(timeStart, "kk:mm")


    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);


    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("kk:mm"));

    $(".train-table").append("<tr><td>"+trainName+"</td><td>"+ endPoint +"</td><td>"+frequency +"</td><td>" + nextTrain +"</td><td>" + tMinutesTillTrain+"</td></tr>")


});

// converting time


