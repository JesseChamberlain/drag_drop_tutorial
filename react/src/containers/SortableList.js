import React from 'react';
import BlockTile from '../components/BlockTile';
import {SortableContainer} from 'react-sortable-hoc';

const SortableList = SortableContainer(({blocks}) => {
  let sortedBlocks
  sortedBlocks = blocks.map((value, index) => (
    <BlockTile
      key={`item-${index}`}
      index={index}
      block={value}
    />
  ))

  return (
    <div>
      {sortedBlocks}
    </div>
  )
})

export default SortableList;
