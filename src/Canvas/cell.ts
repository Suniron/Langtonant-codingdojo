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
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      cells.push(new Cell(count, cellH, cellW, col * cellW, row * cellH));
      count += 1;
    }
  }

  return cells;
};

export const findCellIDAtPos = (cells: Array<Cell>, x: number, y: number) => {
  for (const cell of cells) {
    if (
      x >= cell.position.x &&
      x < cell.position.x + cell.size.w &&
      y >= cell.position.y &&
      y < cell.position.y + cell.size.h
    ) {
      return cell.cellID;
    }
  }
};
