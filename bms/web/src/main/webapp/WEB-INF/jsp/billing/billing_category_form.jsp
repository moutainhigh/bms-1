<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="spring-form" uri="http://www.springframework.org/tags/form" %>
<html>
<head>
    <title>账单分类</title>
</head>
<body>
    <spring-form:form modelAttribute="billingCategoryDTO" method="post" id="data-form" onsubmit="return false;">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_select weui-cell_select-after">
                <div class="weui-cell__hd">
                    <label class="weui-label">类型</label>
                </div>
                <div class="weui-cell__bd">
                    <spring-form:select cssClass="weui-select" id="type" path="type" items="${types}" itemValue="value" itemLabel="label"/>
                </div>
            </div>
            <div class="weui-cell">
                <div class="weui-cell__hd">
                    <label class="weui-label">名称</label>
                </div>
                <div class="weui-cell__bd">
                    <spring-form:input cssClass="weui-input" path="name" id="name" placeholder="名称"/>
                </div>
            </div>
        </div>
        <div class="weui-btn-area">
            <a class="weui-btn weui-btn_primary" href="javascript:void(0)" onclick="WF.form.ajaxSubmit($('#data-form'))">保存</a>
            <c:if test="${not empty billingCategoryDTO.guid}">
                <a class="weui-btn weui-btn_default" href="subcategories?categoryGuid=${billingCategoryDTO.guid}">子分类</a>
            </c:if>
        </div>
    </spring-form:form>
</body>
</html>