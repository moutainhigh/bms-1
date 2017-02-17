<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
<head>
    <title>账务概览</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/moment.min.js"></script>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/highcharts/4.0.3/highcharts.js"></script>
    <script type="text/javascript">
        $(function(){
            $.ajax({
                type: 'post',
                url: 'nearest_data',
                data: { size: 12},
                success: function(result){
                    for (var i in result.series)
                        renderHighcharts(result.series[i]);
                }
            });
            onConditionChanged();
        });
        function renderHighcharts(series) {
            var div = $('<div class="col-lg-6"></div>');
            $('.nearest').append(div);
            var data = [];
            data.push(series);
            var categories = [];
            for (var i in series.data) {
                categories.push(series.data[i].name);
            }
            var color = (series.name == '收入' ? 'green' : 'red');
            div.highcharts({
                chart: { height: 220, type: 'areaspline' },
                title: { text: series.name },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '{point.name}{series.name} {point.y}元'
                },
                plotOptions: {
                    areaspline: { borderWidth: 0, lineWidth: 1, lineColor: color, fillOpacity: 0.1, states: { hover: { enabled: false } }, marker: { radius: 2} }
                },
                xAxis: {
                    title: { text: ''},
                    categories: categories,
                    labels: { rotation: -45}
                },
                yAxis: {
                    title: {text: '金额'},
                    min: 0
                },
                series: data,
                legend: { enabled: false, verticalAlign: 'top' },
                credits: { enabled: false}
            });
        }

        function onConditionChanged(opts) {
            var $type = $('#type'), $group = $('#group');
            var today = moment(), from = today, to, offset = 0, mode = 'other';
            var type = $type.val(), group = $group.val();
            if (opts) {
                from = moment(opts.from);
                to = moment(opts.to);
            } else {
                var $mode = $('#mode');
                mode = $mode.val();
                offset = parseInt($mode.attr('data-offset')) || 0;
                if (mode == 'days') {
                    from = today.clone().add(offset, 'days');
                    to = from.clone();
                } else if (mode == 'weeks') {
                    from = today.clone().add(offset, 'weeks').startOf('week');
                    to = from.clone().endOf('week');
                } else if (mode == 'months') {
                    from = today.clone().add(offset, 'months').startOf('month');
                    to = from.clone().endOf('month');
                } else if (mode == 'years') {
                    from = today.clone().add(offset, 'years').startOf('year');
                    to = from.clone().endOf('year');
                }
            }
            if (to.isAfter(today)) to = today.clone();
            return loadBillingStatistics(from, to, type, group, mode);
        }

        function loadBillingStatistics(from, to, type, group, mode) {
            var dateRangeTitle = dateRangeToString(mode, from, to);
            WF.ajax.req({
                url: 'data',
                data: {type: type, group: group, from: from.format('YYYY-MM-DD'), to: to.format('YYYY-MM-DD')},
                success: function (result) {
                    renderCharts(dateRangeTitle, result.data);
                }
            });
            return dateRangeTitle;
        }

        function dateRangeToString(mode, from, to) {
            var today = moment(), formattedDate = {}, _MAP = {
                days: {
                    type: 'day',
                    prefix: [{offset: 0, text: '今天'}, {offset: -1, text: '昨天'}, {offset: -2, text: '前天'}]
                },
                weeks: {
                    type: 'week',
                    prefix: [{offset: 0, text: '本周'}, {offset: -1, text: '上周'}]
                },
                months: {
                    type: 'month',
                    prefix: [{offset: 0, text: '本月'}, {offset: -1, text: '上月'}]
                },
                years: {
                    type: 'year',
                    prefix: [{offset: 0, text: '今年'}, {offset: -1, text: '去年'}, {offset: -2, text: '前年'}]
                }
            };
            if (mode == 'days') {
                formattedDate.from = 'YYYY年M月D日星期' + ('日_一_二_三_四_五_六'.split('_')[from.day()]);
            } else if (mode == 'weeks') {
                formattedDate.from = 'YYYY年M月D日';
                if (from.isSame(to, 'month')) {
                    formattedDate.to = '至D日';
                } else {
                    formattedDate.to = '至M月D日';
                }
            } else if (mode == 'months') {
                formattedDate.from = 'YYYY年M月1日';
                formattedDate.to = '至D日';
            } else if (mode == 'years') {
                formattedDate.from = 'YYYY年1月1日';
                if (from.isSame(to, 'month')) {
                    formattedDate.to = '至D日';
                } else {
                    formattedDate.to = '至M月D日';
                }
            } else {
                formattedDate.from = 'YYYY年M月D日';
                if (from.isSame(to, 'year')) {
                    if (from.isSame(to, 'month')) {
                        formattedDate.to = 'D日';
                    } else {
                        formattedDate.to = 'M月D日';
                    }
                } else {
                    formattedDate.to = 'YYYY年M月D日';
                }
                return from.format(formattedDate.from) + '至' + to.format(formattedDate.to);
            }
            var map = _MAP[mode];
            for (var i in map.prefix) {
                var prefix = map.prefix[i];
                if (from.clone().subtract(prefix.offset, mode).isSame(today, map.type)) {
                    formattedDate.from = prefix.text + ' - ' + formattedDate.from;
                }
            }
            return from.format(formattedDate.from) + (formattedDate.to ? to.format(formattedDate.to) : '');
        }

        function addModeOffset(val) {
            var $mode = $('#mode');
            var offset = parseInt($mode.attr('data-offset')) || 0;
            var newVar = (offset + val);
            if (newVar > 0) newVar = 0;
            $mode.attr({'data-offset': newVar});
            onConditionChanged();
        }

        function renderCharts(title, records) {
            var group = $('#group').find('option:selected').val();
            var data = [];
            var total = 0;
            for (var i in records) {
                var record = records[i];
                total += record.amount;
            }
            for (var i in records) {
                var record = records[i];
                data.push({name: record[group], y: (record.amount / total * 100), amount: record.amount});
            }
            $('#billing-statistics').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: title
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br/>金额: <b>{point.amount} 元</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %<br/>金额: <b>{point.amount} 元</b>'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: '占比',
                    data: data
                }],
                credits: {enabled: false}
            });
        }
    </script>
