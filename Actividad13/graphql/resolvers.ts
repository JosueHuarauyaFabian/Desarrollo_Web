import { db, users } from "./data";

declare interface WeatherInterface {
  zip: string;
  weather: string;
  tempC: string;
  tempF: string;
  friends: string[];
}

export const resolvers = {
  Query: {
    weather: (_: any, { zip, limit, offset }: { zip?: string; limit?: number; offset?: number }) => {
      let result = db;
      if (zip) {
        result = result.filter((item) => item.zip === zip);
      }
      if (offset !== undefined) {
        result = result.slice(offset);
      }
      if (limit !== undefined) {
        result = result.slice(0, limit);
      }
      return result.map((location) => ({
        ...location,
        friends: location.friends.map((friendZip) => db.find((item) => item.zip === friendZip)),
      }));
    },
    users: () => users,
  },
  Mutation: {
    addWeather: (_: any, { data }: { data: WeatherInterface }) => {
      // Verificar si ya existe el código postal
      const existing = db.find((item) => item.zip === data.zip);
      if (existing) {
        throw new Error("Zip code already exists.");
      }
  
      // Validar que los códigos postales en friends existan en la base de datos
      const validatedFriends = data.friends.map((friendZip) => {
        const friend = db.find((item) => item.zip === friendZip);
        if (!friend) {
          throw new Error(`Friend with zip code ${friendZip} does not exist.`);
        }
        return friendZip;
      });
  
      // Agregar el nuevo dato con los friends validados
      const newWeather = { ...data, friends: validatedFriends };
      db.push(newWeather);
  
      // Devolver el nuevo dato completo, resolviendo los friends
      return {
        ...newWeather,
        friends: validatedFriends.map((friendZip) => db.find((item) => item.zip === friendZip)),
      };
    },
  }
};  