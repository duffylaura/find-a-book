import { gql } from '@apollo/client';

export const LOGIN_USER= gql `
    mutation login($email: String!, $password: String!){
        login(email: $email, password: $password) {
            token
            user{
                _id
            }
        }
    }
`;

export const ADD_USER = gql `
    mutation addUser ($username: String!, $email: String!, $password: String!){
        addUser(username: $username, email: $email, password: $password) {
            token
            user{
                _id
            }
        }
    }
`;

export const SAVE_BOOK = gql `
    mutation saveBook ($bookID: ID!){
        saveBook (bookID: $bookID)
    }
`;

export const REMOVE_BOOK = gql `
    mutation removeBook ($bookID: ID!){
        removeBook (bookID: $bookID)
    }
`;