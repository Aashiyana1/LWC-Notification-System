public with sharing class NotificationController {

    @AuraEnabled(cacheable=true)
    public static List<Notification__c> getNotifications() {
        return [
            SELECT Id, Title__c, Message__c, Status__c, CreatedDate
            FROM Notification__c
            ORDER BY CreatedDate DESC
        ];
    }

    @AuraEnabled
    public static void markAsRead(Id notificationId) {
        Notification__c n = [
            SELECT Id, Status__c
            FROM Notification__c
            WHERE Id = :notificationId
            LIMIT 1
        ];

        n.Status__c = 'Read';
        update n;
    }

    @AuraEnabled
    public static void createNotification(String title, String message) {
        Notification__c n = new Notification__c(
            Title__c = title,
            Message__c = message,
            Status__c = 'Unread'
        );

        insert n;
    }
}