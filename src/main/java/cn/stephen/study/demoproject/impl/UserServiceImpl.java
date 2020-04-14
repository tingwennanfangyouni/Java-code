package cn.stephen.study.demoproject.impl;

import cn.stephen.study.demoproject.entity.User;
import cn.stephen.study.demoproject.mapper.UserMapper;
import cn.stephen.study.demoproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
@Autowired
private UserMapper userMapper;
    @Override
    public List<User> selectAllUser() {
        return userMapper.selectAllUser();
    }

    @Override
    public User login(User user) {
        return userMapper.login(user);
    }
}
