'use strict';

const helmet = require('helmet');
const njk = nunjucks(app, {
        autoescape: true,
        watch: true,
        noCache: true,
        globals: globals
    });
    filters(njk.env);

    app.enable('trust proxy');

    // Security library helmet to verify 11 smaller middleware functions
    app.use(helmet());

    // Content security policy to allow just assets from same domain
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ['\'self\''],
            fontSrc: ['\'self\' data:'],
            scriptSrc: [
                '\'self\'',
                '\'sha256-+6WnXIl4mbFTCARd8N3COQmT3bJJmo32N8q8ZSQAIcU=\'',
                '\'sha256-AaA9Rn5LTFZ5vKyp3xOfFcP4YbyOjvWn2up8IKHVAKk=\'',
                '\'sha256-G29/qSW/JHHANtFhlrZVDZW1HOkCDRc78ggbqwwIJ2g=\'',
                'www.google-analytics.com',
                `'nonce-${uuid}'`
            ],
            connectSrc: ['\'self\''],
            mediaSrc: ['\'self\''],
            frameSrc: ['\'none\''],
            imgSrc: ['\'self\'', 'www.google-analytics.com'],
            frameAncestors: ['\'self\'']
        },
        browserSniff: true,
        setAllHeaders: true
    }));
    // Http public key pinning
    app.use(helmet.hpkp({
        maxAge: 900,
        sha256s: ['AbCdEf123=', 'XyzABC123=']
    }));

    // Referrer policy for helmet
    app.use(helmet.referrerPolicy({
        policy: 'origin'
    }));

    app.use(helmet.noCache());

    app.use(helmet.xssFilter({setOnOldIE: true}));
