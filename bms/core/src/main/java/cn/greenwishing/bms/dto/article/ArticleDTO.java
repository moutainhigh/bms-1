package cn.greenwishing.bms.dto.article;

import cn.greenwishing.bms.domain.article.Article;
import cn.greenwishing.bms.domain.article.ArticleCategory;
import cn.greenwishing.bms.utils.HtmlFilter;
import cn.greenwishing.bms.utils.JodaUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * User: Wu Fan
 */
public class ArticleDTO {

    private String guid;
    private String title;
    private String content;
    private String categoryGuid;
    private String categoryName;
    private String creationTime;

    public ArticleDTO() {
    }

    public ArticleDTO(Article article) {
        this.guid = article.guid();
        this.title = article.title();
        this.content = article.content();
        ArticleCategory category = article.category();
        if (category != null) {
            this.categoryGuid = category.guid();
            this.categoryName = category.name();
        }
        this.creationTime = article.creationTime().toString(JodaUtils.DATE_TIME_FORMAT);
    }

    public static List<ArticleDTO> toDTOs(List<Article> articles) {
        List<ArticleDTO> articleDTOs = new ArrayList<>();
        for (Article article : articles) {
            ArticleDTO articleDTO = new ArticleDTO(article);
            articleDTOs.add(articleDTO);
        }
        return articleDTOs;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public String getContentText() {
        return HtmlFilter.doFilter(content);
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCategoryGuid() {
        return categoryGuid;
    }

    public void setCategoryGuid(String categoryGuid) {
        this.categoryGuid = categoryGuid;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCreationTime() {
        return creationTime;
    }
}
