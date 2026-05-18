import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';

import CHANNEL from '@salesforce/messageChannel/NotificationChannel__c';
import markAsRead from '@salesforce/apex/NotificationController.markAsRead';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DetailView extends LightningElement {

    selectedId;
    subscription;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscription = subscribe(
            this.messageContext,
            CHANNEL,
            (message) => {
                this.selectedId = message.recordId;
            }
        );
    }

    disconnectedCallback() {
    this.subscription = null;
}

    async handleRead() {
        await markAsRead({
            notificationId: this.selectedId
        });

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Notification marked as read',
                variant: 'success'
            })
        );
    }
}