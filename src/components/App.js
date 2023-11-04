import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Loader from "./loader/Loader";
import Header from "./Header";
import Hero from "./Hero";
import Feed from "./Feed";
import LoginPage from "./Login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dummyArticles: null,
      error: null,
    };
  }

  componentDidMount() {
    fetch(" https://conduitapi.onrender.com/api/articles")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dummyArticles: data,
        });
      })
      .catch((error) => {
        this.setState({
          error,
        });
      });
  }

  render() {
    const { error, dummyArticles } = this.state;
    if (!dummyArticles) {
      return <Loader />;
    }
    const { articles } = dummyArticles;
    if (error) {
      return (
        <div>
          Error:
          {error}
        </div>
      ); // Render the error message
    }
    return (
      <BrowserRouter>
        <Route path="/" exact>
          <Header />
          <Hero />
          <Feed articles={articles} />
        </Route>
        <Route path="/login" exact>
          <Header />
          <LoginPage />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
