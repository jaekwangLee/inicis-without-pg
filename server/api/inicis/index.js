import express from 'express';
import {
    getNewOrder,
    onConfirmPayment,
    getRequestForm,
    openInicisModule,
    onSavePaymentInfo,
    getMobileRequestForm,
    onSavePaymentInfoWithAuth,
} from '../controller/inicis.controller';

const InicisRouter = express.Router();

//common
InicisRouter.get('/new/order', (req, res) => {
    return getNewOrder(req, res);
});

InicisRouter.post('/confirm/payment', (req, res) => {
    return onConfirmPayment(req, res);
});

// pc
InicisRouter.get('/request/form', (req, res) => {
    return getRequestForm(req, res);
});

InicisRouter.get('/popup/open/:orderId', (req, res) => {
    return openInicisModule(req, res);
});

InicisRouter.post('/pay/after', (req, res) => {
    return onSavePaymentInfo(req, res);
});

// mobile
InicisRouter.get('/m/request/form', (req, res) => {
    return getMobileRequestForm(req, res);
});

InicisRouter.post('/m/pay/after', (req, res) => {
    return onSavePaymentInfoWithAuth(req, res);
});

export default InicisRouter;
