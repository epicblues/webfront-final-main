const CORDS = 'cords';

function saveCords(cordsObj){
    localStorage.setItem(CORDS, JSON.stringify(cordsObj))
}
function handleGeoSuccess(position){
    const latitude= position.cords.latitude;
    const longtitude = position.cords.longtitude;
    const cordsObj= {
        latitude,
        longtitude
    };
    saveCords(cordsObj);
}
function handleGeoError(){
    console.log('Cant access geo location')
}
function askForCords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCords(){
    const loadedCords = localStorage.getItem(CORDS);
    if(loadedCords === null){
           askForCords();
    }else{

    }
}

function init(){
     loadCords();
}
init();