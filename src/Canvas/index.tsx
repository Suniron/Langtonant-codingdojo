import React, { useRef, useEffect, useState } from "react";
import Cell, { initCells, findCellAtCoords } from "./cell";
import { draw } from "./draw";
import { Ant } from "./ant";

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cells, setCells] = useState<Array<Cell>>();
  const [ant, setAnt] = useState<Ant>();

  // Init cells on first mount:
  useEffect(() => {
    if (!canvasRef.current) return;

    if (cells) {
      return;
    }

    // Init cells on first mount:
    setCells(
      initCells(
        {
          x:
            canvasRef.current.offsetWidth > canvasRef.current.offsetHeight
              ? canvasRef.current.offsetWidth
              : canvasRef.current.offsetHeight,
          y:
            canvasRef.current.offsetWidth > canvasRef.current.offsetHeight
              ? canvasRef.current.offsetWidth
              : canvasRef.current.offsetHeight,
        },
        100,
        100
      )
    );
  }, [cells]);

  // Re-draw on cells change:
  useEffect(() => {
    if (!canvasRef.current || !cells || !ant) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    draw(ctx, cells, ant);
  }, [cells, ant]);

  // Re-draw on every ant move (and after init):
  useEffect(() => {
    if (!ant) {
      return;
    }
    console.log("ant movement");
    const AntMovementInterval = setInterval(() => ant.move(), 1000);
    // Clean:
    return () => clearInterval(AntMovementInterval);
  }, [ant]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !cells) return;

    // get coord of click:
    const x = e.clientX - canvasRef.current.offsetLeft;
    const y = e.clientY - canvasRef.current.offsetTop;

    const cellFinded = findCellAtCoords(cells, x, y);

    if (!cellFinded) {
      return;
    }

    // Make new Ant
    setAnt(new Ant(cellFinded, "black"));
    console.log(`Click on x:${x}, y:${y}, cellID:${cellFinded.cellID}`);
  };

  return (
    <canvas
      height={window.innerHeight}
      width={window.innerWidth}
      onClick={handleClick}
      ref={canvasRef}
    />
  );
};

export default Canvas;
