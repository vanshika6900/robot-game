<!-- GETTING STARTED WITH THE PROJECT -->

<!-- OVERVIEW -->

I have made a robot game where you have to start the game by clicking on Play button. Afterwards you have to drop the symbols in logic panel for robot to move forward. If robot reaches the end block, you win the game.

<!-- TECH STACK -->

Here I have used reactJs, HTML, CSS,Tailwind, NodeJs, ExpressJs, MongoDb.

<!-- NPM PACKAGES: -->
<!-- Swal:  -->

For showing a sweet alert.

<!-- React-Router-Dom: -->

To navigate from one page to another.

<!-- DEEP UNDERSTANDING OF PROJECT: -->

I am firstly using grid to make a matrix of 5 X 5. Then I have used another div for the position of robot and its position is stored in two usestates "positionX" and "positionY". Whenever any symbol isdropping in the logicPanel handleSymbolDrop function is called and it is managing the position of robot. If left operation is performed positionX is subtracted by 1 and similarly every other position is updated accordingly.

Then we have logicPanel where the user is dragging the symbols. Below that we have control Panel where all 4 symbols are stored and there is play and reset button. On clicking on play button the game starts, On clicking on Reset button whole game gets reset.

<!-- "handleDragStart"  EXPLAINED -->

It is handling the drag operation. It takes the event e, the symbol being dragged as parameters and transferrs the data as the symbol is dragged. This data will be accessed in the handleDrop function when the number is dropped.

<!-- "handleDropZone" function EXPLAINED: -->

The handleDropZoneDrop function is triggered when a symbol is dropped into a specific drop zone. It retrieves the dropped symbol from the dataTransfer object and performs several checks to determine the validity of the operation based on the current position of the robot.

If the dropped symbol corresponds to a direction that would result in an invalid movement (e.g., moving left when the robot is at the leftmost position), an error message is displayed using the Swal library. Otherwise, the function proceeds to handle the drop by invoking handleDrop function with the index and symbol, fetching the instruction using fetchInstruction, and calling onSymbolDrop with the symbol as a parameter.

<!-- "handleDragOver" function EXPLAINED: -->

This function is triggered when a dragged item is being dragged over a valid drop target. 'e.preventDefault()' is called to prevent the default browser behavior for the drag operation.By default, HTML elements do not allow dropping. The onDragOver event is required to enable dropping by canceling the default behavior.

<!-- handleDrop EXPLAINED -->

The handleDrop function is responsible for updating the logicPanel state when a symbol is dropped onto a specific index in the panel. Here's a brief explanation in 100 words:

The function takes two parameters: index represents the index of the drop zone, and symbol represents the symbol being dropped. First, a copy of the current logicPanel state is created using the spread operator. Then, the symbol value is assigned to the corresponding index in the copied array. Finally, the updated logicPanel array is set as the new state using the setLogicPanel function. This ensures that the logicPanel reflects the dropped symbols accurately, allowing for further processing or rendering in the frontend.

<!-- API REQUEST EXPLAINED -->

The fetchInstruction function is an asynchronous function that fetches an instruction from the server based on the provided symbol. It sends a request to the specified endpoint using the fetch function and awaits the response. If the response is successful, the instruction data is extracted using response.json().

The retrieved instruction is then appended to the existing instruction state using the setInstruction function. If an error occurs during the fetch request, it is caught and logged to the console
