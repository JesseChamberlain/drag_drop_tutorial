import React from 'react';

const BlockTile = (props) => {
  let block = props.block
  return (
    <div className="block-tile">
      <div className={`block-tile-${block.color}`}>
        <p id="block-name">{block.name}</p>
      </div>
    </div>
  );
}

export default BlockTile;
