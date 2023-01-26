function init(){
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length -1];

    fetch("http://127.0.0.1:8000/api/employees",{headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json() )
        .then( data => {
            const employees = document.getElementById("employees");

            Array.from(data).forEach(el => {
                employees.innerHTML += `<tr>
                <th scope="row">${el.id}</th>
                <td>${el.name}</td>
                <td>${el.surname}</td>
                <td>${el.email}</td>
                <td>${el.phoneNum}</td>
              </tr>`
            })
        });
}
