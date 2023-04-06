/**
 * Vue installer for rudderstack
 * @param  {Vue instance} Vue
 * @param  {Object} [options={}]
 */
import init from "./init";
export const rudderstack = {
    install(app, options) {
        // configure the app
        let analytics = init(options, () => { });
        // Page tracking
        if (options.router !== undefined) {
            options.router.afterEach((to, from) => {
                // Make a page call for each navigation event
                analytics.page(options.pageCategory, to.name || "", {
                    path: to.fullPath,
                    referrer: from.fullPath,
                });
            });
        }
        // Setup instance access through inject
        app.provide("$rudderstack", {
            get() {
                return analytics;
            },
        });
    },
};
