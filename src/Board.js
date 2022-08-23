import React, { useState } from 'react';
import chess from "./Chess";

function setupBoard(n, board) {
    let items = []
    for(let i = 0; i < n; i++) {
        let row = []
        for(let j = 0; j < n; j++) {
            let queen = null
            if (board.length > 0) {
                if(board[i][j].includes('q')) {
                    queen = <h4 className="text-2xl text-center">👑</h4>
                }
            }
            row.push(
            <td className="w-16 h-16 p-2 border bg-white rounded-lg content-center">
                {queen}
            </td>)
        }
        items.push(<tr>{row}</tr>)
    }
    return items
}

function changeBoard(count, setCount, prev, setPrev, next, setNext, size) {
    if (count >= 0 && count < size) {
        setCount(count)
    }

    if ((count - 1) >= 0) {
        if (prev == true) {
            setPrev(false)
        }
    } else {
        if (prev == false) {
            setPrev(true)
        }
    }

    if ((count + 1) < size) {
        if (next == true) {
            setNext(false)
        }
    } else {
        if (next == false) {
            setNext(true)
        }
    }
}

function Board(props) {
    const [count, setCount] = useState(0);

    let boards = chess(props.n)
    let board = boards[count]
    if (boards.length == 0) {
        board = []
    }
    const [prev, setPrev] = useState(true);
    const [next, setNext] = useState(false);

    React.useEffect(() => {
        setPrev(true);
        setNext(false);
        setCount(0);
    }, [props.n])

    let items = setupBoard(props.n, board)
    
    return (
        <div className="flex flex-col content-between items-center flex-1">
            <div>
                <h1 className='font-semibold text-3xl text-center'>Board {count + 1}</h1>
                <table className='border-separate border-spacing-2'>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>
            <div>
                <button className="m-4 disabled:text-gray-400" disabled={prev} onClick={
                    () => changeBoard(count - 1, setCount, prev, setPrev, next, setNext, boards.length)
                } >Previous</button>
                <button className="m-4 disabled:text-gray-400" disabled={next} onClick={
                    () => changeBoard(count + 1, setCount, prev, setPrev, next, setNext, boards.length)
                }>Next</button>
            </div>
        </div>
    );
}

export default Board;
