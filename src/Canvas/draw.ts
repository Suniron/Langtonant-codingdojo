import Cell from "./cell";
import { Ant } from "./ant";

export const draw = (
  ctx: CanvasRenderingContext2D,
  cells: Array<Cell>,
  ant: Ant
) => {
  drawCells(ctx, cells);
  drawAnt(ctx, ant);
};

const drawCells = (ctx: CanvasRenderingContext2D, cells: Array<Cell>) => {
  cells.forEach((cell) => {
    ctx.fillStyle = cell.color;
    ctx.fillRect(cell.position.x, cell.position.y, cell.size.w, cell.size.h);

    //ctx.fillRect(0, 0, 50, 50);
    //ctx.fillRect(cell.position.x, cell.position.y, cell.size.w, cell.size.h);
  });
};

const drawAnt = (ctx: CanvasRenderingContext2D, ant: Ant) => {
  ctx.fillStyle = ant.color;
  ctx.fillRect(
    ant.cell.position.x,
    ant.cell.position.y,
    ant.cell.size.w,
    ant.cell.size.h
  );
};
