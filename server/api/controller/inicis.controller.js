import dayjs from 'dayjs';
import { makeOrderId } from '../../util';
import { getClientDomain, getServerDomain } from '../../host';
import { encryptSha256 } from '../../libs/encrypt';

require('dotenv').config();

const getNewOrder = async (req, res) => {
    const { serviceId } = req.query; // 실제로 개발할때는 요청이 들어온 서비스 정보를 주문번호와 함께 저장합니다.

    try {
        const newOrderId = makeOrderId('sample');

        // save order Id
        // ...

        return res.send({ status: 'success', data: newOrderId });
    } catch (error) {
        console.log('create new order: ', error);
        return res.send({ status: 'error', data: 'error' });
    }
};

const onConfirmPayment = async (req, res) => {
    const { no_tid, no_oid } = req.body;
    // 입금완료 처리

    return res.send({ status: 'success', data: '결제완료' });
};

const getRequestForm = async (req, res) => {
    const { orderId } = req.query;
    if (!orderId) {
        return res.send({ status: 'error', data: 'check parameters' });
    }

    try {
        // 요청된 orderId가 DB에 실제로 존재하는지 체크
    } catch (error) {
        console.log('check exist order: ', error);
        return res.send({ status: 'error', data: 'error' });
    }

    try {
        const price = 100; // 실제로는 요청된 상품 정보를 조회
        const timestamp = dayjs().valueOf();

        const dataset = {
            version: '1.0',
            gopaymethod: 'VBank',
            mid: process.env.MID,
            signature: encryptSha256(`oid=${orderId}&price=${price}&timestamp=${timestamp}`),
            mKey: encryptSha256('SU5JTElURV9UUklQTEVERVNfS0VZU1RS'), // 개발용, 배포용에서는 발급된 key를 사용
            price,
            oid: orderId,
            timestamp,
            currency: 'WON',
            goodname: 'Sample',
            buyername: '홍길동',
            buyertel: '01012341234',
            buyeremail: 'sample@sample.com.kr',
            returnUrl: getServerDomain() + '/v1/inicis/pay/after',
            payViewType: 'popup',
            popupUrl: getServerDomain() + `/v1/inicis/popup/open/${orderId}`,
            closeUrl: '',
        };

        return res.send({ status: 'success', data: dataset });
    } catch (error) {
        console.log('make request form : ', error);
        return res.send({ status: 'error', data: 'error' });
    }
};

const openInicisModule = async (req, res) => {
    const { orderId } = req.params;
    if (!orderId) {
        return res.send({ status: 'error', data: 'check parameters' });
    }

    try {
        // 요청된 orderId가 DB에 실제로 존재하는지 체크
    } catch (error) {
        console.log('check exist order: ', error);
        return res.send({ status: 'error', data: 'error' });
    }

    try {
        const price = 100; // 실제로는 요청된 상품 정보를 조회
        const timestamp = dayjs().valueOf();

        const dataset = {
            version: '1.0',
            gopaymethod: 'VBank',
            mid: process.env.MID,
            signature: encryptSha256(`oid=${orderId}&price=${price}&timestamp=${timestamp}`),
            mKey: encryptSha256('SU5JTElURV9UUklQTEVERVNfS0VZU1RS'), // 개발용, 배포용에서는 발급된 key를 사용
            price,
            oid: orderId,
            timestamp,
            currency: 'WON',
            goodname: 'Sample',
            buyername: '홍길동',
            buyertel: '01012341234',
            buyeremail: 'sample@sample.com.kr',
            returnUrl: getServerDomain() + '/v1/inicis/pay/after',
            payViewType: 'popup',
            popupUrl: getServerDomain() + `/v1/inicis/popup/open/${orderId}`,
            closeUrl: '',
        };

        return res.render('w_inicis', { ...dataset });
    } catch (error) {
        console.log('make request form : ', error);
        return res.send({ status: 'error', data: 'error' });
    }
};

const onSavePaymentInfo = async (req, res) => {
    const { authUrl, authToken, orderNumber, mid, charset, resultCode } = req.body;

    // 0000이면 결제성공
    if (resultCode === '0000') {
        // 결제 관련 데이터 처리
        return res.redirect(getClientDomain() + `/payment/close`);
    } else {
        // 결제 실패 처리
        return res.redirect(getClientDomain() + `/payment/close`);
    }
};

const getMobileRequestForm = async (req, res) => {
    const { orderId } = req.query;
    if (!orderId) {
        return res.send({ status: 'error', data: 'check parameters' });
    }

    try {
        // 요청된 orderId가 DB에 실제로 존재하는지 체크
    } catch (error) {
        console.log('check exist order: ', error);
        return res.send({ status: 'error', data: 'error' });
    }

    try {
        const price = 100; // 실제로는 요청된 상품 정보를 조회

        const dataset = {
            P_INI_PAYMENT: 'VBANK',
            P_MID: process.env.MID,
            P_OID: orderId,
            P_AMT: price,
            P_GOODS: 'Sample',
            P_UNAME: '홍길동',
            P_NEXT_URL: getServerDomain() + '/v1/inicis/m/pay/after',
            P_NOTI_URL: getServerDomain() + '/v1/inicis/confirm/payment',
            P_HPP_METHOD: 1,
            P_CHARSET: 'utf8', // <-- 결과값 한글깨짐 방지
        };

        return res.send({ status: 'success', data: dataset });
    } catch (error) {
        console.log('make request form : ', error);
        return res.send({ status: 'error', data: 'error' });
    }
};

const onSavePaymentInfoWithAuth = async (req, res) => {
    const { P_STATUS, P_OID, P_RMESG1, P_TID, P_AMT, P_REQ_URL, P_NOTI } = req.body;

    if (P_STATUS !== '00') {
        return res.redirect(getClientDomain() + '/payment/close');
    }

    // 결제 관련 데이터 처리
    return res.redirect(getClientDomain() + `/payment/result/${P_OID}`);
};

export { getNewOrder, onConfirmPayment, getRequestForm, openInicisModule, onSavePaymentInfo, getMobileRequestForm, onSavePaymentInfoWithAuth };
