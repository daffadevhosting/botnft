import Container from 'react-bootstrap/Container';
import Image from 'next/image';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "../styles/Home.module.scss";

const Banner = "/botmember.png"

export default function Landing() {
  return (
    <Container>
      <Row>
        <Col sm={8} style={{marginBottom: '6px'}}>
  <Image src={Banner} width={400} height={400} alt="banner" />
		</Col>
        <Col sm={4} style={{marginBottom: '6px'}}>
    <Card bg='danger' style={{height: '100%'}}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
		</Col>
      </Row>
    </Container>
  );
}
