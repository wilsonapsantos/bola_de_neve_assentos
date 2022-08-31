import React, { useEffect, useState } from 'react';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import "./style.css"

export default function Seat({ columns, changeSeat }) {

    const [listColumns, setListColumns] = useState([]);

    useEffect(() => {
        setListColumns(columns);
    }, [columns]);

    const handleSetSeat = (id) => {
        changeSeat(id);
    };

    return (
        <div className='box-content'>
            {listColumns && listColumns.map((column, columnIndex) =>
                <div key={columnIndex} className="column">
                    <p><b>{column.columnName}</b></p>
                    <div className={columnIndex !== 0 && columnIndex !== listColumns.length - 1 ? "column-margin-top": ""}>
                        {column.rows.map((row, rowIndex) =>
                            < div key={rowIndex} className={columnIndex === 0 ? "row row-first" : columnIndex === listColumns.length - 1 ? "row row-last" : "row"}>
                                {columnIndex === 0 &&
                                    <b><p className='row-number'>{row.rowNumber < 10 ? "0" + row.rowNumber : row.rowNumber}</p></b>
                                }
                                <div className='seats-row'>
                                    {row.seats && row.seats.map((seat, seatIndex) =>
                                        <div key={seatIndex} onClick={() => handleSetSeat(column.columnName + "-" + row.rowNumber + "-" + seat.number)}>
                                            <EventSeatIcon color={seat.filled ? 'disabled' : 'success'} />
                                            <p className='seat-name-event'>{seat.number}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
            }
        </div >
    );
};