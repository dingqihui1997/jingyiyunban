import { Notify, Dialog } from '@isyscore/mobile-ui';

const messageify = (message) => (message.message ? message.message : message.toString());

/**
 * 成功消息
 * @param message
 * @returns {*}
 */
export function showSuccess(message) {
    return Notify({
        type: 'success',
        duration: 1000,
        message: messageify(message)
    });
}

/**
 * 错误消息
 * @param message
 * @returns {*}
 */
export function showError(message) {
    return Notify({
        type: 'danger',
        duration: 1000,
        message: messageify(message)
    });
}

/**
 * 警告消息
 * @param message
 * @returns {*}
 */
export function showWarning(message) {
    return Notify({
        type: 'warning',
        duration: 1000,
        message: messageify(message)
    });
}

/**
 * 提醒消息
 * @param message
 * @param title
 * @returns {Promise<*>}
 */
export async function openAlert(message, title = '提醒') {
    return await Dialog.alert({ message: messageify(message), title });
}

/**
 * 二次确认消息
 * @param message
 * @param title
 * @returns {Promise<*>}
 */
export async function openConfirm(message, title = '请确认') {
    return await Dialog.confirm({ message: messageify(message), title });
}
