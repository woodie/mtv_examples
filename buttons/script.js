// When each button is clicked, it displays
// the appropriate message in the words array.

var setupButton = function (button, word, element) {
  button.addEventListener('click', function() {
    element.innerHTML = word;
  });
  button.addEventListener('mouseleave', function() { 
    element.innerHTML = '';
  });  
  button.innerHTML = `Write: '${word}'`;
}

var preparePage = function () {
  var words = ['Lions', 'Tigers', 'Bears', 'Oh My!', 'Oops!'];
  var buttons = document.getElementsByTagName('button');
  var element = document.createElement('h1');
  document.getElementsByTagName('ul')[0].appendChild(element);
  for (var i = 0, len = buttons.length; i < len; i++) {
    setupButton(buttons[i], words[i], element);
  }
}
