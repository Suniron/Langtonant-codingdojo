import React, { useRef, useEffect, useState } from "react";
import Cell, { initCells, findCellIDAtPos } from "./cell";
import { draw } from "./draw";

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cells, setCells] = useState<Array<Cell>>();

  useEffect(() => {
    // Init cells on first:
    if (!cells) {
      setCells(initCells({ x: 1920, y: 1080 }, 10, 10));
      return;
    }
  }, [cells]);

  useEffect(() => {
    if (!canvasRef.current || !cells) return;

    const ctx = canvasRef.current.getContext("2d");

    if (!ctx) return;

    // Draw / Re-draw every second
    const drawInterval = setInterval(() => draw(ctx, cells), 10);
    // Clean timer:
    return () => clearInterval(drawInterval);
  });

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cells) return;

    // get coord of click:
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;

    const tempCells = [...cells];
    const cellClicked = tempCells[findCellIDAtPos(cells, x, y) as number];

    cellClicked.color = "black";

    setCells(tempCells);

    console.log(cellClicked);
  };

  return (
    <canvas
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "cornflowerblue",
      }}
      onClick={handleClick}
      ref={canvasRef}
    />
  );
};

export default Canvas;
