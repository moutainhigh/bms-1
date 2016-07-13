package cn.greenwishing.bms.service.impl;

import cn.greenwishing.bms.domain.user.User;
import cn.greenwishing.bms.domain.user.UserRepository;
import cn.greenwishing.bms.dto.user.UserDTO;
import cn.greenwishing.bms.dto.user.UserPagingDTO;
import cn.greenwishing.bms.service.UserService;
import cn.greenwishing.bms.shared.PublicUserDetails;
import cn.greenwishing.bms.utils.MD5Utils;
import cn.greenwishing.bms.utils.ValidationUtils;
import cn.greenwishing.bms.utils.paging.UserPaging;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * @author Wu Fan
 */
@Service("userService")
public class UserServiceImpl implements UserService, UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = findByAccount(username);
        if (user == null) {
            return new PublicUserDetails();
        }
        return new PublicUserDetails(user);
    }

    @Override
    public User findByAccount(String account) {
        return userRepository.findUserByAccount(account);
    }

    @Override
    public UserPagingDTO loadUserPaging(UserPagingDTO pagingDTO) {
        UserPaging paging = userRepository.findUserPaging(pagingDTO.toPaging());
        return pagingDTO.convertResult(paging);
    }

    @Override
    public void saveOrUpdateUser(UserDTO userDTO) {
        User user;
        String guid = userDTO.getGuid();
        String username = userDTO.getUsername();
        if (ValidationUtils.isNotEmpty(guid)) {
            user = userRepository.findByGuid(User.class, guid);
        } else {
            String md5Password = MD5Utils.md5(userDTO.getPassword());
            user = new User(userDTO.getAccount(), md5Password);
        }
        user.updateUsername(username);
        user.updateStatus(userDTO.getStatus());
        userRepository.saveOrUpdate(user);
    }

    @Override
    public UserDTO loadByGuid(String guid) {
        User user = userRepository.findByGuid(User.class, guid);
        return new UserDTO(user);
    }
}
