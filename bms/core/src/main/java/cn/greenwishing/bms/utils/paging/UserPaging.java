package cn.greenwishing.bms.utils.paging;

import cn.greenwishing.bms.domain.user.User;

/**
 * User: Wufan
 * Date: 2016/7/13
 */
public class UserPaging extends AbstractPaging<User> {

    private String key;

    public UserPaging(int currentPage, int pageSize, String key) {
        super(currentPage, pageSize);
        this.key = key;
    }

    public String getKey() {
        return key;
    }
}
