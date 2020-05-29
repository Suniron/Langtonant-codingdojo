import Cell, { initCells, findCellAtCoords } from "Canvas/cell";

const cells = initCells({ x: 1920, y: 1080 }, 10, 10);

describe("Cells tests:", () => {
  describe("initCells function...", () => {
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

  describe("getCellAtPos function...", () => {
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

describe("Ant test:", () => {});
