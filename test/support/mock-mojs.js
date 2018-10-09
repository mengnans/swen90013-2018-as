require.cache[require.resolve('mo-js')] = {
    exports: {
        Html: () => Promise.resolve(),
        Burst: () => Promise.resolve(),
        Timeline: () => ({
            add: () => ({}),
            replay: () => ({}),
        }),
        easing: {
            bezier: () => ({}),
        },
    },
};
