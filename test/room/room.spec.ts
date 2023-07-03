import { OutOfRangeError } from '../../src/utils/errors/out_of_range_error';
import { RoomDimensions } from '../../src/room/dto/room_dimensions';
import { Room } from '../../src/room/room';

const roomDimension: RoomDimensions = { x: 10, y: 10 };
const room = new Room(roomDimension);

describe('Create and manage room', () => {
  it('should return current room width', async () => {
    expect(room.getX()).toBe(roomDimension.x);
  });

  it('should return current room height', async () => {
    expect(room.getY()).toBe(roomDimension.y);
  });

  it('should throw error if roomDimensions is out of range', async () => {
    const roomDimension: RoomDimensions = { x: 0, y: 0 };
    expect(() => new Room(roomDimension)).toThrowError(
      new OutOfRangeError('roomDimensions')
    );
  });
});
