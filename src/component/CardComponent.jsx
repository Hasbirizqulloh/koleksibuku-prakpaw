import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Image, Button, Spinner } from 'react-bootstrap';
import DetailComponent from './DetailComponent';
import { BsFillTrash3Fill } from 'react-icons/bs';

const CardComponent = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-buku.vercel.app/books');
        const data = await response.json();
        setBooks(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeleteBook = async (bookId) => {
    isLoading;
    try {
      // Ask for confirmation before deleting
      const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus buku ini?');

      if (confirmDelete) {
        const response = await fetch(`https://api-buku.vercel.app/books/${bookId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Jika penghapusan berhasil, perbarui state dengan buku yang telah dihapus
          const updatedBooks = books.filter((book) => book._id !== bookId);
          setIsLoading(false);
          setBooks(updatedBooks);
          alert('Buku telah dihapus');
        } else {
          console.error('Gagal menghapus buku');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Container>
        <Row className="g-1">
          {isLoading && <Spinner animation="border" variant="primary" />}
          {books.map((book, index) => (
            <Col md={3} className="movieWrapper" key={book._id}>
              <Card className="movieImage rounded-4">
                <Image src={book.coverImage} alt={book.coverImage} className="images rounded-top-3" />
                <div className="bg rounded-bottom-3">
                  <div className=" des p-2 m-1 text-white">
                    <Card.Title className="text-center">{book.judul}</Card.Title>
                    <div className="text-center">{book.genre}</div>
                    <div className="text-center">{book.year}</div>
                  </div>
                  <Row>
                    <Card.Text className="text-center tombol">
                      <DetailComponent bookId={book._id} />
                      <Button className="ms-2" onClick={() => handleDeleteBook(book._id)}>
                        <BsFillTrash3Fill />
                        {isLoading ? <Spinner animation="border" variant="danger" /> : ' Hapus'}
                      </Button>
                    </Card.Text>
                  </Row>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CardComponent;
