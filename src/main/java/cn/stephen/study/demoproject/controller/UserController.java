package cn.stephen.study.demoproject.controller;

import cn.stephen.study.demoproject.entity.User;
import cn.stephen.study.demoproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequestMapping("/demoproject/user")
public class UserController {
    @Autowired
    private UserService userService;

    /**
     *  跳转至登陆界面
     * @return
     */
    @RequestMapping("/index")
    public String index(){
        return "login.html";
    }

    @RequestMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password, HttpSession session, RedirectAttributes attributes) {
        User user = new User();
        user.setName(username);
        user.setPassWord(password);
        User user1=userService.login(user);
        if (null != user1) {
            return "成功";
        } else {
            return "失败";
        }
        }
}
