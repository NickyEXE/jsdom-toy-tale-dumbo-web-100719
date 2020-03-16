adapter = {
    index: () => fetch('http://localhost:3000/toys').then(res => res.json()),
    like: (id, newLikeCount) => fetch(`http://localhost:3000/toys/${id}`, {
            method: 'PATCH', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"likes": newLikeCount}),
          }).then(res => res.json())
}