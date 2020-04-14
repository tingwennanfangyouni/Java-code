package cn.stephen.study.demoproject.mapper;

import cn.stephen.study.demoproject.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    List<User> selectAllUser();
    User login(User user);
}
