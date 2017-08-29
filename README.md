# Drag and Drop Tutorial

This tutorial was created to help people incorporate React-Sortable-HOC into their own projects.  The tutorial also covers setting up Rails to automatically persist the newly sorted array within the database.

## Essential Technology
- Ruby, 2.4.1
- Rails, 5.1.3
- Foundation, 5.4.5
- React, 15.6.1
- React-Sortable-HOC, 0.6.7
- https://github.com/clauderic/react-sortable-hoc

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
Run ``` rails s ```, then open another terminal tab and run ``` yarn start ```. Now open your browser, preferably Chrome, and navigate to ``` localhost:3000 ```. You should be presented with a vertical list of colored blocks on a black background. Feel free to dig around in the file a bit to see how the app is constructed before continuing.

### 2.) Sortable within React

The first part of the implementation is setting up the drag & drop sortability in React.  The react-sortable-hoc library has already been added to the package.json file and installed, so we just need to implement it into the front-end.  The files we'll be working with for this are in the ```/react/src``` folder.

To start off we only have a ```BlockContainer.js``` container and a ```BlockTile.js``` component. We'll now add a sortable container that will sit between these two files.  In the ```/react/src/containers``` folder add a file called ```SortableList.js``` and copy in the following code:
```javascript
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
```
Notice that the normal component function is wrapped in the ```SortableContainer()``` function which is imported from ```'react-sortable-hoc'```. This container is responsible for returning the BlockTiles HTML.

Next we'll modify the ```BlockTile.js``` file to incorporate the ```'react-sortable-hoc'``` functions. In the ```BlockTile.js``` file overwrite the code with this new code.  You'll notice that the changes are minor, we're primarily importing the ```SortableElement()``` function and wrapping the component in it.
```javascript
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
```
The last part of this step is updating functionality within the ```BlocksContainer.js``` file. First, at the top of the file, import the SortableList, and the helper function from ```'react-sortable-hoc'```.
```javascript
import SortableList from '../containers/SortableList';
import {arrayMove} from 'react-sortable-hoc';
```
Second, lets add in an ```onSortEnd()``` function that will use the helper function ```arrayMove()```, and will be passed down to ```SortableList.js```. Right before the ```render()``` function, add this code:
```javascript
onSortEnd({oldIndex, newIndex}) {
  this.setState({
    blocks: arrayMove(this.state.blocks, oldIndex, newIndex),
  });
};
```
Because this will be passed down through props to ```SortableList.js```, we also need to bind it within the constructor. Add the following code after ```this.state```:
```javascript
this.onSortEnd = this.onSortEnd.bind(this);
```
One small thing to point out in regards to the ```onSortEnd()``` function. It's not entirely clear in the the sortable documentation, but when this is passed to the ```SortableList.js``` it appears to be consumed and used behind the scenes.

Third, in the ```render()``` function, remove the blocks variable and map. Within the ```render(){ return()}``` replace the ```{blocks}``` JSX with the SortableList.

Before:
```javascript
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
```javascript
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

### 3.) Persisted within Rails

Dragging stuff around is all fun and games, but what if you need that new layout to be saved every time it's changed? For my project in particular, I wanted the layout to be saved automatically each time a block is dropped into place. This freed the user from having to think about saving it, and the rest of the tutorial will follow the steps I chose to do this. You could certainly implement a "save" button somewhere to do the same thing, if it suits your app better, but the critical part is in Rails and the database layout.

If you checkout the ```schema.rb``` file, you'll see the block model has a location column (an integer) built into it. For this tutorial the location was hard coded in the seed file. (In the Ldyan app each new block is added to the end of the list and given a location equal to the length of the list + 1.)

Take a look the ```lists_controller.rb``` file in the  ```controllers/api/v1``` folder. In the ```def show``` method of the controller, the blocks are ordered by location before they are sent as a json to the React Container.
```ruby
def show
  list = List.find(params[:id])
  blocks = list.blocks
  blocks = blocks.order(location: :asc)
  render json: {list: list, blocks: blocks}
end
```
Let's first tackle how the ```BlocksContainer.js``` file handles the fetch call to the Rails API. Create a new function that makes a fetch PATCH call:
```javascript
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
```
This function takes a single argument. We'll add it into the end of the ```onSortEnd()``` function after the ```setState()```, and then pass it the current state of  ```blocks```.
```javascript
onSortEnd({oldIndex, newIndex}) {
  this.setState({
    blocks: arrayMove(this.state.blocks, oldIndex, newIndex),
  })
  this.updateListBlocks(this.state.blocks)
}
```
Make sure to bind the ```updateListBlocks()``` function in the constructor as well:
```javascript
this.updateListBlocks = this.updateListBlocks.bind(this);
```
Now that the front end is setup, let's address how the controller will handle remapping the blocks location column within the database. Since the Fetch call is a PATCH, we'll be feeding the controller via the ```def update``` method.  Let's take a look at what the final code for that will be and break it down line by line.
```ruby
def update
  resorted_blocks = JSON.parse(request.body.read)
  blocks = List.find(params[:id]).blocks
  blocks.each do |block|
    resorted_blocks["blocks"].each_with_index do |resorted_block, i|
      if resorted_block["id"] == block.id
        new_location = (i + 1)
        unless new_location == block.location
          block.location = new_location
          block.save
        end
      end
    end
  end

  render json: {blocks: blocks}
end
```
In the first two lines we're setting our variables, one for the array of the newly sorted blocks via JSON, and an array of the blocks currently in the database.
```ruby
data = JSON.parse(request.body.read)
blocks = List.find(params[:id]).blocks
```
Next we're going to iterate through the blocks with ```.each```, and for each block we're going to iterate through the the resorted_blocks with ```.each_with_index```.
```ruby
blocks.each do |block|
  resorted_blocks["blocks"].each_with_index do |resorted_block, i|
    ...
  end
end  
```
Once we have a match for the ```id```, we're going to set the location of the block to the (index + 1) of the blocks position in the resorted_blocks array (unless it is the same). Then we'll save that block and iterate to the next.
```ruby
if resorted_block["id"] == block.id
  new_location = (i + 1)
  unless new_location == block.location
    block.location = new_location
    block.save
  end
end
```
You'll also need to add the following code at the top of your controller:
```ruby
skip_before_action :verify_authenticity_token
```
At this point you should have a successfully running drag and drop that saves to the database!  Let me know if you discover any shortcuts, bugs, or new ways to solve this.
