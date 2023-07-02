import { Orientation } from '../dto/orientation';

export const OFFSET_MAP = {
  [Orientation.NORTH]: { x: 0, y: 1 },
  [Orientation.EAST]: { x: 1, y: 0 },
  [Orientation.SOUTH]: { x: 0, y: -1 },
  [Orientation.WEST]: { x: -1, y: 0 },
};
