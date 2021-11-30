import { ssoAuth } from '@isyscore/messenger';
import store from '@/store';
import axios from '@/utils/axios';

(async () => {
    // try {
    //     await ssoAuth({
    //         axios,
    //         store,
    //         ssoUrl: ENVS.ssoUrl
    //     });
    // } catch (err) {
    //     return;
    // }

    await import('./render');
})();
