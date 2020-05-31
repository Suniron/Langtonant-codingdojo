type CellColor = "white" | "black";

export default class Cell {
  cellID: number;
  /** size: height (h) and width (w) */
  size = {
    h: 0,
    w: 0,
  };

  /** position x and y */
  position = {
    x: 0,
    y: 0,
  };

  /** cell color */
  color: "white" | "black";

  constructor(
    cellID: number,
    h: number,
    w: number,
    x: number,
    y: number,
    color?: CellColor
  ) {
    this.cellID = cellID;
    this.size = { h: h, w: w };
    this.position = { x: x, y: y };
    this.color = color ? color : "white";
  }

  /** Return true if x and y gived are in cell area */
  isColised = (x: number, y: number): boolean => {
    // If x axe match:
    if (x >= this.position.x && x < this.position.x + this.size.w) {
      // If y axe match:
      if (y >= this.position.y && y < this.position.y + this.size.h) {
        return true;
      }
    }

    // If no match:
    return false;
  };
}

export const initCells = (
  gridSize: { x: number; y: number },
  rows: number,
  cols: number
) => {
  const cells: Array<Cell> = [];

  // Calc cell height and width:
  const cellH = gridSize.y / rows;
  const cellW = gridSize.x / cols;

  let count = 0;

  // Make all cells with cols, row, and cell size
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      cells.push(new Cell(count, cellH, cellW, col * cellW, row * cellH));
      count += 1;
    }
  }

  return cells;
};

export const findCellAtCoords = (cells: Array<Cell>, x: number, y: number) => {
  for (const cell of cells) {
    if (cell.isColised(x, y)) {
      return cell;
    }
  }
};

/** Return left/right/top/bottom neighbours (give opposite on end of grid) */
export const getNeighbours = (
  cells: Array<Cell>,
  rows: number,
  cols: number,
  cell: Cell
) => {
  let left: Cell;
  let right: Cell;
  let top: Cell;
  let bottom: Cell;

  // left neighbour:
  switch (true) {
    case cell.cellID % cols === 0:
      left = cells[cell.cellID + cols - 1];
      break;
    default:
      left = cells.find((c) => c.cellID === cell.cellID - 1) as Cell;
      break;
  }

  // right neighbour:
  switch (true) {
    case (cell.cellID + 1) % cols === 0:
      right = cells[cell.cellID - cols + 1];
      break;
    case cells[cells.length - 1].cellID === cell.cellID:
      right = cells[0];
      break;

    default:
      right = cells.find((c) => c.cellID === cell.cellID + 1) as Cell;
      break;
  }

  // top neighbour:
  switch (true) {
    case cell.cellID < cols: // first line
      // Get the number of cells which separate to the end of the row
      const cellToRowEnd = cols - cell.cellID;
      // Get the last cell - cellToRowEnd
      top = cells[cells.length - cellToRowEnd];
      break;
    default:
      top = cells.find((c) => c.cellID === cell.cellID - cols) as Cell;
      break;
  }

  // bottom neighbour:
  switch (true) {
    case cell.cellID + rows > cells.length: // last line
      // Get the number of cells which separate to the end of the row
      const cellToRowEnd = cell.cellID + cols - cells.length;
      // Get the last cell - cellToRowEnd
      bottom = cells[cellToRowEnd];
      break;

    default:
      bottom = cells.find((c) => c.cellID === cell.cellID + cols) as Cell;
      break;
  }

  return { left: left, right: right, top: top, bottom: bottom };
};
