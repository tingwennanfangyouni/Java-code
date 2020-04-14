package cn.stephen.study.demoproject.impl;

import cn.stephen.study.demoproject.entity.TestEntity;
import cn.stephen.study.demoproject.mapper.TestDao;
import cn.stephen.study.demoproject.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TestServiceImpl implements TestService {
    @Autowired
    private TestDao testDao;

    @Override
    public TestEntity getById(Integer id) {
        return null;
    }
}
