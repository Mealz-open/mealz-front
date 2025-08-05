import React from 'react';

function CardMenu({ image, name, quantity, expirationDate, availableTimeRange }) {
    const formattedExpirationDate = expirationDate ? expirationDate.toLocaleDateString() : 'N/A';
    return(
        <div class="card-row">
            <div class="box-col">
                <h3>{name}</h3>
                <h5>수량: {quantity}</h5>
                <h5>소비기한: {formattedExpirationDate}</h5>
                <h5>수령가능시간: {availableTimeRange.start} - {availableTimeRange.end}</h5>
            </div>
            <img src={image} class="img-product"/>
        </div>
    );
}

export default CardMenu;