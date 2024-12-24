const celEL= document.getElementById('celsius');
const fahEL= document.getElementById('fahrenheit')
const kelEL = document.getElementById('kelvin')

computeTemp = (event) => {
    const currValue = +event.target.value;
    switch(event.target.name){
        case "celsius":
            kelEL.value =(currValue+273.32).toFixed(2)
            fahEL.value=(currValue*1.8+32).toFixed(2)
            break;
        case "fahrenheit":
            celEL.value=((currValue-32)/1.8).toFixed(2)
            kelEL.value=((currValue-32)/1.8+273.32).toFixed(2)
            break;
        case "kelvin":
            celEL.value = (currValue-273.32).toFixed(2)
            fahEL.value=((celEL-273.32)*1.8+32).toFixed(2)
            break;
        default:
            break;
    }
}
