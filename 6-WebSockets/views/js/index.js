let socket = io().connect();


socket.on('products', (data) => {
  console.log(data)
  render(data);
})

socket.on('messages', (data) => {
    console.log(data)
    chat(data);
})

function render(data){
    let html = data.map((elem, index) =>{

        return(` 
        <table class="table" >
        <thead style="color:white; width: 100%; ">
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Image</th>
            </tr>
        </thead>
        <tbody style="color:white;">
            <tr>
                <td>${elem.title}</td>
    
                <td>${elem.price}</td>
    
                <td>
                    <img style="width: 10%;" class="thumbnailCon" src="${elem.thumbnail}" alt="">
                </td>
            </tr>
        </tbody>
    </table>
        
        `)
    }).join(" ");
    document.getElementById('tableContainer').innerHTML = html;
}

function addProduct(e){
    let product = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    console.log(product)

    socket.emit('new-products', product);

    document.getElementById('title').value = '';
    document.getElementById('price').value = '';
    document.getElementById('thumbnail').value = '';

    return false;
}

function chat(data){
    let chat = data.map((elem,index) =>{
        return(
            `<div>
                <p style="font-style:italic; color: green;">
                    <strong style="font-style: normal; color:blue;">${elem.email}</strong>
                    <span style="font-style: normal; color:brown;">${elem.date}</span>
                    ${elem.message}
                </p>
            </div>`
        )
    }).join(" ");

    document.getElementById('allChat').innerHTML = chat;

}

function addMessage(e){
    let chatFormat = {
        email: document.getElementById('mail').value,
        date: new Date().toLocaleString(),
        message: document.getElementById('msg').value
    }

    socket.emit('new-messages', chatFormat)

    document.getElementById('msg').value = '';
    document.getElementById('submit').focus();

    return false;
}