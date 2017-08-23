import React, { Component } from 'react';
import BlockTile from '../components/BlockTile';

class BlocksIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
    }
  }

  // Sets the state with the blocks within the database
  componentDidMount() {
    fetch(`/api/v1/blocks`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        blocks: responseData
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  render() {

    // Maps all the blocks to component tiles
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
        <div className="medium-8 medium-centered columns">
          {blocks}
        </div>
      </div>
    )
  }
}

export default BlocksIndexContainer;
