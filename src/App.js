import React, {useEffect, useState} from "react";
import './App.css';
import axios from 'axios'
import { BASE_URL, API_KEY } from './constants/index'
import { Container, Card, Row, Col, ListGroup, Navbar } from 'react-bootstrap'


function App() {
  const [photos, setPhotos] = useState([])

  
  useEffect(() => {
    axios.get(`${BASE_URL}?api_key=${API_KEY}&start_date=2021-07-28`)
      .then(res => {
        setPhotos(res.data);
        setImg(res.data[0])
      })
      .catch(err => {
        console.error(err);
      })
  }, [])

  const [featuredImg, setImg] = useState(photos[0])


  return (
    <div className="App">
          <Container fluid>
            <Navbar className="justify-content-center" bg="primary" variant="dark">
              <Navbar.Brand href="#home">
                <h1>NASA PICTURE OF THE DAY</h1>
              </Navbar.Brand>
            </Navbar>
          </Container>

        <Container fluid>
            <Row>
                  <Col sm={3}>
                    <ListGroup defaultActiveKey="#link1">
                      <ListGroup.Item variant="primary">CLICK BELOW TITLE TO SET FEATURED IMAGE</ListGroup.Item>
                      { photos.map ((photo, index) => {
                        return <ListGroup.Item action onClick={ () =>setImg(photos[index])}>{photo.title}</ListGroup.Item>
                      })}

                    </ListGroup>          
                  </Col>

                  <Col sm={9}>
                    <Card>
                      <Card.Img variant="top" src={featuredImg.url}/>
                      <Card.Body>
                        <Card.Title>{featuredImg.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{featuredImg.date}</Card.Subtitle>
                        <Card.Text>{featuredImg.explanation}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
            </Row>
        </Container>
    </div>
  );
}

export default App;
