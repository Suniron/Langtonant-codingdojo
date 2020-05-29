import Cell from "./cell";

export const draw = (ctx: CanvasRenderingContext2D, cells: Array<Cell>) => {
  // Draw cells:
  cells.forEach((cell) => {
    ctx.fillStyle = cell.color;
    ctx.fillRect(cell.position.x, cell.position.y, 10, 10);
  });
};
