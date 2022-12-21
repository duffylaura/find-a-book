import React from 'react';

//To save and remove books
//🔑 In the component where we want to execute the mutation, we import the mutation we created as well as the useMutation Hook:
// Import the `useMutation()` hook from Apollo Client
import { useMutation } from '@apollo/client';
// Import the GraphQL mutation
import { REMOVE_BOOK } from '../../utils/mutations';

const BookList = ({ savedBooks}) => {
  // const [bookId, setBookID] = useState('');
 
  const [removeBook, { removeBookError }] = useMutation(REMOVE_BOOK);
  


  const handleRemoveBook = async (event) => {
    event.preventDefault();
    try {
      const {data} = await removeBook ({
        variables: {
          bookId
        }
      })
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <CardColumns>
    {userData.savedBooks.map((book) => {
      return (
        <Card key={book.bookId} border='dark'>
          {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <p className='small'>Authors: {book.authors}</p>
            <Card.Text>{book.description}</Card.Text>
            <Button className='btn-block btn-danger' onClick={() => handleRemoveBook(book.bookId)}>
              Delete this Book!
            </Button>
          </Card.Body>
        </Card>
      );
    }
    )}
  </CardColumns>
  );
};

export default BookList;