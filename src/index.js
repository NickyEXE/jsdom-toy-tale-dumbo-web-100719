let addToy = false
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.getElementById("toy-collection")
console.log(toyContainer)

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(addToyToDOM))

const addToyToDOM = (toy) => {
  const div = document.createElement("div")
  div.className = "card"
  // children
  const h2 = document.createElement("h2")
  h2.innerText = toy.name
  const img = document.createElement("img")
  img.src = toy.image
  img.alt = toy.name
  img.className = "toy-avatar"
  const p = document.createElement("p")
  p.innerText = toy.likes + " Likes"
  const button = document.createElement("button")
  button.className = "like-btn"
  button.innerText = "Like <3"
  div.append(h2, img, p, button)
  toyContainer.appendChild(div)
  button.addEventListener("click", () => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"likes": toy.likes+1}),
    })
    .then(res => res.json())
    .then(newToyData => {
      toy = newToyData
      p.innerText = toy.likes + " Likes"
    })
  })
}

const addNewToy = toy => {
  fetch('http://localhost:3000/toys', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toy),
  })
  .then(res => res.json())
  .then(addToyToDOM)
}


const toyFormForm = document.querySelector(".add-toy-form")

const handleSubmit = (e) => {
  e.preventDefault()
  const toy = {name: e.target.name.value, image: e.target.image.value, likes: 0}
  addNewToy(toy)
}
toyFormForm.addEventListener("submit", handleSubmit)
