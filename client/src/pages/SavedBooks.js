import React from 'react';
import BookList from '../components/BookList';
//🔑 We import the useQuery Hook from apollo/client to return our data:
import { useQuery } from '@apollo/client';
// We import the query into the component where we want our data to be displayed:
import { GET_ME } from '../utils/queries';
//To remove books 
//🔑 In the component where we want to execute the mutation, we import the mutation we created as well as the useMutation Hook:
// Import the `useMutation()` hook from Apollo Client


const SearchBooks = () => {

  //I moved the handleDeleteBook and REMOVE_BOOK mutation into BookList component


  //We use the useQuery Hook to execute the query when the page renders. 
  //The returned object will contain both loading and data properties:
  const { loading, data } = useQuery(GET_ME);
  //We can then store the returned data in a variable so we can display the information on our page:
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
  //The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.
  const userData = data?.user || [];

  return (
    <main>
    <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
    </Jumbotron>
    <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
      
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BookList
              user={user}
            />
          )}

    </Container>
 </main>
  );
};

export default SearchBooks;