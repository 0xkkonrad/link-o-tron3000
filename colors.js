const root = document.documentElement;

var x = 12;
var y = 24;

// root.addEventListener('mousemove', mousecolor => {
//     let x = mousecolor.clientX / innerWidth,
//         y = mousecolor.clientY / innerWidth;
//     x = Math.floor(Math.sqrt(x) * 230);
//     root.style.setProperty('--h', x)
//     root.style.setProperty('--d', x - 180)
//     root.style.setProperty('--firstthird', x - 120)
//     root.style.setProperty('--secondthird', x - 240)
//     root.style.setProperty('--splitcomplimentarity1', x + 90)
//     root.style.setProperty('--splitcomplimentarity2', x + 170)
// });

// initialize color
root.style.setProperty('--h', x)
root.style.setProperty('--d', x - 180)
root.style.setProperty('--firstthird', x - 120)
root.style.setProperty('--secondthird', x - 240)
root.style.setProperty('--splitcomplimentarity1', x + 90)
root.style.setProperty('--splitcomplimentarity2', x + 170)

