//typewriter function
var str = "<p>Are You Ready To Explore ?</p>",
i = 0,
isTag,
text;

(function type() {
text = str.slice(0, i++);
if (text === str) return;

document.getElementById('typeWriter').innerHTML = text;

var char = text.slice(-1);
if( char === '<' ) isTag = true;
if( char === '>' ) isTag = false;

if (isTag) return type();
setTimeout(type, 60);
}()); 

// hand icon function

function hand() {
var a;
a = document.getElementById("div1");
a.innerHTML = "&#xf25a;";
setTimeout(function () {
  a.innerHTML = "&#xf256;";
}, 500);
setTimeout(function () {
  a.innerHTML = "&#xf259;";
}, 1000);
setTimeout(function () {
  a.innerHTML = "&#xf256;";
}, 1500);
}
hand();
setInterval(hand, 2000);