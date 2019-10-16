//Functions
function search()
{
    const filter = document.getElementById('search').value;
    window.location.replace(`/users?filter=${filter}`); 
}

function searchOnEnter()
{
    if( event.keyCode === 13 )
    {
        event.preventDefault();
        search();
    }
}

//Events
document.getElementById('search').addEventListener('keyup', searchOnEnter);