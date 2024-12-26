// toggle class active
const navbarNav = document.querySelector('.navbar-nav');


// ketika menu di klick

document.querySelector('#menuSaya').onclick = () =>{
    navbarNav.classList.toggle('active');
}


///klick di luar side bar untuk menghilang kan menu saya
const tutupMenu = document.querySelector('#menuSaya');
 document.addEventListener('click', function(e){
    if (!tutupMenu.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');


        
    }

 
 
    })
// script sound
    feather.replace();

    document.getElementById('toggleSound').addEventListener('click', function(event) {
        event.preventDefault(); // Mencegah tautan untuk mengikuti href
        var soundElement = document.getElementById('sound');
        if (soundElement.classList.contains('show')) {
            soundElement.classList.remove('show');
        } else {
            soundElement.classList.add('show');
        }
    });

    


    