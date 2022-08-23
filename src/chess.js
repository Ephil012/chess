const output_queens = (grid, n) =>  {
    let results = []
    for (let i = 0; i < n; i++) {
        let row = ""
        for (let j = 0; j < n; j++) {
            if (grid[i][j].includes('q')) {
                row = row.concat("Q")
            } else {
                row = row.concat(".")
            }
        }
        results.push(row)
    }
    return results
}

const nQueens = (n) => {
    let grid = []
    for (let i = 0; i < n; i++) {
        let row = []
        for (let j = 0; j < n; j++) {
            row.push([null])
        }
        grid.push(row)
    }
    let results = recurse(grid, 0, n)
    return results
}

const extendMarkers = (grid, column) => {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][column - 1].includes("h")) {
            grid[i][column].push("h")
        }
        if (grid.length > i - 1 && i - 1 >= 0) {
            if (grid[i - 1][column - 1].includes("dn")) {
                grid[i][column].push("dn")
            }
        }
        if (grid.length > i + 1 && i + 1 >= 0) {
            if (grid[i + 1][column - 1].includes("du")) {
                grid[i][column].push("du")
            }
        }
    }
    return grid
}

const checkQueen = (grid, column, row) => {
    return grid[row][column].includes("h") || grid[row][column].includes("du") || grid[row][column].includes("dn")
}

const addQueen = (grid, column, row) => {
    if (checkQueen(grid, column, row)) {
        return null
    }
    let copied = JSON.parse(JSON.stringify(grid));
    copied[row][column] = ["q"]
    if (copied[row].length > column + 1) {
        copied[row][column + 1] = ["h"]
        if (copied.length > row + 1 && row + 1 >= 0) {
            copied[row + 1][column + 1] = ["dn"]
        }
        if (copied.length > row - 1 && row - 1 >= 0) {
            copied[row - 1][column + 1] = ["du"]
        }
    }
    return copied
}

const recurse = (grid, column, n) => {
    let copies = []
    if (column == 0) {
        for (let i = 0; i < n; i++) {
            let copied = addQueen(grid, column, i)
            let res = recurse(copied, column + 1, n)
            if (res.length > 0) {
                copies.push(...res)
            }
        }
    } else if (column == n) {
        return [grid]
    } else {
        grid = extendMarkers(grid, column)
        for (let i = 0; i < n; i++) {
            let copied = addQueen(grid, column, i)
            if (copied != null) {
                let res = recurse(copied, column + 1, n)
                if (res.length > 0) {
                    copies.push(...res)
                }
            }
        }
    }
    return copies
}

export default nQueens