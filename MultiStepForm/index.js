let form1 = document.querySelector('#form1')
let form2 = document.querySelector('#form2')
let form3 = document.querySelector('#form3')
let next1 = document.querySelector('#next1')
let next2 = document.querySelector('#next2')
let back1 = document.querySelector('#back1')
let back2 = document.querySelector('#back2')
let progress = document.querySelector('#progress')

next1.onclick = function () {
  form1.style.left = "-450px"
  form2.style.left = "40px"
  progress.style.width = "240px"
}

back1.onclick = function () {
  form1.style.left = "40px"
  form2.style.left = "450px"
  progress.style.width = "120px"
}

next2.onclick = function () {
  form2.style.left = "-450px"
  form3.style.left = "40px"
  progress.style.width = "300px"
}

back2.onclick = function () {
  form2.style.left = "40px"
  form3.style.left = "450px"
  progress.style.width = "240px"
}
