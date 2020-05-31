import React, { useRef, useEffect, useState } from "react";
import Cell, { initCells, findCellAtCoords } from "./cell";
import { draw } from "./draw";
import { Ant } from "./ant";

// SETTINGS
const canvasRefreshSpeed = 10;
const antSpeed = 2;
const GRID_ROWS = 100;
const GRID_COLS = 100;

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
        GRID_ROWS,
        GRID_COLS
      )
    );
  }, [cells]);

  useEffect(() => {
    if (!canvasRef.current || !cells || !ant) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const drawInterval = setInterval(
      () => draw(ctx, cells, ant),
      canvasRefreshSpeed
    );
    // Cleaning:
    return () => clearInterval(drawInterval);
  }, [canvasRef, cells, ant]);

  // Re-draw on every ant move (and after init):
  useEffect(() => {
    if (!ant) return;
    if (!cells) return;

    const AntMovementInterval = setInterval(
      () => ant.move(cells, GRID_ROWS, GRID_COLS),
      antSpeed
    );
    // Clean:
    return () => clearInterval(AntMovementInterval);
  });

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
    setAnt(new Ant(cellFinded));
    console.log(`Click on x:${x}, y:${y}, cellID:${cellFinded.cellID}`);
  };

  return (
    <>
      <h1>The Langton Ant:</h1>
      <h2>Click on the white area... wait... and see!</h2>
      <canvas height={500} width={500} onClick={handleClick} ref={canvasRef} />
      <p>
        Show the code on{" "}
        <a href="https://github.com/Suniron/Langtonant-codingdojo">my Github</a>
      </p>
    </>
  );
};

export default Canvas;
