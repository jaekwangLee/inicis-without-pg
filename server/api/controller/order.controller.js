import dayjs from 'dayjs';
import { makeOrderId } from '../../util';
import { getClientDomain } from '../../host';

const getOrderInfo = async (req, res) => {
    const { orderId } = req.params;
    if (!orderId) {
        return res.send({
            status: 'error',
            data: 'check parameters',
        });
    }

    // 결제 이력 조회
    // 정상처리 되지 않은 주문내역이면
    // return res.redirect(getClientDomain() + '/shop/list');

    const sampleData = {
        orderId: makeOrderId('sample'),
        service: 'Sample',
        orderAt: dayjs().toDate(),
        receipt: {
            vBank: '하나은행',
            vAccount: '11001010101',
            vAmount: '100',
            vHolder: '(주) 케이지이니',
        },
    };
    return res.send({ status: 'success', data: sampleData });
};

export { getOrderInfo };
