
init();

function init()
{
    $('.ui.dropdown').dropdown();
    $('.tooltip').popup();
    $('.ui.accordion').accordion();
}

document.getElementById('menu').addEventListener('click', function(){
    $('.ui.sidebar')
        .sidebar('setting', 'transition', 'overlay')
        .sidebar('toggle');
})