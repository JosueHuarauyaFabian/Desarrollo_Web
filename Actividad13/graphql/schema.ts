import gql from "graphql-tag";

export const typeDefs = gql`
  type LocationWeatherType {
    zip: String!
    weather: String!
    tempC: String!
    tempF: String!
    friends: [LocationWeatherType]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    location: LocationWeatherType!
  }

  input LocationWeatherInput {
    zip: String!
    weather: String!
    tempC: String!
    tempF: String!
    friends: [String]!
  }

  type Query {
    weather(zip: String, limit: Int, offset: Int): [LocationWeatherType]!
    users: [User]!
  }

  type Mutation {
    addWeather(data: LocationWeatherInput!): LocationWeatherType!
  }
`;
