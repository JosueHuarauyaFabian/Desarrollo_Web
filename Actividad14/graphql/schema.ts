import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Weather {
    zip: String!
    weather: String!
    tempC: Int!
    tempF: Int!
    friends: [String]!
  }

  input WeatherInput {
    weather: String!
    tempC: Int!
    tempF: Int!
    friends: [String]!
  }

  type Query {
    weather(zip: String!): Weather
  }

  type Mutation {
    updateWeather(zip: String!, data: WeatherInput!): Weather
    deleteWeather(zip: String!): Weather
  }
`;
