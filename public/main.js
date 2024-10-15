const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')
update.addEventListener('click',_ => {
    fetch('/soldiers', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Kresher',
            rank: 'Infantry',
            allegiance : 'Wehrmacht'
          }),
    })
    .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        window.location.reload(true)
      })
})

deleteButton.addEventListener('click',_ => {
    fetch('/soldiers', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          allegiance: 'Wehrmacht'
        })
      })
        .then(res => {
          if (res.ok) return res.json()
        })
        .then(response => {
            if(response == 'No soldier standing'){
                messageDiv.textContent = 'No soldier standing'
            } else{
                window.location.reload(true)
            }
        })
        .catch(err => console.log(err))
    })