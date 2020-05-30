import Cell from "./cell";

type Direction = "top" | "bottom" | "left" | "right";
export class Ant {
  /** Cell object where is this Ant */
  cell: Cell;
  color = "red";
  direction: Direction = "top"; // TODO: random on init
  constructor(cell: Cell) {
    this.cell = cell;
  }

  move = () => {
    // Change direction:
    this.switchDirection();
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
}
