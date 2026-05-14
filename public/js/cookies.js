CookieConsent.run({

    cookie: {
        name: 'cc_cookie',
    },
    guiOptions: {
        consentModal: {
            layout: 'cloud inline',
            position: 'bottom center',
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    categories: {
        necessary: {
            enabled: true,  // this category is enabled by default
            readOnly: true  // this category cannot be disabled
        },
        analytics: {
            autoClear: {
                cookies: [
                    {
                        name: /^_ga/,   // regex: match all cookies starting with '_ga'
                    },
                    {
                        name: '_gid',   // string: exact cookie name
                    }
                ]
            },
            services: {
                ga: {
                    label: 'Google Analytics',
                    onAccept: () => { },
                    onReject: () => { }
                }
            }
        },
        preferences: {}
    },

    language: {
        default: 'en',
        translations: {
            en: {
                consentModal: {
                    title: 'Cookies',
                    description: 'We use cookies to improve your browsing experience, analyze website traffic and personalize content.',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Necessary only',
                    showPreferencesBtn: 'Manage Individual preferences',
                    footer: `
                        <a href="/public/assets/uploads/IP Custodian Privacy Policy.pdf" target="_blank">Privacy Policy</a>
                    `,
                },
                preferencesModal: {
                    title: 'Manage cookie preferences',
                    acceptAllBtn: 'Accept all',
                    acceptNecessaryBtn: 'Reject all',
                    savePreferencesBtn: 'Accept current selection',
                    closeIconLabel: 'Close modal',
                    serviceCounterLabel: 'Service|Services',
                    sections: [
                        {
                            title: 'Your Privacy Choices',
                            description: `In this panel you can express some preferences related to the processing of your personal information. You may review and change expressed choices at any time by resurfacing this panel via the provided link. To deny your consent to the specific processing activities described below, switch the toggles to off or use the “Reject all” button and confirm you want to save your choices.`,
                        },
                        {
                            title: 'Strictly Necessary',
                            description: 'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Performance and Analytics',
                            description: 'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                            linkedCategory: 'analytics',
                            cookieTable: {
                                caption: 'Cookie table',
                                headers: {
                                    name: 'Cookie',
                                    domain: 'Domain',
                                    desc: 'Description'
                                },
                                body: [
                                    {
                                        name: '_ga',
                                        domain: location.hostname,
                                        desc: 'Description 1',
                                    },
                                    {
                                        name: '_gid',
                                        domain: location.hostname,
                                        desc: 'Description 2',
                                    }
                                ]
                            }
                        },
                        {
                            title: 'More information',
                            description: 'For any questions regarding our cookie policy and your privacy choices, please contact us at <a href="mailto:custodianrenewals@myipcustodian.com">custodianrenewals@myipcustodian.com</a>.'
                        }
                    ]
                }
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const manageCookiesBtn = document.getElementById('manageCookies');

    if (manageCookiesBtn) {
        manageCookiesBtn.addEventListener('click', () => {
            CookieConsent.showPreferences();
        });
    }
});