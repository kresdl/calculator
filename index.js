const find = id => document.getElementById(id),

form = find('form'),
input = find('input'),
expression = find('exp'),

concat = (current, btn) => {
  if (current === '0') {
    return (btn === ',') ? '0,' : btn;
  } else if (current.match(/\,/) && btn === ',') {
    return current;
  }
  return current + btn;
},

calc = () => {
  const exp = array.reduce((acc, e, i) => 
    i % 2 ? `(${acc}) ${e}` : `${acc} ${e} `, '');
  expression.value = exp;
  input.value = eval(exp.slice(1, -4)).toString().replace('.', ',');
  current = '0';
},

clear = () => {
  array = [];
  current = '0';
};

var array, current;

form.onclick = ({ target }) => {
  const { op, num } = target.dataset,
  { innerText } = target;

  if (typeof op !== 'undefined') {
    const str = input.value.replace(',', '.');
    array.push(Number(str), innerText);
    calc();
  } else if (typeof num !== 'undefined') {
    current = concat(current, innerText);
    input.value = current;
  }
};

form.onsubmit = e => {
  e.preventDefault();
  clear();
}

form.onreset = () => {
  input.innerText = '0';
  clear();
}

clear();
form.reset();
