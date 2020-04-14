package cn.stephen.study.demoproject.controller;


import cn.stephen.study.demoproject.entity.TestEntity;
import cn.stephen.study.demoproject.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/demoproject/test")
public class TestController {

    @Autowired
    private TestService testService ;

    @RequestMapping("/hello")
    public String test(){
        return "hello";
    }

}
