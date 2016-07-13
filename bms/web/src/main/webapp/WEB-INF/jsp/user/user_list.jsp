<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
    <title>用户列表</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <script type="text/javascript">
        WF.user.initSearch = function() {
            $('.weui_dialog_confirm').show();
        };
        WF.user.cancelSearch = function() {
            $('.weui_dialog_confirm').hide();
        };
    </script>
</head>
<body>
<div class="weui_tab">
    <div class="weui_tab_bd">
        <div class="weui_panel weui_panel_access">
            <div class="weui_panel_hd">用户列表</div>
            <div class="weui_panel_bd">
                <c:forEach items="${pagingDTO.list}" var="user">
                    <a href="edit?guid=${user.guid}" class="weui_media_box weui_media_appmsg">
                        <div class="weui_media_bd">
                            <h4 class="weui_media_title">${user.username}</h4>
                            <p class="weui_media_desc">${user.account}</p>
                            <p class="weui_media_desc">${user.status.label}</p>
                        </div>
                    </a>
                </c:forEach>
            </div>
            <tags:paging formName="search-form" paging="${pagingDTO}"/>
        </div>
    </div>
    <div class="weui_tabbar">
        <a class="weui_tabbar_item" href="add">
            <div class="weui_tabbar_icon">
                <img src="${pageContext.request.contextPath}/css/weui/images/icon_nav_icons.png" alt="">
            </div>
            <p class="weui_tabbar_label">添加</p>
        </a>
        <a class="weui_tabbar_item" href="javascript:void(0)" onclick="WF.user.initSearch()">
            <div class="weui_tabbar_icon">
                <img src="${pageContext.request.contextPath}/css/weui/images/icon_nav_panel.png" alt="">
            </div>
            <p class="weui_tabbar_label">查询</p>
        </a>
        <a class="weui_tabbar_item" href="${pageContext.request.contextPath}/system/index">
            <div class="weui_tabbar_icon">
                <img src="${pageContext.request.contextPath}/css/weui/images/icon_nav_dialog.png" alt="">
            </div>
            <p class="weui_tabbar_label">返回</p>
        </a>
    </div>
</div>
<div class="weui_dialog_confirm" style="display: none;">
    <div class="weui_mask"></div>
    <div class="weui_dialog weui_dialog_form">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">查询用户</strong></div>
        <div class="weui_dialog_bd">
            <form id="search-form" action="list" onsubmit="return false;">
                <div class="weui_cells weui_cells_form">
                    <div class="weui_cell">
                        <div class="weui_cell_hd"><label class="weui_label">关键字</label></div>
                        <div class="weui_cell_bd weui_cell_primary">
                            <input class="weui_input" type="text" name="key" value="${pagingDTO.key}" placeholder="请输入关键字">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="weui_dialog_ft">
            <a href="javascript:void(0);" class="weui_btn_dialog primary" onclick="WF.paging.GO($('#search-form'), 1);">确定</a>
            <a href="javascript:void(0);" class="weui_btn_dialog default" onclick="WF.user.cancelSearch();">取消</a>
        </div>
    </div>
</div>
</body>
</html>