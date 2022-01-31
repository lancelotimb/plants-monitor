import app from './app';

require('greenlock-express')
    .init({
        packageRoot: './',

        // contact for security and critical bug notices
        maintainerEmail: 'lancelot.imb@gmail.com',

        // where to look for configuration
        configDir: './greenlock.d',

        // whether or not to run at cloudscale
        cluster: false,
    })
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .serve(app);
