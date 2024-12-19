const btnEL = document.getElementById('btn');
const birthdayEL = document.getElementById('birthday');
const resultEL = document.getElementById('result');

calculateAge = () => { 
    const birthdayValue = birthdayEL.value;
    if(birthdayValue === ""){
        alert("Please enter your birthday");
    }else{
        const age = getAge(birthdayValue)
        resultEL.innerHTML = `Your age is ${age} ${age > 1 ? "years":"year"} old`;
    }
}
getAge =(birthdayValue) => {
    const currDate = new Date();
    const birthDate = new Date(birthdayValue);
    let age = currDate.getFullYear() - birthDate.getFullYear();
    const month = currDate.getMonth() - birthDate.getMonth();
    if(month < 0 || (month === 0 && currDate.getDate() < birthDate.getDate())){
        age--;
    }
    return age;
}
btnEL.addEventListener('click',calculateAge);