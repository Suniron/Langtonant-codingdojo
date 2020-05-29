type CellColor = "white" | "black" | "red";

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

  /** cell color: white, black or red */
  color: "white" | "black" | "red";

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
