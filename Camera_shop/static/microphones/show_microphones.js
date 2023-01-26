function init(){
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length -1];
    
    fetch("http://127.0.0.1:8000/api/microphones",{headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( data => {
            const microphones = document.getElementById("microphones");

            Array.from(data).forEach(el => {
                microphones.innerHTML += `<tr>
                <th scope="row">${el.id}</th>
                <td>${el.company}</td>
                <td>${el.model}</td>
                <td>${el.type}</td>
                <td>${el.frequency_range}</td>
                <td>${el.price}</td>
              </tr>`
            })
        });
}
