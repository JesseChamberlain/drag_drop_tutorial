import React from 'react';
import {SortableElement} from 'react-sortable-hoc';

const BlockTile = SortableElement((props) => {
  let block = props.block
  return (
    <div className="block-tile">
      <div className={`block-tile-${block.color}`}>
        <p id="block-name">{block.name}</p>
      </div>
    </div>
  )
})

export default BlockTile;
