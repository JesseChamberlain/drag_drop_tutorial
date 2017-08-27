# README

This tutorial was created to help people incorporate React-Sortable-HOC into their own projects.  The tutorial also covers setting up Rails to automatically persist the newly sorted array within the database.

## Essential Technology
- Ruby, 2.4.1
- Rails, 5.1.3
- Foundation, 5.4.5
- React, 15.6.1
- React-Sortable-HOC, 0.6.7
https://github.com/clauderic/react-sortable-hoc

## Tutorial

With this tutorial you can clone from the master to see the finished product, or you can clone from the tutorial_template branch to get the static array version and follow along to add in the sortable features.  The following tutorial will assume that you are starting from the tutorial_template branch.

### 1.) Setup

Follow this link and clone down the branch.

https://github.com/JesseChamberlain/drag_drop_tutorial/tree/tutorial_template

In your terminal, within the project directory, run these commands:

```
bundle install
yarn install
rake db:create
rake db:migrate
rake db:seed
```
Open another terminal tab and run ``` rails s ``` in one, and ``` yarn start ``` in another.  Open your browser, preferably Chrome, and navigate to ``` localhost:3000 ```. You should be presented with a verticle list of colored blocks on a black background. Feel free to dig around in the file a bit to see how the app is constructed before continuing.

### 2.) Sortable within React

The first part of the implementation is setting up the drag & drop sortability in React.  The react-sortable-hoc library has already been added to the package.json file and installed, so we just need to implement it into the front-end.  The files we'll be working with for this are in the ```/react/src``` folder.

To start off we only have a ```BlockContainer.js``` container and a ```BlockTile.js``` component.

Now we'll add a sortable container that will sit between these two files.  In the ```/react/src/containers``` folder add a file called ```SortableList.js``` and copy in the following code:

```
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
  );
});

export default SortableList;
```
Notice that the normal component function is wrapped in the ```SortableContainer()``` function which is imported from ```'react-sortable-hoc'```. This container is responsible for returning the BlockTiles HTML.

Next we'll modify the ```BlockTile.js``` file to incorporate the ```'react-sortable-hoc'``` functions. In the ```BlockTile.js``` file overwrite the code with this new code.  You'll notice that the changes are minor, we're primarily importing the ```SortableElement()``` function and wrapping the component in it.

```
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
  );
})

export default BlockTile;
```

The last part of this step is updating functionality within the ```BlocksContainer.js``` file.

First, at the top of the file, import the SortableList, and the helper function from ```'react-sortable-hoc'```.
```
import SortableList from '../containers/SortableList';
import {arrayMove} from 'react-sortable-hoc';
```
Second, lets add in an onSortEnd function, that will be passed down to the ```SortableList.js``` we created, and will use the helper function ```arrayMove()```. Right before the ```render()``` function, add this code.
```
onSortEnd({oldIndex, newIndex}) {
  this.setState({
    blocks: arrayMove(this.state.blocks, oldIndex, newIndex),
  });
};
```
Because this will be passed down through props to ```SortableList.js```, we also need to bind it within the constructor. Add the following code after ```this.state```:
```
this.onSortEnd = this.onSortEnd.bind(this);
```
One small thing to point out in regards to the ```onSortEnd()``` function. It's not entirely clear in the the sortable documentation, but when this is passed to the ```SortableList.js``` it appears to be consumed and used behind the scenes.

Third, in the ```render()``` function, remove the blocks variable and map. Within the ```render(){ return()}``` replace the ```{blocks}``` JSX for the SortableList.

Before:
```
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
```
After:
```
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
```
At this point the front-end drag and drop should be functional!  Fire up the server and browser again and drag everything around.  Since the updating is handled by the state within the BlocksContainer, when you refresh the page, the original order is presented.  The next section will deal with Rails and how to persist this newly sorted list into the database.

### 3.) Nevertheless, Rails persisted

Dragging stuff around is all fun and games, but what if you need that new layout to be saved every time it's changed? For my project in particular, I wanted the layout to be saved automatically each time a block is dropped into place. This freed the user from having to think about saving it, and the rest of the tutorial will follow the steps I chose to do this. You could certainly implement a "save" button somewhere to do the same thing, if it suits your app better, but the critical part is in Rails and the database layout.
