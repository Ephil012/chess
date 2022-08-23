const n_queens = (n) => {
    let grid = []
    for (let i = 0; i < n; i++) {
        let row = []
        for (let j = 0; j < n; j++) {
            row.push(null)
        }
        grid.push(row)
    }
    recurse(grid, 0, n)
}

const extendMarkers = (grid, column) => {
    for(let i = 0; i < grid.length; i++) {
        if (grid[i][column - 1] == "h") {
            grid[i][column] = "h"
        }
        if (grid.length > i - 1 && i - 1 >= 0) {
            if (grid[i - 1][column - 1] == "dn") {
                grid[i][column] = "dn"
            }
        }
        if (grid.length > i + 1 && i + 1 >= 0) {
            if (grid[i + 1][column - 1] == "du") {
                grid[i][column] = "du"
            }
        }
    }
    return grid
}

const checkQueen = (grid, column, row) => {
    if (grid[row][column] == "q" || grid[row][column] == "h" || grid[row][column] == "du" || grid[row][column] == "dn") {
        return false
    }
    return true
}

const addQueen = (grid, column, row) => {
    grid = extendMarkers(grid, column)
    if (checkQueen(grid, column, row) == false) {
        return null
    }
    let copied = JSON.parse(JSON.stringify(grid));
    copied[row][column] = "q"
    if (copied[row].length > column + 1) {
        copied[row][column + 1] = "h"
        if (copied.length > row + 1 && row + 1 >= 0) {
            copied[row + 1][column + 1] = "dn"
        }
        if (copied.length > row - 1 && row - 1 >= 0) {
            copied[row - 1][column + 1] = "du"
        }
    }
    return copied
}

const recurse = (grid, column, n) => {
    let copies = []
    if (column == 0) {
        for (let i = 0; i < n; i++) {
            let copied = addQueen(grid, column, i)
            copies.push(recurse(copied, column + 1, n))
        }
    } else if (column == n) {
        console.table(grid)
        return grid
    } else {
        for (let i = 0; i < n; i++) {
            let copied = addQueen(grid, column, i)
            if (copied != null) {
                copies.push(recurse(copied, column + 1, n))
            }
        }
    }
    return copies
}

n_queens(4)