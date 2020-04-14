package cn.stephen.study.demoproject.mapper;

import cn.stephen.study.demoproject.entity.TestEntity;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TestDao {

    TestEntity getById(Integer id);

}
