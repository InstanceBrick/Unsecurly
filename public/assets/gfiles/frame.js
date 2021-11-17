var ssn = document.getElementById("ssn");
var current = document.getElementById("current");

ssn.oninput = function(event) {
  current.textContent = ssn.value;
}
