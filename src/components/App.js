import React from "react";
// import { BrowserRouter } from "react-router-dom";
import Loader from "./loader/Loader";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      abc: null,
    };
  }

  render() {
    const { abc } = this.state;
    if (!abc) {
      this.setState({
        abc: "hello",
      });
      return <Loader />;
    }
    return <h1>{abc}</h1>;
  }
}

export default App;
