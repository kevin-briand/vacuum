import { OutOfRangeError } from '../utils/errors/out_of_range_error';
import { RoomDimensions } from './dto/room_dimensions';

/**
 * Create a room with 2 dimensions, X and Y
 */
export class Room {
  private _roomDimensions: RoomDimensions;

  constructor(roomDimensions: RoomDimensions) {
    if (roomDimensions && (roomDimensions.x <= 0 || roomDimensions.y <= 0)) {
      throw new OutOfRangeError('roomDimensions');
    }
    this._roomDimensions = roomDimensions;
  }

  get roomDimensions(): RoomDimensions {
    return this._roomDimensions;
  }

  /**
   * Return the width of the room
   */
  getX() {
    return this.roomDimensions.x;
  }

  /**
   * Return the height of the room
   */
  getY() {
    return this.roomDimensions.y;
  }
}
