function init(){
    
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }

        fetch("http://127.0.0.1:8080/login",{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then( res => res.json() )
        .then( el => {
            if (el.msg){
                alert(el.msg);
            }
            else{
                document.getElementById('username').value = "",
                document.getElementById('password').value = ""
                
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = '/admin/';
            }
        })
        
    })
}