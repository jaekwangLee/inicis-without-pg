import React from 'react';

export const Order = ({ onOrder }) => {
    return (
        <>
            <h3>주문해보자</h3>
            <button onClick={onOrder}>상품 주문</button>
        </>
    );
};
