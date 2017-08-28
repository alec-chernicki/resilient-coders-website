import React from 'react';
import axios from 'axios';

class NewsTweet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latestTweet: '',
    };
  }
  componentDidMount() {
    axios('/api/twitter')
      .then(({ data }) => {
        console.log(data);
        this.setState({ latestTweet: data[0].text });
      })
      .catch(e => {
        console.log(e.message);
      });
  }
  render() {
    return (
      <p>
        {this.state.latestTweet}
      </p>
    );
  }
}

export default NewsTweet;
