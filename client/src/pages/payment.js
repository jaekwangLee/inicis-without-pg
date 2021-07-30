import React, { useEffect, useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import axios from '@/axios';

import Failed from '@/components/payment/failed';
import Receipt from '@/components/payment/result';
import Closing from '@/components/payment/close';

const PayPage = props => {
    const [orderInfo, setOrderInfo] = useState(null);
    const { status, orderId } = useParams();

    useEffect(() => {
        if (orderId) fetchOrderInfo();
    }, []);

    const fetchOrderInfo = () => {
        axios.get(`/v1/order/info/${orderId}`).then(resolve => {
            const { data: info } = resolve;
            const { status, data } = info;
            if (status === 'success') setOrderInfo(data);
        });
    };

    if (status === 'close') {
        props.history.push('/shop/list');
    }

    return (
        <>
            <h1>결제관련 페이지</h1>
            {status === 'failed' && <Failed />}
            {status === 'result' && <Receipt data={orderInfo} />}
            {status === 'close' && <Closing />}
            {!status && <NotFound />}

            <button
                onClick={() => {
                    props.history.push('/');
                }}
            >
                홈으로
            </button>
        </>
    );
};

const NotFound = () => <h3>Not Found</h3>;

export default withRouter(PayPage);
