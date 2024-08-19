import React, { useState } from 'react'
import './Feed.css';

function Feed() {
  const [inpu1, setInpu1] = useState('');
  const [inpu2, setInpu2] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // const apiKey = process.env.REACT_APP_API_KEY;
  const apiKey = '76ded18f8d90cb715a79528ef535f7ae'

  const clickHandler = () => {
    if (!inpu1) {
      setError('Please enter a city name');
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inpu1}&appid=${apiKey}`)
    .then(response => {
      // Check if the response is okay (status code 200-299)
      if (!response.ok) {
        throw new Error(`Http Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (inpu1 === '') {
        setInpu2(true);
        setError('Please enter a valid City name');
        setMessage('');
      } else if (data.cod !== 200) { // Check if the API returns a code other than 200
        throw new Error(`API Error: ${data.message || 'Unknown Error'}`)
      } else {
        setInpu2(true);
        setMessage(`Weather in ${inpu1}: ${data.weather[0].description}`);
      }
    })
    .catch(error => {
      // Catch any other errors and handle them
      setInpu2(true);
      if(error.message.includes('API Error')) {
        setError(error.message)
      } else {
        setError('Error fetching weather data')
      }
      setMessage('');
    })
  }

  // console.error('Error:', error.message); // Log the error message for debugging
  //     setInpu2(true);
  //     if (error.message.includes('API error')) {
  //       setError(error.message);  // Use the error message from the API
  //     } else {
  //       setError('An error occurred while fetching the weather data');
  //     }
  //     setMessage('');

  return (
    <div className='wrapper'>
      <form action="">
        <h1>Weather App</h1>
        <div>
          {inpu2 && (
            <div>
              <input className='city' type="text" placeholder={error || message} />
            </div>
          )}
          <input className='' value={inpu1} type="text" placeholder='Enter city name' onChange={(e) => setInpu1(e.target.value)} />
          <div className='emptydiv'></div>
          <input onClick={clickHandler} className='device' type="button" placeholder='Get Device Location' value="Get Weather" />
        </div>
      </form>
    </div>
  )
}

export default Feed
