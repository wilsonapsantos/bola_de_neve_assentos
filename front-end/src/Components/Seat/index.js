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
            {columns && columns.map((item, index) =>
                <div key={index} className="column">
                    <p><b>{item.column}</b></p>
                    {item.row.map((x, i) =>
                        <div key={i} className="row">
                            {index === 0 &&
                                <b><p className='row-number'>{x < 10 ? "0" + x : x}</p></b>
                            }
                            <div className='seats-row'>
                                {item.chair && item.chair.map((seat, seatIndex) =>
                                    <div key={seatIndex} className='seat seat-available'
                                        onClick={() => handleSetSeat(item.column + "-" + x + "-" + seat)}>
                                        <p className='seat-name'>{seat}</p>
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