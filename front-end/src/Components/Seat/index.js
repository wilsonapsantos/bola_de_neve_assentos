import React, { useEffect, useState } from 'react';
import "./style.css"

export default function Seat({ columns }) {

    const [listColumns, setListColumns] = useState(null);

    useEffect(() => {
        setListColumns(columns);
    }, []);

    const handleSetSeat = (id) => {

        // let split = id.split('-');

        // let newListColumns = listColumns;

        // for (var a in newListColumns) {
        //     if (a.column == split[0]) {
        //         for(var b in a.)
        //     }
        // }

        console.log(id);
    };

    return (
        <div className='box-content'>
            {columns && columns.map((column, columnIndex) =>
                <div key={columnIndex} className="column">
                    <p><b>{column.columnName}</b></p>
                    {column.rows.map((row, rowIndex) =>
                        <div key={rowIndex} className="row">
                            {columnIndex === 0 &&
                                <b><p className='row-number'>{row.rowNumber < 10 ? "0" + row.rowNumber : row.rowNumber}</p></b>
                            }
                            <div className='seats-row'>
                                {row.seats && row.seats.map((seat, seatIndex) =>
                                    <div key={seatIndex} className={seat.filled ? 'seat seat-unavailable' : 'seat seat-available'}
                                        onClick={() => handleSetSeat(column.columnName + "-" + row.rowNumber + "-" + seat.number)}>
                                        <p className='seat-name'>{seat.number}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};