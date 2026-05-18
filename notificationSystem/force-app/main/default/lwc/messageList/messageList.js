import { LightningElement, wire } from 'lwc';
import getNotifications from '@salesforce/apex/NotificationController.getNotifications';

import { publish, MessageContext } from 'lightning/messageService';
import CHANNEL from '@salesforce/messageChannel/NotificationChannel__c';

export default class MessageList extends LightningElement {

    notifications = [];

    @wire(MessageContext)
    messageContext;

    @wire(getNotifications)
    wiredData({ data }) {
        if (data) {
            this.notifications = data;
        }
    }

    handleSelect(event) {
        const recordId = event.target.dataset.id;

        publish(this.messageContext, CHANNEL, {
            recordId: recordId
        });
    }
}