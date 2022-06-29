function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var d = today.getDate();
  var mn = today.getMonth();
  var we = today.getDay();
  m = checkTime(m);
  s = checkTime(s);

  if (h > 12) {
    h1 = h - 12;
  } else if (h == 0) {
    h1 = 12;
  } else {
    h1 = h;
  };

  document.getElementById('time').innerHTML =
  h1 + ":" + m;
  var t = setTimeout(startTime, 500);
  // document.getElementById("date").innerHTML = today.toDateString();
   
  document.getElementById("date").innerHTML = today.toDateString();
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

// function tosec2() {
//   window.scrollBy(0,1000);
// }


// Smooth scroll

// $(document).ready(function(){
//   // Add smooth scrolling to all links
//   $("a").on('click', function(event) {

//     // Make sure this.hash has a value before overriding default behavior
//     if (this.hash !== "") {
//       // Prevent default anchor click behavior
//       event.preventDefault();

//       // Store hash
//       var hash = this.hash;

//       // Using jQuery's animate() method to add smooth page scroll
//       // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
//       $('html, body').animate({
//         scrollTop: $(hash).offset().top
//       }, 800, function(){
   
//         // Add hash (#) to URL when done scrolling (default click behavior)
//         window.location.hash = hash;
//       });
//     } // End if
//   });
// });