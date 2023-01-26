function init(){
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length -1];
    
    fetch("http://127.0.0.1:8080/users",{headers: {'Authorization': `Bearer ${token}`}})
        .then( res => res.json())
        .then( data => {
            if (data.msg){
                document.getElementById("error").innerHTML = data.msg;
            }
            else{
                document.getElementById("error").innerHTML = "";
                const users = document.getElementById("users");

                Array.from(data).forEach(el => {
                    users.innerHTML += `<tr>
                    <th scope="row">${el.id}</th>
                    <td>${el.username}</td>
                    <td>${el.email}</td>
                    <td>${el.password}</td>
                    <td>${el.admin}</td>
                </tr>`
                })
            }
        });
}
