import Axios, { apiVersion, userToken, processFault } from '@isyscore/axios';
import store from '@/store';
import router from '@/router';

const axios = Axios.create();
const axios1 = Axios.create({ mergeDataResponse: true });

axios.features
    .use(
        apiVersion({
            version: '2.0'
        })
    )
    .use(
        userToken({
            headerKey: 'token',
            tokenVal() {
                return localStorage.getItem('token') || '';
            }
        })
    )
    .use(
        userToken({
            headerKey: 't-head-userId',
            tokenVal() {
                return JSON.parse(localStorage.getItem('userInfo')).userId || '';
            }
        })
    )
    .use(
        userToken({
            headerKey: 't-head-userName',
            tokenVal() {
                return JSON.parse(localStorage.getItem('userInfo')).loginName || '';
            }
        })
    )
    .use(
        processFault({
            processor(fault) {
                const { code, status } = fault;
                if (status === 401) {
                    router.push('/login').then().catch();
                }
            }
        })
    );
axios1.features
    .use(
        apiVersion({
            version: '1.0'
        })
    )
    .use(
        userToken({
            headerKey: 'token',
            tokenVal() {
                return localStorage.getItem('token') || '';
            }
        })
    )
    .use(
        processFault({
            processor(fault) {
                const { code, status } = fault;
                if (status === 401) {
                    router.push('/login').then().catch();
                }
            }
        })
    );

export { axios1 };
export default axios;
