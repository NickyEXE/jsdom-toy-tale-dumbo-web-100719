let addToy = false
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyContainer = document.getElementById("toy-collection")

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

adapter.index().then(toys => toys.forEach(addToyToDOM))

// const addToyToDOM = (toy) => {
//   toyContainer.innerHTML+= `
//   <div class="card" data-id=${toy.id}>
//     <h2>${toy.name}</h2>
//     <img src=${toy.image} class="toy-avatar" alt=${toy.name} />
//     <p>${toy.likes} Likes </p>
//     <button class="like-btn">Like <3</button>
//   </div>
//   `
// }

// const handleToyClick = (e) => {
//   if (e.target.matches("button")){
//     likeToy(e.target.closest(".card"))
//   }
// }

// toyContainer.addEventListener("click", handleToyClick)

// const likeToy = (toyDiv) => {
//   const id = toyDiv.dataset.id
//   const likesP = toyDiv.querySelector("p")
//   let numLikes = likesP.innerText.slice(0, -6)
//   numLikes ++
//   adapter.like(id, numLikes)
//   .then(res => likesP.innerText = res.likes + " Likes")
// }


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
    adapter.like(toy.id, toy.likes+1)
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
