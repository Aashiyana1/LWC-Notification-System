import { LightningElement, wire } from 'lwc';
import getNotifications from '@salesforce/apex/NotificationController.getNotifications';
import createNotification from '@salesforce/apex/NotificationController.createNotification';

import LightningPrompt from 'lightning/prompt';
import LightningAlert from 'lightning/alert';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NotificationBell extends LightningElement {
    notifications = [];

    @wire(getNotifications)
    wiredData({ data }) {
        if (data) {
            this.notifications = data;
        }
    }

    get unreadCount() {
        return this.notifications.filter(
            item => item.Status__c === 'Unread'
        ).length;
    }

    async handlePrompt() {
        const result = await LightningPrompt.open({
            message: 'Enter notification title',
            label: 'New Notification'
        });

        if (result) {
            await createNotification({
                title: result,
                message: 'Created from prompt'
            });

            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Notification created',
                    variant: 'success'
                })
            );
        }
    }

    async showAlert() {
        await LightningAlert.open({
            message: 'Notification system working successfully',
            theme: 'success',
            label: 'Success'
        });
    }
}