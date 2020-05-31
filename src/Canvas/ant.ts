import Cell, { getNeighbours } from "./cell";

type Direction = "top" | "bottom" | "left" | "right";
export class Ant {
  /** Cell object where is this Ant */
  cell: Cell;
  color = "red";
  direction: Direction = "top"; // TODO: random on init
  constructor(cell: Cell) {
    this.cell = cell;
  }

  move = (cells: Array<Cell>, rows: number, cols: number) => {
    // Change direction:
    this.switchDirection();
    this.changeCurrentCellColor();
    this.go(cells, rows, cols);
  };

  /** Change direction depend of cell color and current direction */
  switchDirection = () => {
    if (this.cell.color === "white") {
      switch (this.direction) {
        case "top":
          return (this.direction = "right");
        case "right":
          return (this.direction = "bottom");
        case "bottom":
          return (this.direction = "left");
        case "left":
          return (this.direction = "top");
      }
    } else if (this.cell.color === "black") {
      switch (this.direction) {
        case "top":
          return (this.direction = "left");
        case "left":
          return (this.direction = "bottom");
        case "bottom":
          return (this.direction = "right");
        case "right":
          return (this.direction = "top");
      }
    }
  };

  changeCurrentCellColor = () => {
    if (this.cell.color === "white") {
      return (this.cell.color = "black");
    }
    this.cell.color = "white";
  };

  go = (cells: Array<Cell>, rows: number, cols: number) => {
    const neighbours = getNeighbours(cells, rows, cols, this.cell);
    switch (this.direction) {
      case "top":
        return (this.cell = neighbours.top);
      case "bottom":
        return (this.cell = neighbours.bottom);
      case "left":
        return (this.cell = neighbours.left);
      case "right":
        return (this.cell = neighbours.right);
      default:
        break;
    }
  };
}
