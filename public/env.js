(function (root, factory) {
    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.ENVS = factory();
    }
})(
    typeof globalThis !== "undefined"
        ? globalThis
        : typeof self !== "undefined"
        ? self
        : this,
    function () {
        return Object.freeze({
            envVersion: "4.1.1",
            envType: "${envType}",
            ssoUrl: "${ssoUrl}",
            deployEnv: "${deployEnv}",
            osType: "${osType}",
            osVersion: "${osVersion}",
            osBase: "${osBase}",
            appVersion: "${appVersion}",
            remoteDocumentUrl: "${remoteDocumentUrl}",
            remoteDeveloperUrl: "${remoteDeveloperUrl}",
        });
    }
);
