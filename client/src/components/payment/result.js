import dayjs from 'dayjs';
import React from 'react';

const PaymentResult = ({ data }) => (
    <>
        <h3>주문 결과를 보자</h3>
        {data && data.orderId && (
            <>
                <p>주문번호 : {data.orderId}</p>
                <p>상품명 : {data.service}</p>
                <p>가상계좌 - 은행명 : {data.receipt.vBank}</p>
                <p>가상계좌 - 계좌번호 : {data.receipt.vAccount}</p>
                <p>가상계좌 - 입금주명 : {data.receipt.vHolder}</p>
                <p>가상계좌 - 금액 : {data.receipt.vAmount}</p>
                <p>주문시각 : {dayjs(data.orderAt).format('YY.MM.DD HH:mm')}</p>
            </>
        )}
    </>
);

export default PaymentResult;
