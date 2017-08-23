import React from 'react';

const BlockTile = (props) => {
  let block = props.block
  return (
    <div className={`block-tile-${block.color}`}>
      <p id="name">{block.name}</p>
    </div>
  );
}

export default BlockTile;
