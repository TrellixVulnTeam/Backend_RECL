const socket = io.connect()

const addProduct = document.getElementById('addProduct')
addProduct.addEventListener('submit', e => {
    e.preventDefault()
    const product = {
        title: addProduct[0].value,
        price: addProduct[1].value,
        thumbnail: addProduct[2].value
    }
    socket.emit('update', product)
    addProduct.reset()
})

socket.on('products', products => {
    tableView(products).then(html => {
        document.getElementById('productsList').innerHTML = html
    })
})

function tableView(products) {
    return fetch('productsList.hbs')
        .then(res => res.text())
        .then(resp => {
            const template = Handlebars.compile(resp)
            const html = template({
                Products: products,
                ProductsQty: products.length
            })
            return html
        })
}


const inputUser = document.getElementById('inputUser')
const inputMessage = document.getElementById('inputMessage')
const messageButton = document.getElementById('messageButton')

const messages = document.getElementById('messages')
messages.addEventListener('submit', e => {
    e.preventDefault()

    const message = {
        autor: inputUser.value,
        msg: inputMessage.value
    }
    socket.emit('newMessage', message)
    messages.reset()
    inputMessage.focus()
})

socket.on('messages', messages => {
    const html = messageContainer(messages)
    document.getElementById('messageContainer').innerHTML = html
})

function messageContainer(messages) {
    return messages.map(message => {
        return (`
            <div>
                <b style="color:blue;">${message.autor}</b>
                [<span style="color:brown;">${message.fyh}</span>] :
                <i style="color:green;">${message.msg}</i>
            </div>
        `)
    }).join(" ")
}

inputUser.addEventListener('input', () => {
    const mail = inputUser.value.length
    const message = inputMessage.value.length
    inputMessage.disabled = !mail
    messageButton.disabled = !mail || !message
})

inputMessage.addEventListener('input', () => {
    const message = inputMessage.value.length
    messageButton.disabled = !message 
})