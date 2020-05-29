import Cell from "./cell";

type AntColor = "white" | "black" | "red";
type Direction = "top" | "bottom" | "left" | "right";
export class Ant {
  /** Cell object where is this Ant */
  cell: Cell;
  color: AntColor;
  direction: Direction = "top"; // TODO: random on init
  constructor(cell: Cell, color: AntColor) {
    this.cell = cell;
    this.color = color;
  }

  move = () => {
    console.log("Ant move !");
  };
}
