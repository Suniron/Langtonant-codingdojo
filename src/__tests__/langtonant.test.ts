import Cell, { initCells, findCellAtCoords, getNeighbours } from "Canvas/cell";
import { Ant } from "Canvas/ant";

const cells = initCells({ x: 1920, y: 1080 }, 10, 10);

describe("Cells tests:", () => {
  describe("initCells()...", () => {
    test("should be an array", () => {
      expect(typeof cells).toBe(typeof []);
    });

    test("should be 100 length", () => {
      expect(cells.length).toBe(100);
    });

    describe("First item:", () => {
      test("should be an instance of Cell", () => {
        expect(cells[0] instanceof Cell).toBeTruthy();
      });

      test("should have 190 as width (1920 / 10)", () => {
        expect(cells[0].size.w).toBe(192);
      });

      test("should have 108 as height (1080 / 10)", () => {
        expect(cells[0].size.h).toBe(108);
      });

      test("should have 0 as x ", () => {
        expect(cells[0].position.x).toBe(0);
      });

      test("should have 0 as y ", () => {
        expect(cells[0].position.y).toBe(0);
      });
    });

    describe("Second item:", () => {
      test("should have 0 as y ", () => {
        expect(cells[1].position.y).toBe(0);
      });

      test("should have 192 as x ", () => {
        expect(cells[1].position.x).toBe(192);
      });

      test("should have 1 as cellID ", () => {
        expect(cells[1].cellID).toBe(1);
      });
    });

    describe("last item:", () => {
      test("should have 1728 as x ", () => {
        expect(cells[cells.length - 1].position.x).toBe(1728);
      });

      test("should have 972 as y ", () => {
        expect(cells[cells.length - 1].position.y).toBe(972);
      });

      test("should have 99 as cellID ", () => {
        expect(cells[cells.length - 1].cellID).toBe(99);
      });
    });
  });

  describe("getCellAtPos()...", () => {
    test("should be cellID = 0 for x:12 and y:15", () => {
      expect(findCellAtCoords(cells, 12, 15)?.cellID).toBe(0);
    });

    test("should be cellID = 1 for x:200 and y:20", () => {
      expect(findCellAtCoords(cells, 200, 20)?.cellID).toBe(1);
    });

    test("should be cellID = 10 for x:20 and y:200", () => {
      expect(findCellAtCoords(cells, 20, 200)?.cellID).toBe(10);
    });

    test("should be cellID = 27 for x:425 and y:785", () => {
      expect(findCellAtCoords(cells, 425, 785)?.cellID).toBe(72);
    });

    test("should be cellID = 99 for x:1910 and y:1020", () => {
      expect(findCellAtCoords(cells, 1910, 1020)?.cellID).toBe(99);
    });
  });

  describe("getNeighbours() ...", () => {
    describe("result for cell index 0...", () => {
      const result = getNeighbours(cells, 10, 10, cells[0]);
      test("left neighbour cellID should be 9", () => {
        expect(result.left.cellID).toBe(9);
      });
      test("right neighbour cellID should be 1", () => {
        expect(result.right.cellID).toBe(1);
      });
      test("top neighbour cellID should be 90", () => {
        expect(result.top.cellID).toBe(90);
      });
      test("bottom neighbour cellID should be 10", () => {
        expect(result.bottom.cellID).toBe(10);
      });
    });
    describe("result for cell index 9...", () => {
      const result = getNeighbours(cells, 10, 10, cells[9]);
      test("left neighbour cellID should be 8", () => {
        expect(result.left.cellID).toBe(8);
      });
      test("right neighbour cellID should be 0", () => {
        expect(result.right.cellID).toBe(0);
      });
      test("top neighbour cellID should be 99", () => {
        expect(result.top.cellID).toBe(99);
      });
      test("bottom neighbour cellID should be 19", () => {
        expect(result.bottom.cellID).toBe(19);
      });
    });
    describe("result for cell index 11...", () => {
      const result = getNeighbours(cells, 10, 10, cells[11]);
      test("left neighbour cellID should be 10", () => {
        expect(result.left.cellID).toBe(10);
      });
      test("right neighbour cellID should be 12", () => {
        expect(result.right.cellID).toBe(12);
      });
      test("top neighbour cellID should be 1", () => {
        expect(result.top.cellID).toBe(1);
      });
      test("bottom neighbour cellID should be 21", () => {
        expect(result.bottom.cellID).toBe(21);
      });
    });
    describe("result for cell index 99...", () => {
      const result = getNeighbours(cells, 10, 10, cells[99]);
      test("left neighbour cellID should be 98", () => {
        expect(result.left.cellID).toBe(98);
      });
      test("right neighbour cellID should be 90", () => {
        expect(result.right.cellID).toBe(90);
      });
      test("top neighbour cellID should be 89", () => {
        expect(result.top.cellID).toBe(89);
      });
      test("bottom neighbour cellID should be 9", () => {
        expect(result.bottom.cellID).toBe(9);
      });
    });
  });

  describe("Cell class object...", () => {
    describe("isColised() method:", () => {
      test("should be true (cell 0)", () => {
        expect(cells[0].isColised(10, 10)).toBeTruthy();
      });
      test("should be false (cell 1)", () => {
        expect(cells[1].isColised(10, 10)).toBeFalsy();
      });
      test("should be false (cell 98)", () => {
        expect(cells[98].isColised(1919, 1079)).toBeFalsy();
      });
      test("should be true (cell 99)", () => {
        expect(cells[99].isColised(1919, 1079)).toBeTruthy();
      });
    });
  });
});

describe("Ant test:", () => {
  describe("switchDirection() method...", () => {
    describe("direction is top and cell is white...", () => {
      // Make an ant on a white cell
      const whiteAnt = new Ant(cells[12]);
      whiteAnt.cell.color = "white";
      test("direction should become right", () => {
        whiteAnt.switchDirection();
        expect(whiteAnt.direction).toBe("right");
      });
      test("direction should become bottom", () => {
        whiteAnt.switchDirection();
        expect(whiteAnt.direction).toBe("bottom");
      });
      test("direction should become left", () => {
        whiteAnt.switchDirection();
        expect(whiteAnt.direction).toBe("left");
      });
      test("direction should become top", () => {
        whiteAnt.switchDirection();
        expect(whiteAnt.direction).toBe("top");
      });
    });

    describe("direction is top and cell is black...", () => {
      // Make an ant on a black cell
      const blackAnt = new Ant(cells[16]);
      blackAnt.cell.color = "black";
      test("direction should become left", () => {
        blackAnt.switchDirection();
        expect(blackAnt.direction).toBe("left");
      });
      test("direction should become bottom", () => {
        blackAnt.switchDirection();
        expect(blackAnt.direction).toBe("bottom");
      });
      test("direction should become right", () => {
        blackAnt.switchDirection();
        expect(blackAnt.direction).toBe("right");
      });
      test("direction should become top", () => {
        blackAnt.switchDirection();
        expect(blackAnt.direction).toBe("top");
      });
    });
  });
});
