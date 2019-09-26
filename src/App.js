import React from 'react';
import './App.css';
import Header from './components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { mockData } from './constants/mockdata';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      answered: 0,
      now: 0,
      data: [],
    }
  }

  componentDidMount = async () => {
    //initialize by fetching assesment data
    await this.fetchData();
  }

  //render the app
  render() {

    if (this.state.data.length < 1) {
      // data has not been retrieved and loaded
      return (
        <div className="app-header">
          <Spinner animation="border" />
        </div>
      )
    }


    let { current, data } = this.state;
    return (
      <Container className="App" fluid={true}>

        <Card>
          <Card.Header className="app-header"><Header title={this.state.AssessmentName} /></Card.Header>
          <Card.Body className="app-body">
            <div>{data[current].QuestionCategory}</div>
            <div className="question">
              {data[current].QuestionText}
            </div>
            <ButtonGroup id="btn-group" size="lg" >
              <Button variant={data[current].Response === "1" ? "secondary" : "outline-secondary"} className="btn-single" onClick={() => this.setAnswer("1")}>1</Button>
              <Button variant={data[current].Response === "2" ? "secondary" : "outline-secondary"} className="btn-single" onClick={() => this.setAnswer("2")}>2</Button>
              <Button variant={data[current].Response === "3" ? "secondary" : "outline-secondary"} className="btn-single" onClick={() => this.setAnswer("3")}>3</Button>
              <Button variant={data[current].Response === "4" ? "secondary" : "outline-secondary"} className="btn-single" onClick={() => this.setAnswer("4")}>4</Button>
              <Button variant={data[current].Response === "5" ? "secondary" : "outline-secondary"} className="btn-single" onClick={() => this.setAnswer("5")}>5</Button>
            </ButtonGroup>
            <Row className="agree-display">
              <Col>
                Strongly disagree
              </Col>
              <Col>
                Strongly agree
              </Col>
            </Row>

            {
              //display submit button when all questions are answered
              this.state.now === 100 ?
                <Row className="submit-btn">
                  <Button variant="secondary" onClick={() => this.submit()}>Submit</Button>
                </Row>
                :
                <Row></Row>
            }

          </Card.Body>
          <Card.Footer className="text-muted app-footer">
            <div className="d-block w-100">
              <ProgressBar variant="secondary" className="progressbar" now={this.state.now} label={`${this.state.now}% completed`} />
            </div>
            <div className="skip-buttons">
              <Button className="btn" variant="secondary" onClick={this.previousQuestion}><FontAwesomeIcon icon={faAngleUp} size="2x" /></Button>
              <Button className="btn" variant="secondary" onClick={this.nextQuestion}><FontAwesomeIcon icon={faAngleDown} size="2x" /></Button>
            </div>
          </Card.Footer>
        </Card>
      </Container>
    );
  }


  //function sets the answer for the current question
  setAnswer = (ans) => {
    let { current, data, answered } = this.state;
    if (data[current].HasAnswered !== "Y") {
      ++answered
    }
    let total = data.length;
    let completed = Math.floor((answered / total) * 100)
    data[current].HasAnswered = "Y";
    data[current].Response = ans;
    this.setState({ data: data, now: completed, answered: answered })
    this.nextQuestion();
  }

  //function to move to the next question by increasing the current value
  nextQuestion = () => {
    let current = this.state.current;
    if (current >= this.state.data.length - 1) {
      return;
    }
    current++;
    this.setState({ current: current });
  }


  //function to move to the previous question by reduding the current value
  previousQuestion = () => {
    let current = this.state.current;
    if (current <= 0) {
      return;
    }
    current--;
    this.setState({ current: current });
  }

  submit = () => {
    alert("Thank you for completing the self evaluation!")
  }

  fetchData = async () => {
    this.setState({ data: mockData.Question, AssessmentName: mockData.AssessmentName });
  }

}

export default App;



