// Functions
async function login()
{
    toggleLoading();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if( !username || !password )
    {
        alert('Debe ingresar el usuario o contraseña');
        toggleLoading();
        return;
    }

    const userID = await generateToken(username, password);
    
    if( userID ){
        const userData = await retriveUserData(userID);

        redirectToLandingPage(userData.defaults.landingPage);
        return;
    }

    toggleLoading();
}

function generateToken(username, password)
{
    return fetch('/login', {
        method: 'POST',
        headers:{ 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then( res => {
        if( res.status !== 200 ){ 
            alert(res.headers.get('statusText')); 
            return;
        }

        return res.headers.get('_id');
    })
    .catch( error => console.error( error ) )
}

function retriveUserData(id)
{
    return fetch(`/api/users/${id}`)
    .then( res => {
        if( res.status !== 200 ) { return }
        return res.json();
    })
    .then( data => {
        return data;
    })
    .catch( error => console.error(error) )
}

function redirectToLandingPage(landingPage)
{
    const url = `/${landingPage}`;
    window.location.replace(url);
}

function toggleLoading()
{
    document.getElementById('section').classList.toggle('loading');
}

function loginOnEnter()
{
    if( event.keyCode === 13 )
    {
        event.preventDefault();
        login();
    }
}

function displayCapsLockMessage()
{
    const msg = document.getElementById('capslock');

    if (event.getModifierState("CapsLock")) {
        msg.style.display = "block";
    } else {
        msg.style.display = "none"
    }
}


// Events
document.getElementById('login').addEventListener('click', login);
document.getElementById('username').addEventListener('keyup', loginOnEnter);
document.getElementById('password').addEventListener('keyup', loginOnEnter);
document.getElementById('password').addEventListener('keyup', displayCapsLockMessage);
