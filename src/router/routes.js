import { homeRoute } from './routes/home.route';
import { loginRoute } from './routes/login.route';
import { dailyRoute } from './routes/daily.route';
import { morningPatrolRoute } from './routes/morningPatrol.route';
import { safetyRoute } from './routes/safety.route';
import { violationRoute } from './routes/violation.route';
import { kytRoute } from './routes/kyt.route';
import { fivesRoute } from './routes/fives.route';
import { examineRoute } from './routes/examine.route';
import { meetingRoute } from './routes/meeting.route';
import { applyRoute } from './routes/apply.route';
import { myRoute } from './routes/my.route';

const routes = [
    homeRoute,
    ...safetyRoute,
    ...violationRoute,
    ...kytRoute,
    ...fivesRoute,
    loginRoute,
    dailyRoute,
    ...morningPatrolRoute,
    ...examineRoute,
    ...meetingRoute,
    ...applyRoute,
    ...myRoute
];

routes.push({
    path: '*',
    redirect: '/'
});

export default routes;
