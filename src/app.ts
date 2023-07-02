import { Orientation } from './script/dto/orientation';
import { Script } from './script/script';
import { Room } from './room/room';
import { RoomDimensions } from './room/dto/room_dimensions';

const roomDimensions: RoomDimensions = { x: 10, y: 10 };
const room = new Room(roomDimensions);
const script = new Script('DADADADAA');
const position = { x: 5, y: 5, orientation: Orientation.NORTH };
console.log('Final position : ', script.run(room, position));
