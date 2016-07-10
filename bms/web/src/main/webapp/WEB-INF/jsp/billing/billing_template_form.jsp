<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring-form" uri="http://www.springframework.org/tags/form" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>账单模板</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
    <script type="text/javascript">
        $(function(){
            WF.billing.categories('#type');
        });
    </script>
</head>
<body>
<div class="weui_tab">
    <div class="weui_tab_bd">
        <spring-form:form commandName="billingTemplateDTO" method="post" id="data-form" onsubmit="return false;">
            <div class="weui_cells weui_cells_form">
                <div class="weui_cell weui_cell_select weui_select_after">
                    <div class="weui_cell_hd"><label class="weui_label">分类</label></div>
                    <div class="weui_cell_bd weui_cell_primary">
                        <select id="categoryGuid" class="weui_select" name="categoryGuid" onchange="WF.billing.subcategories(this)" default-value="${billingTemplateDTO.categoryGuid}" targetId="subcategoryGuid">
                            <option value="">请选择</option>
                        </select>
                    </div>
                </div>
                <div class="weui_cell weui_cell_select weui_select_after">
                    <div class="weui_cell_hd"><label class="weui_label">子分类</label></div>
                    <div class="weui_cell_bd weui_cell_primary">
                        <select id="subcategoryGuid" class="weui_select" name="subcategoryGuid" default-value="${billingTemplateDTO.subcategoryGuid}">
                            <option value="">请选择</option>
                        </select>
                    </div>
                </div>
                <div class="weui_cell">
                    <div class="weui_cell_hd"><label class="weui_label">名称</label></div>
                    <div class="weui_cell_bd weui_cell_primary">
                        <spring-form:input cssClass="weui_input" path="name" id="name" placeholder="名称"/>
                    </div>
                </div>
                <div class="weui_cell">
                    <div class="weui_cell_hd"><label class="weui_label">金额</label></div>
                    <div class="weui_cell_bd weui_cell_primary">
                        <spring-form:input cssClass="weui_input" path="amount" id="amount" placeholder="金额"/>
                    </div>
                </div>
            </div>
        </spring-form:form>
    </div>
    <div class="weui_tabbar">
        <a class="weui_tabbar_item" href="javascript:void(0)" onclick="WF.form.ajaxSubmit($('#data-form'))">
            <div class="weui_tabbar_icon">
                <img src="${pageContext.request.contextPath}/css/weui/images/icon_nav_icons.png" alt="">
            </div>
            <p class="weui_tabbar_label">保存</p>
        </a>
        <a class="weui_tabbar_item" href="javascript:void(0)" onclick="WF.page.forward('templates')">
            <div class="weui_tabbar_icon">
                <img src="${pageContext.request.contextPath}/css/weui/images/icon_nav_dialog.png" alt="">
            </div>
            <p class="weui_tabbar_label">返回</p>
        </a>
    </div>
</div>
</body>
</html>