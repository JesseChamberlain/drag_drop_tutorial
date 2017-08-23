import React, { Component } from 'react';
import BlockTile from '../components/BlockTile';

BLOCKS = [
  {
    name: "I",
    color: "green",
    location: "1"
  },
  {
    name: "A1",
    color: "red",
    location: "2"
  },
  {
    name: "A2",
    color: "red",
    location: "3"
  },
  {
    name: "A3",
    color: "red",
    location: "4"
  },
  {
    name: "B1",
    color: "pink",
    location: "5"
  },
  {
    name: "B2",
    color: "pink",
    location: "6"
  },
  {
    name: "BB",
    color: "pink",
    location: "7"
  },
  {
    name: "C",
    color: "green",
    location: "8"
  },
  {
    name: "A4",
    color: "red",
    location: "9"
  }
]

class BlocksIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
    }
  }

  componentDidMount() {
    this.setState({ blocks: BLOCKS })
    
    // fetch(`/api/v1/blocks`)
    // .then(response => {
    //   if (response.ok) {
    //     return response;
    //   } else {
    //     let errorMessage = `${response.status} (${response.statusText})`,
    //     error = new Error(errorMessage);
    //   }
    // })
    // .then((response) => response.json())
    // .then((responseData) => {
    //   this.setState({
    //     blocks: responseData["blocks"]
    //   })
    // })
    // .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {
    console.log(this.state.blocks)

    let blocks = this.state.blocks.map(block => {
      return(
        <BlockTile
          key={block.id}
          block={block}
        />
      )
    })

    return(
      <div className="row">
        <div className="small-8 small-centered columns">
          {blocks}
        </div>
      </div>
    )
  }
}

export default BlocksIndexContainer;
