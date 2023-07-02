## IHoover

Node version : 18.16.0

### Install dependencies
```bash
npm install
```

### Run test
```bash
npm run test
```

### Run the app
```bash
npm run build
```

### How to use
```typescript
// create a roomDimensions object
// x = width, y = height
const roomDimensions: RoomDimensions = { x: 10, y: 10 };

// create a new room with roomDimensions
const room = new Room(roomDimensions);

// create a new script :
// available characters :
// G : for turn left
// D : for turn right
// A : for forward
const script = new Script('DADADADAA');

// create a position object to set position of robot in the room
const position = { x: 5, y: 5, orientation: Orientation.NORTH };

// run the script, it take move the robot and return his position at the end
script.run(room, position);
```