import dayjs from 'dayjs';
import { v4 } from 'uuid';

export const makeOrderId = prefix => {
    return `ORDER_${prefix}_${dayjs().valueOf().toString().substr(4, 9)}_${v4().substr(4, 8)}`;
};
