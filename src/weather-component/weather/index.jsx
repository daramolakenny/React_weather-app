import { useEffect, useState } from "react";
import Search from "../search"

export default function Weather() {
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null)

    const apiKey = '76ded18f8d90cb715a79528ef535f7ae'

    async function fetchWeatherData(param) {
        setLoading(true);
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${apiKey}`)
            
            const data = await res.json();
            console.log(data)
            if (data){
                setWeatherData(data);
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            console.log(e);
        } 
    }
    
    async function handleSearch() {
        fetchWeatherData(search);
    }

    function getCurrentDate(){
        return new Date().toLocaleString('en-us', {
            weekday : 'long',
            month : 'long',
            day : 'numeric',
            year : 'numeric'
        })  
    }

    useEffect(()=> {
        fetchWeatherData('Lagos')
    }, [])

    console.log(loading);

    return <div className="container">
        <Search  
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
        />
        {
            loading ? (<div className="loading">Loading...</div>
            ) : (
                <div>
                    <div className="city-name">
                        <h2>{weatherData?.name},   <span>{weatherData?.sys?.country}</span>
                        </h2>
                    </div>
                    <div className="date">
                        <span>{getCurrentDate()}</span>
                    </div>
                    <div className="temp">{weatherData?.main?.temp}</div>
                    <p className="description">{weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : '' }</p>
                    <div className="weather-info">
                        <div>
                            <div>
                                <p className="wind">{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="humidity">{weatherData?.main?.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
}