package cn.greenwishing.bms.utils.query.helper;

import cn.greenwishing.bms.domain.article.Article;
import cn.greenwishing.bms.domain.billing.Billing;
import cn.greenwishing.bms.domain.billing.BillingType;
import cn.greenwishing.bms.utils.JodaUtils;
import cn.greenwishing.bms.utils.ValidationUtils;
import cn.greenwishing.bms.utils.paging.ArticlePaging;
import cn.greenwishing.bms.utils.paging.BillingPaging;
import org.hibernate.Query;
import org.joda.time.LocalDate;
import org.springframework.orm.hibernate3.HibernateTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author Wu Fan
 */
public class ArticleQueryHelper extends AbstractQueryHelper<Article, ArticlePaging> {

    public ArticleQueryHelper(HibernateTemplate hibernateTemplate, ArticlePaging paging) {
        super(hibernateTemplate);
        this.paging = paging;

        String key = paging.getKey();
        if (ValidationUtils.isNotEmpty(key)) {
            addFilter(keyFilter(key));
        }
    }

    private Filter keyFilter(final String key) {
        final List<String> keys = Arrays.asList(key.split(" "));
        return new ParameterFilter() {
            @Override
            public void setParameter(Query query) {
                for (int i = 0; i < keys.size(); i++) {
                    String k = keys.get(i);
                    query.setParameter("key" + i, "%" + k + "%");
                }
            }

            @Override
            public String getSubHql() {
                String subHql = " and (";
                for (int i = 0; i < keys.size(); i++) {
                    if (i != 0) {
                        subHql += " or";
                    }
                    subHql += " (a.title like :key" + i + " or a.content like :key" + i + ")";
                }
                return subHql + ")";
            }
        };
    }

    @Override
    public String getResultHql() {
        return "from Article a where 1=1 " + getSubHql() + " order by a.id desc";
    }

    @Override
    public String getTotalCountHql() {
        return "select count(*) from Article a where 1=1 " + getSubHql();
    }

    @Override
    public int getStartIndex() {
        return paging.getStartIndex();
    }

    @Override
    public int getPageSize() {
        return paging.getPageSize();
    }
}