import React, { Component } from 'react';
import SortableList from '../containers/SortableList';
import BlockTile from '../components/BlockTile';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

class BlocksIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
    }
    this.onSortEnd = this.onSortEnd.bind(this);
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

  onSortEnd({oldIndex, newIndex}) {
    this.setState({
      blocks: arrayMove(this.state.blocks, oldIndex, newIndex),
    });
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

export default BlocksIndexContainer;
