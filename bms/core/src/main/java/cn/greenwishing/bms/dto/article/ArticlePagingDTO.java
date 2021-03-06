package cn.greenwishing.bms.dto.article;

import cn.greenwishing.bms.domain.article.Article;
import cn.greenwishing.bms.domain.article.ArticleAccess;
import cn.greenwishing.bms.dto.AbstractPagingDTO;
import cn.greenwishing.bms.utils.paging.ArticlePaging;

import java.util.List;

/**
 * @author Frank wu
 */
public class ArticlePagingDTO extends AbstractPagingDTO<ArticleDTO, ArticlePaging> {

    private String key;
    private ArticleAccess access;

    @Override
    public ArticlePaging toPaging() {
        return new ArticlePaging(currentPage, pageSize, key, userGuid, access);
    }

    @Override
    protected void convertList(ArticlePaging paging) {
        List<Article> list = paging.getList();
        this.list = ArticleDTO.toDTOs(list);
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public ArticleAccess getAccess() {
        return access;
    }

    public void setAccess(ArticleAccess access) {
        this.access = access;
    }
}
