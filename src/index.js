let addToy = false

const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.getElementById("toy-collection")

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

 const addToyToDom = (toy) => {
  toyCollection.innerHTML += `
    <div class="card" data-id=${toy.id}>
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" alt=${toy.name} />
      <p>${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>
  `
 }

 const handleClick = (e) => {
   if (e.target.matches("button")){
     const card = e.target.closest(".card")
     const pTag = card.querySelector("p")
     let numLikes = parseInt(pTag.innerText.slice(0, -6))
     const id = card.dataset.id
     fetch(`http://localhost:3000/toys/${id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": numLikes + 1
      }),
      })
      .then((response) => response.json())
      .then(toy => {
        pTag.innerText = toy.likes + " Likes"
      })
   }
 }


 toyCollection.addEventListener("click", handleClick)


// No event delegation

// const addToyToDom = (toy) => {
//   const div = document.createElement("div")
//   div.className = "card"
//   const h2 = document.createElement("h2")
//   h2.innerText = toy.name
//   const img = document.createElement('img')
//   img.src = toy.image
//   img.className="toy-avatar"
//   img.alt = toy.name
//   const p = document.createElement('p')
//   p.innerText = toy.likes + " Likes"
//   const button = document.createElement('button')
//   button.className = "like-btn"
//   button.innerText = "Like <3"
//   div.append(h2, img, p, button)
//   toyCollection.appendChild(div)

//   button.addEventListener("click", () => {
//     fetch(`http://localhost:3000/toys/${toy.id}`, {
//       method: 'PATCH', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: "application/json"
//       },
//       body: JSON.stringify({
//         "likes": toy.likes +1
//       }),
//       })
//       .then((response) => response.json())
//       .then(newToy => {
//         toy = newToy
//         p.innerText = newToy.likes + " Likes"
//       })
//   })
// }

const postNewToy = (name, image) => {
  fetch('http://localhost:3000/toys', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json"
  },
  body: JSON.stringify({
    "name": name,
    "image": image,
    "likes": 0
  }),
  })
  .then((response) => response.json())
  .then(addToyToDom)
}



const handleSubmit = (e) => {
  e.preventDefault()
  console.log(e.target)
  const name = e.target.name.value
  const image = e.target.image.value
  postNewToy(name, image)
}


toyForm.addEventListener("submit", handleSubmit)



fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => toys.forEach(addToyToDom))