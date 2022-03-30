// Personal API Key for OpenWeatherMap API
const apiKey = '50b167ff30e937171afa4f012fd8323e&units=imperial';//units=metric Celsius
/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */

function performAction(e){
  const zip =  document.getElementById('zip').value;
  const country =  document.getElementById('country').value;
  const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${apiKey}`
  getGeocoding(url)
  .then(function(data){
    console.log("data GEo",data);
    const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}`
    getGeocoding(urlWeather)
    .then(function(dataWeather){
        console.log("data weather",dataWeather);
        const temperature = dataWeather.main.temp;
        const weatherDescription = dataWeather.weather[0].description;
        const feelings = document.getElementById('feelings').value;

        document.getElementById('boxWeather').innerText=`Date : ${newDate}
        Temperature : ${temperature}
        Weather Description : ${weatherDescription}
        `;
       postData('/weather', {temperature:temperature, date: newDate, feelings:feelings} );

    })
    // postData('/addAnimal', {animal:data.animal, fact: data.fact, fav:favFact} );
  })
  .then(
    // updateUI()
    console.log("updateUI()")
  )
}



/* Function to GET Web API Data*/
const getGeocoding = async (url)=>{
    const res = await fetch(url);
    try {
      const data=res.json();
      return data;
    } catch (error) {
      console.log("error=",error)
      return error;
    }
  }
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
    body: JSON.stringify(data), 
  });
// debugger
    try {
      const newData = await response.json();
      console.log("POst Data",newData);
      retrieveData();
      return newData;
    } catch(error) {
      console.log("error",error)
    }
}

/* Function to GET Project Data */

const retrieveData = async () =>{
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
  // Write updated data to DOM elements
  let tempHtml='';
  let contentHtml='';
  let dateHtml='';
  for (const key in allData) {
    tempHtml = tempHtml + `<p>Temperature : ${Math.round(allData[key].temperature)} imperial </p>`;
    contentHtml = contentHtml+ `<p>Feelings : ${allData[key].feelings}</p>`;
    dateHtml = dateHtml+`<p>Date : ${allData[key].date}<p>`;
  }
  // document.getElementById('temp').innerHTML ='Temperature : '+ Math.round(allData[key].temperature)+ ' imperial';
  // document.getElementById('content').innerHTML = 'Feelings : '+allData[key].feelings;
  // document.getElementById('date').innerHTML ='Date : '+allData[key].date;
  document.getElementById('temp').innerHTML =tempHtml;
  document.getElementById('content').innerHTML = contentHtml
  document.getElementById('date').innerHTML = dateHtml;
  }
  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
 }
