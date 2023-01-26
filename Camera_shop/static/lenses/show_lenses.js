function init(){
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length -1];

    fetch("http://127.0.0.1:8000/api/lenses",{headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( data => {
            const lenses = document.getElementById("lenses");

            Array.from(data).forEach(el => {
                lenses.innerHTML += `<tr>
                <th scope="row">${el.id}</th>
                <td>${el.company}</td>
                <td>${el.zoom}</td>
                <td>${el.focal_length}</td>
                <td>${el.mount}</td>
                <td>${el.price}</td>
              </tr>`
            })
        });
}
