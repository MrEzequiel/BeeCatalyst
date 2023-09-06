const checkboxAntiSpoiler = document.querySelector("#spoiler");

checkboxAntiSpoiler.addEventListener("change", e => {
  console.dir(e.target.checked);
});
