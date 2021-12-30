document.addEventListener("DOMContentLoaded", function() {
    getAllBooks()
});

function getAllBooks(){
    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(data => {
        allbooks = data
        data.forEach(book => displyBooks(book))
    })
}
function displyBooks(book){
    let li = document.createElement('li')
    li.innerHTML = book.title
    li.addEventListener('click', () => showDetails(book))
    document.getElementById('list').appendChild(li)
}
function showDetails(book){
    console.log('you cliked on ', book)
    
    let panel = document.getElementById("show-panel")
    
    panel.innerHTML = `
    <p>${book.description}</p>
    <p> People who liked the book: </p>
    <ul></ul>
    <button onclick = "handleLike(${book})">&#128077</button>
    `
    displayUsernames(book.users)
}

function displayUsernames(users){
    document.getElementById("show-panel").querySelector('ul').innerHTML =""
    users.forEach(user => { 
    let li = document.createElement('li')
    li.textContent = user.username
    document.getElementById("show-panel").querySelector('ul').appendChild(li)
    })
}

function handleLike(book){
    console.log('handle like on: ', book.id)
    // fetch(`http://localhost:3000/books/${id}`)
    // .then(res => res.json())
    // .then(book => {
    //     book.users.push({['id']:22, ['username']: "Reader"})
    //     console.log(book.users, 'in handle likes')
    //     handleUpdateUsers(book)
    // })
}

function handleUpdateUsers(book){
    fetch(`http://localhost:3000/books/${book.id}`, {
        method : "PATCH",
        headers: {
            "Content-type" : "application/json",
            Accept: "application/json"
        },
        body : JSON.stringify(book)
    })
    .then(res => res.json())
    .then(book => {
        console.log('data from handle update users:', book)
        displayUsernames(book.users)
})
}