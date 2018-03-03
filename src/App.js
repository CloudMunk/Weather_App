import React from 'react';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

// Open Weather API key
const API_KEY = '9d0c547be7e5a5e5bd1dcf0b65c03b58';

class App extends React.Component {
  // Initiate the state of the object
  state = {
    temperature: null,
    city: null,
    country: null,
    humidity: null,
    description: null,
    error: null
  }
  // Function to fetch weather from API
  getWeather = async (e) => {
    // Prevent default behavior of the component when we hit the button
    e.preventDefault();
     //  Value from Form input (<input type="text" name="city" placeholder="City.."/>)
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country) {
        this.setState({
          temperature: data.main.temp,
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          error: 'Please enter the values'
        });
      } else {
        this.setState({
          temperature: null,
          city: null,
          country: null,
          humidity: null,
          description: null,
          error: 'Check your input!'
        });
      }
    }  
    // Returns JSX
  render() {
    return(
        <div>
          <div className='wrapper'>
            <div className='main'>
              <div className='container'>
                <div className='row'>
                  <div className= 'col-xs-5 title-container'>
                    <Titles />
                  </div>
                  <div className='col-xs-7 form-container'>
                    <Form getWeather={this.getWeather}/>
                      <Weather 
                        temperature={this.state.temperature}
                        city={this.state.city}
                        country={this.state.country}
                        humidity={this.state.humidity}
                        description={this.state.description}
                        error={this.state.error}
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      );
  }
};



export default App;

        


