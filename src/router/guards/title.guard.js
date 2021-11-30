const initalTitle = document.title;

/**
 * 设计态、运行态的过滤器
 * @param to { import('vue-router').Route }
 * @param from { import('vue-router').Route }
 * @param next { import('vue-router').NavigationGuardNext }
 */
export function titleGuard(to, from, next) {
    document.title = to.meta?.title || to.name || initalTitle;
    next();
}
