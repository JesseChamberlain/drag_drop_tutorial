import React from 'react';

const BlockTile = (props) => {
  let block = props.block
  return (
    <div className={`block-tile-${block.color}`}>
      <p id="name">{block.name} x{block.repetitions}</p>
    </div>
  );
}

export default BlockTile;
