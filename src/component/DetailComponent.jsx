import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function MydModalWithGrid({ show, onHide, bookId }) {
  const [bookData, setBookData] = useState(null);
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [isCancelButtonVisible, setIsCancelButtonVisible] = useState(false);
  const [isTitleEditable, setIsTitleEditable] = useState(false); // State baru
  const [formValues, setFormValues] = useState({
    judul: '',
    rating: '',
    author: '',
    publisher: '',
    year: '',
    genre: '',
    pageCount: '',
    description: '',
  });

  useEffect(() => {
    const fetchBookById = async () => {
      try {
        const response = await fetch(`https://api-buku.vercel.app/books/${bookId}`);
        const data = await response.json();
        setBookData(data);
        setFormValues(data);
      } catch (error) {
        console.error('Error fetching book data by ID:', error);
      }
    };

    if (bookId) {
      fetchBookById();
    }
  }, [bookId]);

  const handleEditClick = () => {
    setIsFormEditable(true);
    setIsCancelButtonVisible(true);
    setIsTitleEditable(true); // Mengatur isTitleEditable menjadi true saat tombol Edit ditekan
  };

  const handleCancelClick = () => {
    setIsFormEditable(false);
    setIsCancelButtonVisible(false);
    setIsTitleEditable(false); // Mengatur kembali isTitleEditable menjadi false saat membatalkan edit
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveClick = async () => {
    setIsFormEditable(false);
    setIsCancelButtonVisible(false);
    setIsTitleEditable(false);

    try {
      const response = await fetch(`https://api-buku.vercel.app/books/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues), // Menggunakan nilai dari state formValues
      });

      if (response.ok) {
        // Handle jika permintaan sukses
        // Misalnya, tampilkan pesan bahwa perubahan berhasil disimpan
        console.log('Perubahan berhasil disimpan');
      } else {
        // Handle jika permintaan gagal
        console.error('Gagal menyimpan perubahan');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat menyimpan perubahan:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Detail Buku</Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example">
        <Container>
          {bookData && (
            <>
              <Row>
                <Col xs={12} md={2}></Col>
                <Col xs={6} md={8} className="text-center">
                  <img src={bookData.coverImage} alt={bookData.judul} />
                </Col>
                <Col xs={6} md={2}></Col>
              </Row>
              <Row className="mb-2">
                <Col xs={6} md={2}></Col>
                <Col xs={6} md={8} className="text-center">
                  {isTitleEditable ? ( // Mengecek apakah sedang dalam mode edit
                    <Form.Control
                      type="text"
                      name="judul"
                      value={formValues.judul}
                      onChange={handleInputChange}
                      // Berikan fungsi onChange jika diperlukan
                    />
                  ) : (
                    <>{bookData.judul}</> // Teks biasa jika tidak dalam mode edit
                  )}
                </Col>
                <Col xs={6} md={2}></Col>
              </Row>
              <Row>
                <Col xs={6} md={2}>
                  <Form.Label column sm="2">
                    Rating
                  </Form.Label>
                </Col>
                <Col xs={6} md={1}>
                  <Form.Label column sm="2">
                    :
                  </Form.Label>
                </Col>
                <Col xs={6} md={9}>
                  {isFormEditable ? <Form.Control type="text" name="rating" value={formValues.rating} onChange={handleInputChange} /> : <Form.Control plaintext readOnly defaultValue={bookData.rating} />}
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={2}>
                  <Form.Label column sm="2">
                    Penulis
                  </Form.Label>
                </Col>
                <Col xs={6} md={1}>
                  <Form.Label column sm="2">
                    :
                  </Form.Label>
                </Col>
                <Col xs={6} md={9}>
                  {isFormEditable ? <Form.Control type="text" defaultValue={bookData.author} /> : <Form.Control plaintext readOnly defaultValue={bookData.author} />}
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={2}>
                  <Form.Label column sm="2">
                    Penerbit
                  </Form.Label>
                </Col>
                <Col xs={6} md={1}>
                  <Form.Label column sm="2">
                    :
                  </Form.Label>
                </Col>
                <Col xs={6} md={9}>
                  {isFormEditable ? <Form.Control type="text" defaultValue={bookData.publisher} /> : <Form.Control plaintext readOnly defaultValue={bookData.publisher} />}
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={2}>
                  <Form.Label column sm="2">
                    Tahun
                  </Form.Label>
                </Col>
                <Col xs={6} md={1}>
                  <Form.Label column sm="2">
                    :
                  </Form.Label>
                </Col>
                <Col xs={6} md={9}>
                  {isFormEditable ? <Form.Control type="text" defaultValue={bookData.year} /> : <Form.Control plaintext readOnly defaultValue={bookData.year} />}
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={2}>
                  <Form.Label column sm="2">
                    Genre
                  </Form.Label>
                </Col>
                <Col xs={6} md={1}>
                  <Form.Label column sm="2">
                    :
                  </Form.Label>
                </Col>
                <Col xs={6} md={9}>
                  {isFormEditable ? <Form.Control type="text" defaultValue={bookData.genre} /> : <Form.Control plaintext readOnly defaultValue={bookData.genre} />}
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={2}>
                  <Form.Label column sm="2">
                    Jumlah Halaman
                  </Form.Label>
                </Col>
                <Col xs={6} md={1}>
                  <Form.Label column sm="2">
                    :
                  </Form.Label>
                </Col>
                <Col xs={6} md={9}>
                  {isFormEditable ? <Form.Control type="text" defaultValue={bookData.pageCount} /> : <Form.Control plaintext readOnly defaultValue={bookData.pageCount} />}
                </Col>
              </Row>
              <Row>
                <Col xs={6} md={2}>
                  <Form.Label column sm="2">
                    Deskripsi
                  </Form.Label>
                </Col>
                <Col xs={6} md={1}>
                  <Form.Label column sm="2">
                    :
                  </Form.Label>
                </Col>
                <Col xs={6} md={9}>
                  {isFormEditable ? <Form.Control as="textarea" defaultValue={bookData.description} rows={3} /> : <Form.Control as="textarea" plaintext readOnly defaultValue={bookData.description} rows={3} />}
                </Col>
              </Row>
            </>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        {isCancelButtonVisible && (
          <Button variant="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
        )}
        {isFormEditable ? (
          <Button variant="success" onClick={handleSaveClick}>
            Save
          </Button>
        ) : (
          <Button variant="primary" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

const DetailComponent = ({ bookId }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Detail
      </Button>

      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} bookId={bookId} />
    </>
  );
};

export default DetailComponent;
