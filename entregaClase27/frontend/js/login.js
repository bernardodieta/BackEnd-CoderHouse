const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);
    fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        credentials: 'include',        
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
       
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)

            localStorage.setItem('datos', JSON.stringify(data.payload))
            if (data.status === 'Success') {
                window.location.replace('http://127.0.0.1:5500/frontend/index.html');
            } else {
                throw new Error('Login fallido');
            }
        })
        .catch(error => { 
            console.error('Error:', error);
            alert('Login fallido: ' + error.message);
        });
});
