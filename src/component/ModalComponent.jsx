import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import { BsPlusCircle } from 'react-icons/bs';

function MydModalWithGrid(props) {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    publisher: '',
    year: '',
    genre: '',
    pageCount: '',
    rating: '',
    description: '',
    coverImage: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleAddBook = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api-buku.vercel.app/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      const data = await response.json();
      alert('Buku berhasil ditambahkan!');
      window.location.reload();
    } catch (error) {
      console.error('Error adding new book:', error);
    }
  };

  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Tambah Koleksi Buku Anda</Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          <Row>
            <Col xs={6} md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Judul Buku</Form.Label>
                <Form.Control type="text" name="judul" value={newBook.judul} onChange={handleInputChange} placeholder="Masukkan Judul" />
              </Form.Group>
            </Col>
            <Col xs={6} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Penulis</Form.Label>
                <Form.Control type="text" name="author" value={newBook.author} onChange={handleInputChange} placeholder="Penulis.." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Penerbit</Form.Label>
                <Form.Control type="text" name="publisher" value={newBook.publisher} onChange={handleInputChange} placeholder="Penerbit.." />
              </Form.Group>
            </Col>
            <Col xs={6} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Tahun</Form.Label>
                <Form.Control type="text " name="year" value={newBook.year} onChange={handleInputChange} placeholder="Tahun.." />
              </Form.Group>
            </Col>
            <Col xs={6} md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Genre</Form.Label>
                <Form.Control type="text" name="genre" value={newBook.genre} onChange={handleInputChange} placeholder="Genre.." />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={6} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Jumlah Halaman</Form.Label>
                <Form.Control type="text" name="pageCount" value={newBook.pageCount} onChange={handleInputChange} placeholder="Halaman..." />
              </Form.Group>
            </Col>
            <Col xs={6} md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Select aria-label="Default select example" name="rating" value={newBook.rating} onChange={handleInputChange}>
                  <option>Berikan rating buku</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Deskripsi/sinopsis</Form.Label>
                <Form.Control as="textarea" name="description" value={newBook.description} onChange={handleInputChange} placeholder="Deskripsi singkat..." rows={3} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Cover Buku(fitur ini belum bisa jalan karena ada permasalahan dihosting vercel, kalau di localhost jalan) silahkan masukan link saja</Form.Label>
                <Form.Control type="text" name="coverImage" value={newBook.coverImage} onChange={handleInputChange} placeholder="Masukan url cover buku" />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAddBook}>{loading ? <Spinner animation="border" variant="primary" /> : 'Tambah'}</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ModalComponent = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        <BsPlusCircle /> Add Book
      </Button>

      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default ModalComponent;
