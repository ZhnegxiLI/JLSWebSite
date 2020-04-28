import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StoreService {
    address = '758 rue du Goulet 93300 Aubervilliers';
    email = 'stroyka@example.com';
    phone = ['(800) 060-0730', '(800) 060-0730'];
    hours = 'Mon-Sat 10:00pm - 7:00pm';

    get primaryPhone(): string|null {
        return this.phone.length > 0 ? this.phone[0] : null;
    }

    constructor() { }
}
