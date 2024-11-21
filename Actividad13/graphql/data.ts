export const db = [
    {
      zip: "96815",
      weather: "sunny",
      tempC: "25°C",
      tempF: "77°F",
      friends: ["96816", "96818"],
    },
    {
      zip: "96816",
      weather: "rainy",
      tempC: "22°C",
      tempF: "71°F",
      friends: ["96815", "96818"],
    },
    {
      zip: "96818",
      weather: "cloudy",
      tempC: "20°C",
      tempF: "68°F",
      friends: ["96816", "96815"],
    },
  ];
  
  export const users = [
    {
      id: "1",
      name: "Josue",
      email: "josue@example.com",
      location: db[0],
    },
    {
      id: "2",
      name: "Angely",
      email: "angely@example.com",
      location: db[1],
    },
  ];
  