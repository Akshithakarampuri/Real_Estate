package com.estateai.service;

import com.estateai.model.Notification;

import java.util.List;

public interface NotificationService {

    List<Notification> getNotifications(String userEmail);

    List<Notification> markAsRead(String id, String userEmail);

    List<Notification> markAllAsRead(String userEmail);
}
