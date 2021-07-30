import React, { useState } from 'react';
import { withRouter, useParams } from 'react-router-dom';

import { Order } from '@/components/shop/order';
import { isMobile } from '@/util';
import axios from '@/axios';

const ShopPage = props => {
    const { step, orderId } = useParams();
    let orderNumber = null;

    let inicisFormStatus = null;
    console.log(step);

    const onOrderRequest = () => {
        if (isMobile()) return mobileOrder();
        else return webOrder();
    };

    const newOrder = () => {
        return axios.get('/v1/inicis/new/order');
    };

    const webOrder = async () => {
        const { data: info } = await newOrder();
        const { status, data } = info;

        if (status === 'success') {
            console.log(data);
            orderNumber = data;

            axios.get('/v1/inicis/request/form', { params: { orderId: data } }).then(resolve => {
                const { data: info } = resolve;
                const { status, data } = info;
                if (status === 'success') {
                    const form = document.createElement('form');
                    form.method = 'post';
                    form.acceptCharset = 'UTF-8';
                    form.hidden = true;
                    form.id = 'pay_form';

                    for (let o in data) {
                        const input = document.createElement('input');
                        input.name = o;
                        input.value = data[o];
                        input.hidden = true;
                        form.appendChild(input);
                    }

                    document.querySelector('#shop-page').appendChild(form);
                    window.INIStdPay.pay('pay_form');

                    inicisFormStatus = setInterval(checkInicisFormStatus, 1000);
                } else {
                    alert('요청 실패');
                }
            });
        } else {
            alert('요청 실패');
        }
    };

    const mobileOrder = async () => {
        const { data: info } = await newOrder();
        const { status, data } = info;

        if (status === 'success') {
            orderNumber = data;

            axios.get('/v1/inicis/m/request/form', { params: { orderId: data } }).then(resolve => {
                const { data: info } = resolve;
                const { status, data } = info;

                if (status === 'success') {
                    const form = document.createElement('form');
                    form.method = 'post';
                    form.acceptCharset = 'UTF-8';
                    form.hidden = true;
                    form.id = 'pay_form';
                    form.action = 'https://mobile.inicis.com/smart/payment/';

                    for (let o in data) {
                        const input = document.createElement('input');
                        input.name = o;
                        input.value = data[o];
                        input.hidden = true;
                        form.appendChild(input);
                    }

                    document.querySelector('#shop-page').appendChild(form);
                    form.submit();
                } else {
                    alert('요청 실패');
                }
            });
        }
    };

    const checkInicisFormStatus = () => {
        const node = document.querySelector('.inipay_modal-backdrop');
        if (node) return true;
        else {
            const form_node = document.querySelector('#pay_form');
            if (form_node) form_node.remove();

            fetchOrderInfo();
            return false;
        }
    };

    const fetchOrderInfo = () => {
        clearInterval(inicisFormStatus);

        if (!orderNumber && !orderId) return props.history.push('/payment/failed');
        else props.history.push(`/payment/result/${orderNumber || orderId}`);
    };

    return (
        <div id='shop-page'>
            <h1>주문관련 페이지</h1>

            {step === 'list' && <Order onOrder={onOrderRequest} />}
            {step !== 'list' && <NotFound />}
        </div>
    );
};

const NotFound = () => <h3>Not Found</h3>;

export default withRouter(ShopPage);
