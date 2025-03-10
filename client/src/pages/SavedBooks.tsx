import { useQuery, useMutation } from '@apollo/client';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { GET_ME } from '../utils/queries'; // Your GraphQL query to get user data
import { REMOVE_BOOK } from '../utils/mutations'; // Your GraphQL mutation to remove a book
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // Using Apollo's `useQuery` to get user data
  const { data, loading, error } = useQuery(GET_ME);

  // Using Apollo's `useMutation` to remove a book
  const [removeBook] = useMutation(REMOVE_BOOK);

  // If the query is loading, show loading state
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // If there's an error, display it
  if (error) {
    return <h2>Error loading data: {error.message}</h2>;
  }

  const handleDeleteBook = async (bookId: string) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Using the removeBook mutation to delete the book
      const { data } = await removeBook({
        variables: { bookId },
      });

      if (data.removeBook) {
        // Assuming `removeBook` mutation returns updated user data
        // Remove book from localStorage after successful deletion
        removeBookId(bookId);
      } else {
        throw new Error('Failed to delete the book.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {data?.me?.username ? (
            <h1>Viewing {data.me.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {data?.me?.savedBooks?.length
            ? `Viewing ${data.me.savedBooks.length} saved ${
                data.me.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {data?.me?.savedBooks?.map((book: any) => {
            return (
              <Col md='4' key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
