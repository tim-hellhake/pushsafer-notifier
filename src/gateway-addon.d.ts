/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, Pushsaferu can obtain one at http://mozilla.org/MPL/2.0/.
 */

declare module 'gateway-addon' {
    class Outlet {
        protected name: string;

        constructor(notifier: Notifier, id: string);

        public notify(title: string, message: string, level: Constants.NotificationLevel): void;
    }

    class Notifier {
        constructor(addonManager: any, id: string, packageName: string);

        public handleOutletAdded(outlet: Outlet): void;
    }

    namespace Constants {
        enum NotificationLevel {
            LOW,
            NORMAL,
            HIGH,
        }
    }
}
