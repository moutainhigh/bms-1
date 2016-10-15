package cn.greenwishing.bms.domain.user;

import cn.greenwishing.bms.domain.Repository;
import cn.greenwishing.bms.utils.paging.UserPaging;

/**
 * User: Wu Fan
 */
public interface UserRepository extends Repository {
    User findUserByAccount(String account);

    UserPaging findUserPaging(UserPaging paging);

    String findUserGuidByAppId(String appId);
}
