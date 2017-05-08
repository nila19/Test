import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Welcome = (props) => (
  <div>
    <h2>Welcome {props.user}</h2>
  </div>
);
const About = () => {
  const age = 39;
  return (
    <div>
      <h2>Age of the auther is {age}</h2>
    </div>
  )
};
const Chapter = ({ match }) => (
  <div>
    <h3>You're reading Chapter # {match.params.chapterId}</h3>
  </div>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/one`}>One</Link>&nbsp;|&nbsp;
        <Link to={`${match.url}/two`}>Two</Link>&nbsp;|&nbsp;
        <Link to={`${match.url}/three`}>Three</Link>
      </li>
    </ul>
    <hr />

    <Route path={`${match.url}/:chapterId`} component={Chapter} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )} />
  </div>
);

class RouterTest extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Welcome</Link>&nbsp;|&nbsp;
              <Link to="/topics">Topics</Link>&nbsp;|&nbsp;
              <Link to="/about">About</Link>
            </li>
          </ul>
          <hr />
          <Route exact path="/" render={() => (
            <Welcome user="Mazda" />
          )} />
          <Route path="/topics" component={Topics} />
          <Route path="/about" component={About} />
        </div>
      </Router >
    );
  }
}

export default RouterTest;
