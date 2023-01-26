function init(){
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length -1];

    fetch("http://127.0.0.1:8000/api/suppliers",{headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( data => {
            const suppliers = document.getElementById("suppliers");

            Array.from(data).forEach(el => {
                suppliers.innerHTML += `<tr>
                <th scope="row">${el.id}</th>
                <td>${el.name}</td>
                <td>${el.country_origin}</td>
              </tr>`
            })
        });
}
