const button = document.querySelector('button');

let appId = 'abc';

function clickHandler(message: string) {
  console.log('Clicked! ' + message );
}
//a comment
if(button) {
  button.addEventListener('click', clickHandler.bind(null, 'nice'));
}