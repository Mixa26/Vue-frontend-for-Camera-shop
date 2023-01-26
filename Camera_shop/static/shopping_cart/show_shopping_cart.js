function init(){
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length -1];

    fetch("http://127.0.0.1:8000/api/shopping_cart",{headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( data => {
            const shopping_cart = document.getElementById("shopping_cart");

            Array.from(data).forEach(el => {
                shopping_cart.innerHTML += `<tr>
                <th scope="row">${el.id}</th>
                <td>${el.price}</td>
              </tr>`
            })
        });
}
