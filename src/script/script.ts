import { Position } from './dto/position';
import { Movement } from './dto/movement';
import { Vacuum } from '../vacuum/vacuum';
import { Orientation } from './dto/orientation';
import { Room } from '../room/room';
import { OFFSET_MAP } from './const/offset-map';

const REGEX_SCRIPT = new RegExp(
  `[^
${Movement.FORWARD}
${Movement.LEFT}
${Movement.RIGHT}
]`
);

/**
 * Create a script, it used for move the robot in the room
 */
export class Script {
  private _script = '';
  private vacuum: Vacuum;

  constructor(script: string) {
    this.script = script;
    this.vacuum = new Vacuum();
  }

  /**
   * Return the current script
   */
  get script(): string {
    return this._script;
  }

  /**
   * Update the script
   * @param script:
   * available characters :<br>
   * G : turn robot to the left<br>
   * D : turn robot to the right<br>
   * A : move forward
   */
  set script(script: string) {
    if (!this.isValid(script)) {
      throw new Error('Script contains not valid characters');
    }
    this._script = script;
  }

  /**
   * test if the script is valid
   * @param script
   */
  isValid(script: string) {
    return script.match(REGEX_SCRIPT) === null;
  }

  private canForward(room: Room, position: Position): boolean {
    return (
      (position.orientation === Orientation.SOUTH && position.y > 0) ||
      (position.orientation === Orientation.NORTH &&
        position.y < room.getY()) ||
      (position.orientation === Orientation.WEST && position.x > 0) ||
      (position.orientation === Orientation.EAST && position.x < room.getX())
    );
  }

  /**
   * Execute the script
   * @param room: room where the script will be run
   * @param initialPosition: position of the robot in the room
   */
  run(room: Room, initialPosition: Position): Position {
    const currentPosition = initialPosition;
    for (const char of this._script) {
      switch (char.toUpperCase()) {
        case Movement.FORWARD: {
          if (this.canForward(room, currentPosition)) this.vacuum.forward();
          const movement = OFFSET_MAP[currentPosition.orientation];
          currentPosition.x = currentPosition.x + movement.x;
          currentPosition.y = currentPosition.y + movement.y;
          break;
        }
        case Movement.LEFT: {
          if (this.vacuum.turnLeft()) {
            switch (currentPosition.orientation) {
              case Orientation.NORTH:
                currentPosition.orientation = Orientation.WEST;
                break;
              case Orientation.WEST:
                currentPosition.orientation = Orientation.SOUTH;
                break;
              case Orientation.SOUTH:
                currentPosition.orientation = Orientation.EAST;
                break;
              case Orientation.EAST:
                currentPosition.orientation = Orientation.NORTH;
                break;
            }
          }
          break;
        }
        case Movement.RIGHT: {
          if (this.vacuum.turnRight()) {
            switch (currentPosition.orientation) {
              case Orientation.NORTH:
                currentPosition.orientation = Orientation.EAST;
                break;
              case Orientation.WEST:
                currentPosition.orientation = Orientation.NORTH;
                break;
              case Orientation.SOUTH:
                currentPosition.orientation = Orientation.WEST;
                break;
              case Orientation.EAST:
                currentPosition.orientation = Orientation.SOUTH;
                break;
            }
          }
          break;
        }
      }
    }
    return currentPosition;
  }
}
