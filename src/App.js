import EmailContents from "./components/email_contents";
import EmailContentsForm from "./components/email_contents_form";
import EmailRecipientForm from "./components/email_recipient_form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <div className="App d-flex p-2">
      <Container>
        <Row>
          <Col>
            <EmailContentsForm />
            <EmailRecipientForm />
          </Col>
          <Col xs={8}>
            <EmailContents />
          </Col>
        </Row>
        <Row>
          <Col xs={4}>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
