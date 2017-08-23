import React, { Component } from 'react';
import BlockTile from '../components/BlockTile';

class BlocksIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
    }
  }

  componentDidMount() {
    this.setState({ blocks: [
      {
        name: "I",
        color: "green",
        id: "1"
      },
      {
        name: "A1",
        color: "red",
        id: "2"
      },
      {
        name: "A2",
        color: "red",
        id: "3"
      },
      {
        name: "A3",
        color: "red",
        id: "4"
      },
      {
        name: "B1",
        color: "pink",
        id: "5"
      },
      {
        name: "B2",
        color: "pink",
        id: "6"
      },
      {
        name: "BB",
        color: "pink",
        id: "7"
      },
      {
        name: "C",
        color: "green",
        id: "8"
      },
      {
        name: "A4",
        color: "red",
        id: "9"
      }
    ] })

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
