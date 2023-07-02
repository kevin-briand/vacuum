import { Position } from '../../src/script/dto/position';
import { Orientation } from '../../src/script/dto/orientation';
import { Script } from '../../src/script/script';
import { Room } from '../../src/room/room';
import { RoomDimensions } from '../../src/room/dto/room_dimensions';

const roomDimensions: RoomDimensions = { x: 10, y: 10 };
const room = new Room(roomDimensions);
const scriptStr = 'GGGGDADADADAA';
const script = new Script(scriptStr);
const position = { x: 5, y: 5, orientation: Orientation.NORTH };
script.script = scriptStr;

describe('Create and execute a script', () => {
  it('should return position after script execution', async () => {
    const finalPosition: Position = {
      x: 5,
      y: 6,
      orientation: Orientation.NORTH,
    };
    const result = script.run(room, position);
    expect(result).toStrictEqual(finalPosition);
  });

  it('should return current script', async () => {
    const result = script.script;
    expect(result).toStrictEqual(scriptStr);
  });

  it('should throw error if script char is not known', async () => {
    const badScript = 'DADADADAATGGGG';
    expect(() => (script.script = badScript)).toThrowError(
      new Error('Script contains not valid characters')
    );
  });
});
