window.onload = function () {
  var buttons = document.getElementsByClassName('btn');
  var screen = document.querySelectorAll(' p')[0];
  var clear = document.getElementById('clear');
  let equation = '';
  let ANS = '';
  let done = false;
  let used = 0;

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].innerHTML === '=') {
      buttons[i].addEventListener('click', calculate(i));
    } else {
      buttons[i].addEventListener('click', addtocurrentvalue(i));
    }
  }

  function addtocurrentvalue(i) {
    return function () {
      if (done) {
        screen.innerHTML = '';
      }
      done = false;
      if (buttons[i].innerHTML != 'rad' && buttons[i].innerHTML != 'deg') {
        screen.innerHTML += buttons[i].innerHTML;
      }
      switch (buttons[i].innerHTML) {
        case '÷':
          equation += '/';
          break;
        case '×':
          equation += '*';
          break;
        case 'rad':
          document.getElementById('deg').style.background = '';
          document.getElementById('deg').style.color = '';
          buttons[i].style.background = '';
          buttons[i].style.color = '';
          break;
        case 'deg':
          document.getElementById('rad').style.background = 'white';
          document.getElementById('rad').style.color = '#888888';
          buttons[i].style.background = 'black';
          buttons[i].style.color = '#ffffff';
          break;
        case 'tan':
          checkForM();
          equation += 'Math.tan(';
          used += 1;
          screen.innerHTML += '(';
          break;
        case '√':
          checkForM2();
          equation += 'Math.sqrt(';
          used += 1;
          screen.innerHTML += '(';
          break;
        case 'sin':
          checkForM2();
          equation += 'Math.sin(';
          used += 1;
          screen.innerHTML += '(';
          break;
        case 'cos':
          checkForM2();
          equation += 'Math.cos(';
          used += 1;
          screen.innerHTML += '(';
          break;
        case 'log':
          checkForM2();
          equation += 'Math.log(';
          used += 1;
          screen.innerHTML += '(';
          break;
        case 'Ans':
          checkForM2();
          equation += ANS;
          break;
        case 'π':
          checkForM();
          checkForM2();
          equation += 'Math.PI';
          break;
        case '^':
          equation += '**';
          break;
        case '(':
          used += 1;
          checkForM2();
          equation += '(';
          break;
        case ')':
          used -= 1;

          equation += ')';
          break;
        default:
          checkForM();
          equation += buttons[i].innerHTML;
      }
    };
  }
  function checkForM() {
    if (equation.substr(equation.length - 1, 1) == ')') {
      equation += '*';
    }
  }
  function checkForM2() {
    if (
      equation.substr(equation.length - 1, 1) != '*' &&
      equation.substr(equation.length - 1, 1) != '(' &&
      equation != ''
    ) {
      equation += '*';
    }
  }

  clear.onclick = function () {
    screen.innerHTML = '';
    reset();
  };

  function evil(fn) {
    try {
      return new Function('return ' + fn)();
    } catch {
      return 'Invalid Syntax';
    }
  }

  function calculate(i) {
    return function () {
      done = true;
      if (0 < used) {
        for (let z = 0; z < used; z++) {
          equation += ')';
        }
      } else if (used < 0) {
        for (let z = 0; z < used * -1; z++) {
          equation = '(' + equation;
        }
      }
      screen.innerHTML = evil(equation);

      ANS = '(' + equation + ')';
      reset();
    };
  }
  function reset() {
    equation = '';
    used = 0;
  }
};
