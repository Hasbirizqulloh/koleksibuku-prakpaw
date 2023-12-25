import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Image, Button } from 'react-bootstrap';
import DetailComponent from './DetailComponent';

const CardComponent = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-buku.vercel.app/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`https://api-buku.vercel.app/books/${bookId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Jika penghapusan berhasil, perbarui state dengan buku yang telah dihapus
        const updatedBooks = books.filter((book) => book._id !== bookId);
        setBooks(updatedBooks);
      } else {
        console.error('Gagal menghapus buku');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Container>
        <Row className="g-1">
          {books.map((book, index) => (
            <Col md={3} className="movieWrapper" key={book._id}>
              <Card className="movieImage rounded-4">
                <Image src={book.coverImage} alt={book.coverImage} className="images rounded-top-3" />
                <div className="bg rounded-bottom-3">
                  <div className="p-2 m-1 text-white">
                    <Card.Title className="text-center">{book.judul}</Card.Title>
                    <Card.Text className="text-center">{book.year}</Card.Text>
                    <Card.Text className="text-center tombol">
                      <DetailComponent bookId={book._id} />
                      <Button className="ms-3" onClick={() => handleDeleteBook(book._id)}>
                        Hapus
                      </Button>
                    </Card.Text>
                  </div>
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
