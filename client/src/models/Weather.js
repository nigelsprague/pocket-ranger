export class Weather {
  constructor(data) {
    this.id = data.id
    this.temp = data.main.temp
    this.weather = data.weather[0].main
    this.iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    this.wind = data.wind.speed
  }

  get tempCels() {
    const celsius = this.temp - 273.15
    return celsius
  }

  get tempFar() {
    const farenheit = (this.temp - 273.15) * 9 / 5 + 32
    return farenheit
  }
}