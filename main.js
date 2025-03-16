// city tile
let CityTitleEl = document.getElementById("cityTitle");
// date
let dayEl = document.getElementById("day");
let monthEl = document.getElementById("month");
let dateEl = document.getElementById("date");
//cards data
let prayingNamesEl = document.querySelectorAll(".prayingName");
let prayingTimesEl = document.querySelectorAll(".praingTime");

// selection
let selectValueEl = document.getElementById("selection");


/* start doing the city menu */

 

let cities = [
    {
        arName:"القاهرة",
        enName:"Cairo"
    },
    
    {
        arName:"دمياط",
        enName:"Damietta"
    },
    {
        arName:"جيزه",
        enName:"Giza "
    },
    {
        arName:"سوهاج",
        enName:"Sohag"
    },
    {
        arName:"لوقصر",
        enName:"Luxor"
    },

]

cities.forEach(citiy => {
    let option = document.createElement("option")
    option.innerText = citiy.arName;
    option.value = citiy.enName;
     
    selectValueEl.appendChild(option)

    
})
/* end doing the city menu */


getPrayData(selectValueEl.value)

selectValueEl.addEventListener("change", function () {
    //Change title
    CityTitleEl.innerText = selectValueEl.value;
    //change data
    getPrayData(selectValueEl.value)
    
})

/* stat general function */
function getPrayData(city) {
    axios.get(`https://api.aladhan.com/v1/timingsByCity?country=EG&city=${city}`)
        .then((response) => {
           
            renderdata(response);
        })
}
 
function renderdata(response) {
    //head data
    dayEl.innerText = response.data.data.date.gregorian.weekday.en;
    monthEl.innerText = response.data.data.date.gregorian.month.en;
    dateEl.innerText = response.data.data.date.gregorian.date;
    //card data
    let listofPrayings = Object.keys(response.data.data.timings).slice(0, 7);
    prayingNamesEl.forEach((prayName ,indx) => {
        prayName.innerText = listofPrayings[indx];
        
    })
    let listofPrayingsValues = Object.values(response.data.data.timings).slice(0, 7);
    prayingTimesEl.forEach((prTime, indx) => {
        prTime.innerText = convertToAM( listofPrayingsValues[indx])
    })


}

/* end general function */

 

// convert time to am
function convertToAM(timeStr) {
    let [hours, minutes] = timeStr.split(':');
    hours = parseInt(hours);
    
    // Only subtract 12 if time is in PM (13:00 or later)
    if (hours >= 13) {
        hours -= 12;
    }
    
    // Keep hours as is if already in AM (00:00 to 12:59)
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
}