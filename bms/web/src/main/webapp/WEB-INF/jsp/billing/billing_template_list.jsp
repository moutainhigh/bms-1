<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>账单模板</title>
    <meta http-equiv="content-type" content="text/html;charset=utf-8">
</head>
<body>
<blockquote>
    <a class="btn btn-success" href="add_template">添加</a>
    <a class="btn btn-default" href="list">返回</a>
</blockquote>
<table class="table table-hover">
    <thead>
    <tr>
        <th>名称</th>
        <th>类型</th>
        <th>分类</th>
        <th>金额</th>
        <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach items="${templates}" var="template">
        <tr>
            <td>${template.name}</td>
            <td>${template.type.label}</td>
            <td>${template.categoryName} ${template.subcategoryName}</td>
            <td><span class="price">${template.amount}</span></td>
            <td><a href="edit_template?guid=${template.guid}">编辑</a></td>
        </tr>
    </c:forEach>
    </tbody>
</table>
</body>
</html>