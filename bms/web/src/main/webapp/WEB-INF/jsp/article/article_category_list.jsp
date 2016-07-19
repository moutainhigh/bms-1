<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>文章分类</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <script type="text/javascript">
        function gen() {
            WF.ajax.req({
                url: 'gen',
                success: function() {
                    location.reload();
                }
            });
        }
    </script>
</head>
<body>
<div class="weui_tab">
    <div class="weui_tab_bd">
        <div class="weui_panel weui_panel_access">
            <div class="weui_panel_hd">文章分类</div>
            <div class="weui_panel_bd">
                <c:choose>
                    <c:when test="${not empty categoryDTOs}">
                        <c:forEach items="${categoryDTOs}" var="category">
                            <a class="weui_media_box weui_media_appmsg" href="edit_category?guid=${category.guid}">
                                <div class="weui_media_bd">
                                    <h4 class="weui_media_title">${category.name}</h4>
                                </div>
                            </a>
                        </c:forEach>
                    </c:when>
                    <c:otherwise>
                        <div class="weui_btn_area">
                            <a class="weui_btn weui_btn_primary" href="javascript:void(0)" onclick="gen()">生成默认分类</a>
                        </div>
                    </c:otherwise>
                </c:choose>
            </div>
        </div>
    </div>
    <div class="weui_tabbar">
        <a class="weui_tabbar_item" href="add_category">
            <div class="weui_tabbar_icon">
                <img src="${pageContext.request.contextPath}/images/icons/icon_add.png" alt="">
            </div>
            <p class="weui_tabbar_label">添加</p>
        </a>
        <a class="weui_tabbar_item" href="${pageContext.request.contextPath}/system/article/list">
            <div class="weui_tabbar_icon">
                <img src="${pageContext.request.contextPath}/images/icons/icon_back.png" alt="">
            </div>
            <p class="weui_tabbar_label">返回</p>
        </a>
    </div>
</div>
</body>
</html>