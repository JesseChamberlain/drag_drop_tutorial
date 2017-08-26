import React, { Component } from 'react';
import SortableList from '../containers/SortableList';
import BlockTile from '../components/BlockTile';
import {arrayMove} from 'react-sortable-hoc';

class BlocksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      blocks: []
    }
    this.onSortEnd = this.onSortEnd.bind(this);
    this.updateListBlocks = this.updateListBlocks.bind(this);
  }

  // Sets the state with the blocks within the database
  componentDidMount() {
    fetch(`/api/v1/lists/1`)
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
        list: responseData["list"],
        blocks: responseData["blocks"]
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  // Send resorted array PATCH as JSON
  updateListBlocks(blocks) {
    let data = {blocks: blocks};
    let jsonStringData = JSON.stringify(data);
    let id = this.state.list.id
    fetch(`/api/v1/lists/${id}`, {
      method: 'PATCH',
      body: jsonStringData
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  // Re-sorts the array after dragging.
  onSortEnd({oldIndex, newIndex}) {
    this.setState({
      blocks: arrayMove(this.state.blocks, oldIndex, newIndex),
    });
    this.updateListBlocks(this.state.blocks)
  };

  render() {

    return(
      <div className="row">
        <div className="medium-8 medium-centered columns">
          <SortableList
            blocks={this.state.blocks}
            onSortEnd={this.onSortEnd}
          />
        </div>
      </div>
    )
  }
}

export default BlocksContainer;