</head>
<body>
<div class="accounts">
    <div class="col-6">
        <div class="account">
            <p>账户总余额</p>
            <h3 class="signum signum_${asset.asset.signum}">${asset.asset}</h3>
        </div>
    </div>
    <div class="col-6">
        <div class="account">
            <p>债权</p>
            <h3 class="signum signum_${asset.credit.signum}">${asset.credit}</h3>
        </div>
    </div>
    <div class="col-6">
        <div class="account">
            <p>债务</p>
            <h3 class="signum signum_${asset.debt.signum}">${asset.debt}</h3>
        </div>
    </div>
    <div class="col-6">
        <div class="account">
            <p>净资产</p>
            <h3 class="signum signum_${asset.netAsset.signum}">${asset.netAsset}</h3>
        </div>
    </div>
</div>
<div>
    <a href="accounts">查看账户余额</a>
</div>
<div class="nearest"></div>
<div>
    <div class="form-inline pull-left">
        <div class="form-group">
            <label class="control-label">类型</label>
            <select class="form-control" id="type" onchange="onConditionChanged()">
                <c:forEach items="${types}" var="type">
                    <option value="${type.value}">${type.label}</option>
                </c:forEach>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">分类</label>
            <select class="form-control" id="group" onchange="onConditionChanged()">
                <option value="category">分类</option>
                <option value="subcategory" selected>子分类</option>
            </select>
        </div>
        <div class="form-group">
            <label class="control-label">范围</label>
            <select class="form-control" id="mode" onchange="$(this).attr({'data-offset':0});onConditionChanged()" data-offset="0">
                <option value="days">按天</option>
                <option value="weeks">按周</option>
                <option value="months" selected>按月</option>
                <option value="years">按年</option>
            </select>
        </div>
    </div>
    <div class="btn-group pull-right">
        <a class="btn btn-default" href="javascript:void(0)" onclick="addModeOffset(-1)">向前</a>
        <a class="btn btn-default" href="javascript:void(0)" onclick="addModeOffset(1)">向后</a>
    </div>
</div>
<div id="billing-statistics"></div>
</body>
</html>