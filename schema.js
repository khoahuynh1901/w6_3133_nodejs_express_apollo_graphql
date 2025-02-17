const { gql } = require('apollo-server-express');
const schema = gql `
    type Movie{
        id: ID!
        name: String!
        director_name: String!
        production_house: String!
        release_date: String!
        rating: Float!
    }

    type Query{
        movies: [Movie]
        movie(id: ID!): Movie
    }
    #Add new movie to the query
    type Mutation{
        addMovie(
            name: String!
            director_name: String!
            production_house: String!
            release_date: String!
            rating: Float!
        ): Movie

        updateMovie(
            id: ID!
            name: String!
            director_name: String!
            production_house: String!
            release_date: String!
            rating: Float!
        ): Movie

        deleteMovie(id: ID!): Movie #Can return String or Movie whatever it is
    }
`
module.exports = schema