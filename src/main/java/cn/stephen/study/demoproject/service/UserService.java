package cn.stephen.study.demoproject.service;

import cn.stephen.study.demoproject.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    List<User> selectAllUser();
    User login(User user);
}
