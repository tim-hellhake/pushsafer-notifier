/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, Pushsaferu can obtain one at http://mozilla.org/MPL/2.0/.*
 */

'use strict';

import { Constants, Notifier, Outlet } from 'gateway-addon';

import fetch from 'node-fetch'

class PushsaferOutlet extends Outlet {
    constructor(notifier: Notifier, private manifest: any) {
        super(notifier, PushsaferOutlet.name);
        this.name = 'Pushsafer';
    }

    async notify(title: string, message: string, _level: Constants.NotificationLevel) {
        const {
            apiKey
        } = this.manifest.moziot.config;

        await fetch('https://www.pushsafer.com/api', {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `k=${apiKey}&d=a&t=${encodeURIComponent(title)}&m=${encodeURIComponent(message)}`
        });
    }
}

export class PushsaferNotifier extends Notifier {
    constructor(addonManager: any, manifest: any) {
        super(addonManager, PushsaferNotifier.name, manifest.name);

        addonManager.addNotifier(this);

        this.handleOutletAdded(
            new PushsaferOutlet(this, manifest)
        );
    }
}
