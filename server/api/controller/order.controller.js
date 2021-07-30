import dayjs from 'dayjs';

const getOrderInfo = async (req, res) => {
    const { orderId } = req.params;
    if (!orderId) {
        return res.send({
            status: 'error',
            data: 'check parameters',
        });
    }

    // 결제 이력 조회

    const sampleData = {
        orderId: 'Something',
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
