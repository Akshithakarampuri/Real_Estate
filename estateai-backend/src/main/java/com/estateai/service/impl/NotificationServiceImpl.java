package com.estateai.service.impl;

import com.estateai.model.Notification;
import com.estateai.repository.NotificationRepository;
import com.estateai.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<Notification> getNotifications(String userEmail) {
        List<Notification> list = notificationRepository.findAllByOrderByCreatedAtDesc();
        if (list.isEmpty()) {
            return List.of();
        }
        return list;
    }

    @Override
    public List<Notification> markAsRead(String id, String userEmail) {
        notificationRepository.findById(id).ifPresent(n -> {
            n.setRead(true);
            notificationRepository.save(n);
        });
        return getNotifications(userEmail);
    }

    @Override
    public List<Notification> markAllAsRead(String userEmail) {
        List<Notification> list = notificationRepository.findAll();
        list.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(list);
        return getNotifications(userEmail);
    }
}
