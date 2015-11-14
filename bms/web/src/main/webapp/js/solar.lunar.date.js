/**
 * Created by Wufan on 2015-11-13.
 */

(function ($) {

    var LUNAR_DATA = [
        [0, 2, 9, 21936], [6, 1, 30, 9656], [0, 2, 17, 9584], [0, 2, 6, 21168], [5, 1, 26, 43344],
        [0, 2, 13, 59728], [0, 2, 2, 27296], [3, 1, 22, 44368], [0, 2, 10, 43856], [8, 1, 31, 19304],
        [0, 2, 19, 19168], [0, 2, 8, 42352], [5, 1, 29, 21096], [0, 2, 16, 53856], [0, 2, 4, 55632],
        [4, 1, 25, 27304], [0, 2, 13, 22176], [0, 2, 2, 39632], [2, 1, 22, 19176], [0, 2, 10, 19168],
        [6, 1, 30, 42200], [0, 2, 18, 42192], [0, 2, 6, 53840], [5, 1, 26, 54568], [0, 2, 14, 46400],
        [0, 2, 3, 54944], [2, 1, 23, 38608], [0, 2, 11, 38320], [7, 2, 1, 18872], [0, 2, 20, 18800],
        [0, 2, 8, 42160], [5, 1, 28, 45656], [0, 2, 16, 27216], [0, 2, 5, 27968], [4, 1, 24, 44456],
        [0, 2, 13, 11104], [0, 2, 2, 38256], [2, 1, 23, 18808], [0, 2, 10, 18800], [6, 1, 30, 25776],
        [0, 2, 17, 54432], [0, 2, 6, 59984], [5, 1, 26, 27976], [0, 2, 14, 23248], [0, 2, 4, 11104],
        [3, 1, 24, 37744], [0, 2, 11, 37600], [7, 1, 31, 51560], [0, 2, 19, 51536], [0, 2, 8, 54432],
        [6, 1, 27, 55888], [0, 2, 15, 46416], [0, 2, 5, 22176], [4, 1, 25, 43736], [0, 2, 13, 9680],
        [0, 2, 2, 37584], [2, 1, 22, 51544], [0, 2, 10, 43344], [7, 1, 29, 46248], [0, 2, 17, 27808],
        [0, 2, 6, 46416], [5, 1, 27, 21928], [0, 2, 14, 19872], [0, 2, 3, 42416], [3, 1, 24, 21176],
        [0, 2, 12, 21168], [8, 1, 31, 43344], [0, 2, 18, 59728], [0, 2, 8, 27296], [6, 1, 28, 44368],
        [0, 2, 15, 43856], [0, 2, 5, 19296], [4, 1, 25, 42352], [0, 2, 13, 42352], [0, 2, 2, 21088],
        [3, 1, 21, 59696], [0, 2, 9, 55632], [7, 1, 30, 23208], [0, 2, 17, 22176], [0, 2, 6, 38608],
        [5, 1, 27, 19176], [0, 2, 15, 19152], [0, 2, 3, 42192], [4, 1, 23, 53864], [0, 2, 11, 53840],
        [8, 1, 31, 54568], [0, 2, 18, 46400], [0, 2, 7, 46752], [6, 1, 28, 38608], [0, 2, 16, 38320],
        [0, 2, 5, 18864], [4, 1, 25, 42168], [0, 2, 13, 42160], [10, 2, 2, 45656], [0, 2, 20, 27216],
        [0, 2, 9, 27968], [6, 1, 29, 44448], [0, 2, 17, 43872], [0, 2, 6, 38256], [5, 1, 27, 18808],
        [0, 2, 15, 18800], [0, 2, 4, 25776], [3, 1, 23, 27216], [0, 2, 10, 59984], [8, 1, 31, 27432],
        [0, 2, 19, 23232], [0, 2, 7, 43872], [5, 1, 28, 37736], [0, 2, 16, 37600], [0, 2, 5, 51552],
        [4, 1, 24, 54440], [0, 2, 12, 54432], [0, 2, 1, 55888], [2, 1, 22, 23208], [0, 2, 9, 22176],
        [7, 1, 29, 43736], [0, 2, 18, 9680], [0, 2, 7, 37584], [5, 1, 26, 51544], [0, 2, 14, 43344],
        [0, 2, 3, 46240], [4, 1, 23, 46416], [0, 2, 10, 44368], [9, 1, 31, 21928], [0, 2, 19, 19360],
        [0, 2, 8, 42416], [6, 1, 28, 21176], [0, 2, 16, 21168], [0, 2, 5, 43312], [4, 1, 25, 29864],
        [0, 2, 12, 27296], [0, 2, 1, 44368], [2, 1, 22, 19880], [0, 2, 10, 19296], [6, 1, 29, 42352],
        [0, 2, 17, 42208], [0, 2, 6, 53856], [5, 1, 26, 59696], [0, 2, 13, 54576], [0, 2, 3, 23200],
        [3, 1, 23, 27472], [0, 2, 11, 38608], [11, 1, 31, 19176], [0, 2, 19, 19152], [0, 2, 8, 42192],
        [6, 1, 28, 53848], [0, 2, 15, 53840], [0, 2, 4, 54560], [5, 1, 24, 55968], [0, 2, 12, 46496],
        [0, 2, 1, 22224], [2, 1, 22, 19160], [0, 2, 10, 18864], [7, 1, 30, 42168], [0, 2, 17, 42160],
        [0, 2, 6, 43600], [5, 1, 26, 46376], [0, 2, 14, 27936], [0, 2, 2, 44448], [3, 1, 23, 21936],
        [0, 2, 11, 37744], [8, 2, 1, 18808], [0, 2, 19, 18800], [0, 2, 8, 25776], [6, 1, 28, 27216],
        [0, 2, 15, 59984], [0, 2, 4, 27424], [4, 1, 24, 43872], [0, 2, 12, 43744], [0, 2, 2, 37600],
        [3, 1, 21, 51568], [0, 2, 9, 51552], [7, 1, 29, 54440], [0, 2, 17, 54432], [0, 2, 5, 55888],
        [5, 1, 26, 23208], [0, 2, 14, 22176], [0, 2, 3, 42704], [4, 1, 23, 21224], [0, 2, 11, 21200],
        [8, 1, 31, 43352], [0, 2, 19, 43344], [0, 2, 7, 46240], [6, 1, 27, 46416], [0, 2, 15, 44368],
        [0, 2, 5, 21920], [4, 1, 24, 42448], [0, 2, 12, 42416], [0, 2, 2, 21168], [3, 1, 22, 43320],
        [0, 2, 9, 26928], [7, 1, 29, 29336], [0, 2, 17, 27296], [0, 2, 6, 44368], [5, 1, 26, 19880],
        [0, 2, 14, 19296], [0, 2, 3, 42352], [4, 1, 24, 21104], [0, 2, 10, 53856], [8, 1, 30, 59696],
        [0, 2, 18, 54560], [0, 2, 7, 55968], [6, 1, 27, 27472], [0, 2, 15, 22224], [0, 2, 5, 19168],
        [4, 1, 25, 42216], [0, 2, 12, 42192], [0, 2, 1, 53584], [2, 1, 21, 55592], [0, 2, 9, 54560]
    ];
    var CHINESE_DATE_NAMES = "日一二三四五六七八九十";
    var CHINESE_MONTH_NAMES = " 正二三四五六七八九十冬腊";
    var HEAVENLY_STEMS_NAMES = "甲乙丙丁戊己庚辛壬癸";
    var EARTHLY_BRANCHES_NAMES = "子丑寅卯辰巳午未申酉戌亥";
    var ZODIAC_NAMES = "鼠牛虎兔龙蛇马羊猴鸡狗猪";

    var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var MIN_YEAR = 1891, MAX_YEAR = 2100;
    var ONE_DAY = 24 * 3600000;

    var SolarLunarDate = function (elem, options) {

        this.options = $.extend({}, $.fn.solarLunarDate.defaults, options || {});
        this.element = elem;

        this.date = {
            solar: {},
            lunar: {}
        };

        var minDate = this.options.minDate;
        if (typeof minDate == 'string' && WF.validation.isDate(minDate)) {
            minDate = new Date(minDate);
        } else if (typeof minDate == 'object') {
            if (!('getFullYear' in minDate && minDate.getFullYear() >= MIN_YEAR)) {
                console.error('error setting minDate, the year MUST between ' + MIN_YEAR + ' to ' + MAX_YEAR);
                minDate = new Date(MIN_YEAR, 1, 1);
            }
        }
        this.options.minDate = minDate;

        var maxDate = this.options.maxDate;
        if (typeof maxDate == 'string' && WF.validation.isDate(maxDate)) {
            maxDate = new Date(maxDate);
        } else if (typeof maxDate == 'object') {
            if (!('getFullYear' in maxDate && maxDate.getFullYear() <= MAX_YEAR)) {
                maxDate = new Date(MAX_YEAR, 11, 31);
                console.error('error setting maxDate, the year MUST between ' + MIN_YEAR + ' to ' + MAX_YEAR);
            }
        }
        this.options.maxDate = maxDate;

        var dateText = elem.val(), date = new Date();
        if (WF.validation.isDate(dateText)) {
            date = new Date(dateText);
        }
        this.setSolarDate(date);

        this._create();

        return this;
    };

    $.extend(SolarLunarDate.prototype, {
        _create: function() {
            this.element.empty();

            this.yearSelect = $('<select class="solar-lunar-year"></select>')
                .appendTo(this.element);

            this.monthSelect = $('<select class="solar-lunar-month"></select>')
                .appendTo(this.element);

            this.dateSelect = $('<select class="solar-lunar-date"></select>')
                .appendTo(this.element);

            this.renderYearSelect();
            this.renderMonthSelect();
            this.renderDateSelect();

            var _this = this;
            this.yearSelect.bind('change', function(){
                _this.changeYear(this);
            });
            this.monthSelect.bind('change', function(){
                _this.changeMonth(this);
            });
        },
        changeYear: function(elem) {
            var value = parseInt($(elem).val());
            if (this.options.lunar) {
                this.setLunarDate({year: value, month: 1, date: 1});
            } else {
                this.date.solar.setYear(value);
                this.setSolarDate(this.date.solar);
            }
            this.renderMonthSelect();
            this.renderDateSelect();
        },
        changeMonth: function(elem) {
            var value = parseInt($(elem).val());
            if (this.options.lunar) {
                this.setLunarDate({year: this.getYear(), month: value, date: 1});
            } else {
                this.date.solar.setMonth(value);
                this.setSolarDate(this.date.solar);
            }
            this.renderDateSelect();
        },
        renderYearSelect: function() {
            this.yearSelect.empty();
            var year = this.getYear(), min = this.options.minDate.getFullYear(), max = this.options.maxDate.getFullYear();
            for (var i = min, s = max; i <= s; i ++ ) {
                var option = $('<option></option>').attr('value', i).html(this.getYearName(i));
                this.yearSelect.append(option);
            }
            this.yearSelect.val(year);
        },
        renderMonthSelect: function(){
            this.monthSelect.empty();
            var year = this.getYear(), month = this.getMonth();
            for (var i = 1; i <= (this.options.lunar && getLeapMonth(year) != 0 ? 13 : 12); i++) {
                var option = $('<option></option>').attr('value', i).html(this.getMonthName(year, i));
                this.monthSelect.append(option);
            }
            this.monthSelect.val(month);
        },
        renderDateSelect: function() {
            this.dateSelect.empty();
            var year = this.getYear(), month = this.getMonth(), date = this.getDate();
            for (var i = 1, s = this.getDaysInMonth(year, month); i <= s; i++) {
                var option = $('<option></option>').attr('value', i).html(this.getDateName(i));
                this.dateSelect.append(option);
            }
            this.dateSelect.val(date);
        },
        getYearName: function(year) {
            return this.options.lunar ? getLunarYearName(year) : year + '年';
        },
        getMonthName: function(year, month) {
            return this.options.lunar ? getLunarMonthName(year, month) : month + '月';
        },
        getDateName: function(date) {
            return this.options.lunar ? getLunarDateName(date) : date + '日';
        },
        getDaysInMonth: function(){
            var year = this.getYear(), month = this.getMonth();
            return this.options.lunar ? getLunarMonthDays(year, month) : getSolarMonthDays(year, month);
        },
        getYear: function() {
            return this.options.lunar ? this.date.lunar.year : this.date.solar.getFullYear();
        },
        getMonth: function() {
            return this.options.lunar ? this.date.lunar.month : this.date.solar.getMonth();
        },
        getDate: function() {
            return this.options.lunar ? this.date.lunar.date : this.date.solar.getDate();
        },
        setSolarDate: function(date) {
            this.date.solar = date || new Date();
            this.date.lunar = convertSolarToLunar(this.date.solar);
            console.log(getSolarName(this.date.solar) + ' / ' + getLunarName(this.date.lunar));
        },
        setLunarDate: function(dateObj) {
            this.date.lunar = dateObj;
            this.date.solar = convertLunarToSolar(dateObj);
            console.log(getSolarName(this.date.solar) + ' / ' + getLunarName(this.date.lunar));
        }
    });

    /**
     * 将阳历转换为阴历
     * @param dateObj 日期对象
     */
    function convertSolarToLunar(dateObj) {
        var year = dateObj.getFullYear();
        var month = dateObj.getMonth() + 1;
        var date = dateObj.getDate();
        var yearData = LUNAR_DATA[year - MIN_YEAR];
        if (year == MIN_YEAR && month <= 2 && date <= 9) {
            return {year: year, month: 1, date: 1};
        }
        return getLunarByBetween(year, getDaysBetweenSolar(year, month, date, yearData[1], yearData[2]));
    }

    /**
     * 将阴历转换为阳历
     * @param dateObj 自定义日期对象
     *  year  阴历-年
     *  month 阴历-月，闰月处理：例如如果当年闰五月，那么第二个五月就传六月，相当于阴历有13个月，只是有的时候第13个月的天数为0
     *  date  阴历-日
     */
    function convertLunarToSolar(dateObj) {
        var year = dateObj.year, month = dateObj.month, date = dateObj.date;
        var yearData = LUNAR_DATA[year - MIN_YEAR], solar = new Date(year, yearData[1] - 1, yearData[2]), between = getDaysBetweenLunar(year, month, date);
        solar.setDate(solar.getDate() + between);
        return solar;
    }

    /**
     * 判断是否是闰年
     * @param year
     */
    function isLeapYear(year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }

    /**
     * 获取阳历月份的天数
     * @param year  阳历-年
     * @param month 阳历-月
     */
    function getSolarMonthDays(year, month) {
        if (month == 1) return isLeapYear(year) ? 29 : 28;
        return DAYS_IN_MONTH[month - 1];
    }

    /**
     * 获取阴历月份的天数
     * @param year  阴历-年
     * @param month 阴历-月，从一月开始
     */
    function getLunarMonthDays(year, month) {
        var monthData = getLunarMonths(year);
        return monthData[month - 1];
    }

    /**
     * 获取阴历每月的天数的数组
     * @param year
     */
    function getLunarMonths(year) {
        var yearData = LUNAR_DATA[year - MIN_YEAR], leapMonth = yearData[0], bitArray = (yearData[3]).toString(2).split('');
        for (var k = 0, klen = 16 - bitArray.length; k < klen; k++) {
            bitArray.unshift('0');
        }
        bitArray = bitArray.slice(0, (leapMonth == 0 ? 12 : 13));
        for (var i = 0, len = bitArray.length; i < len; i++) {
            bitArray[i] = parseInt(bitArray[i]) + 29;
        }

        return bitArray;
    }

    /**
     * 获取农历每年的天数
     * @param year 农历年份
     */
    function getLunarYearDays(year) {
        var monthArray = getLunarYearMonths(year), len = monthArray.length;
        return (monthArray[len - 1] == 0 ? monthArray[len - 2] : monthArray[len - 1]);
    }

    function getLunarYearMonths(year) {
        var monthData = getLunarMonths(year), res = [], temp = 0, yearData = LUNAR_DATA[year - MIN_YEAR], len = (yearData[0] == 0 ? 12 : 13);
        for (var i = 0; i < len; i++) {
            temp = 0;
            for (var j = 0; j <= i; j++) {
                temp += monthData[j];
            }
            res.push(temp);
        }
        return res;
    }

    /**
     * 获取闰月
     * @param year 阴历年份
     */
    function getLeapMonth(year) {
        var yearData = LUNAR_DATA[year - MIN_YEAR];
        return yearData[0];
    }

    /**
     * 计算阴历日期与正月初一相隔的天数
     * @param year
     * @param month
     * @param date
     */
    function getDaysBetweenLunar(year, month, date) {
        var yearMonth = getLunarMonths(year), days = 0;
        for (var i = 1; i < month; i++) {
            days += yearMonth[i - 1];
        }
        days += date - 1;
        return days;
    }

    /**
     * 计算2个阳历日期之前的天数
     * @param year 阳历年
     * @param cmonth
     * @param cdate
     * @param dmonth 阴历正月对应的阳历月份
     * @param ddate 阴历初一对应的阳历月份
     */
    function getDaysBetweenSolar(year, cmonth, cdate, dmonth, ddate) {
        var a = new Date(year, cmonth - 1, cdate), b = new Date(year, dmonth - 1, ddate);
        return Math.ceil((a - b) / ONE_DAY);
    }

    /**
     * 根据距离正月初一的天数计算阴历日期
     * @param year  阳历年
     * @param between 天数
     */
    function getLunarByBetween(year, between) {
        var yearMonth = [], month = 0, date = 0;
        if (between == 0) {
            month = 1;
            date = 1;
        } else {
            year = between > 0 ? year : (year - 1);
            yearMonth = getLunarYearMonths(year);
            between = between > 0 ? between : (getLunarYearDays(year) + between);
            for (var i = 0; i < 13; i++) {
                if (between == yearMonth[i]) {
                    month = i + 2;
                    date = 1;
                    break;
                } else if (between < yearMonth[i]) {
                    month = i + 1;
                    date = between - (yearMonth[i - 1] == undefined ? 0 : yearMonth[i - 1]) + 1;
                    break;
                }
            }
        }

        return {year: year, month: month, date: date};
    }

    /**
     * 中文阴历月份
     * @param year  阴历年
     * @param month 阴历月
     */
    function getLunarMonthName(year, month) {
        var leapMonth = getLeapMonth(year);
        return ((leapMonth != 0 && month == leapMonth + 1) ? '润' : '') + '' + CHINESE_MONTH_NAMES.charAt((leapMonth != 0 && month > leapMonth + 1) ? month - 1 : month) + '月';
    }

    /**
     * 根据阴历年获取天干
     * @param year
     * @returns {string}
     */
    function getHeavenlyStemsName(year) {
        return HEAVENLY_STEMS_NAMES.charAt((year + 6) % 10);
    }

    /**
     * 根据阴历年获取地支
     * @param year
     * @returns {string}
     */
    function getEarthlyBranchesName(year) {
        return EARTHLY_BRANCHES_NAMES.charAt((year + 8) % 12);
    }

    /**
     * 根据阴历年获取生肖
     * @param year  阴历年
     */
    function getZodiacName(year) {
        return ZODIAC_NAMES.charAt((year + 8) % 12);
    }

    /**
     * 中文阴历日期
     * @param date 阴历日
     */
    function getLunarDateName(date) {
        var d1 = date % 10;
        if (date <= 10) {
            return '初' + CHINESE_DATE_NAMES[date];
        } else if (date > 10 && date < 20) {
            return '十' + CHINESE_DATE_NAMES[d1];
        } else if (date == 20) {
            return "二十";
        } else if (date > 20 && date < 30) {
            return "廿" + CHINESE_DATE_NAMES[d1];
        } else if (date == 30) {
            return "三十";
        }
    }

    function getLunarYearName(year) {
        return getHeavenlyStemsName(year) + '' + getEarthlyBranchesName(year) + '' + getZodiacName(year) + '(' + year + ')年';
    }

    /**
     * 获取干支纪年
     * @param lunar
     */
    function getLunarName(lunar) {
        var year = lunar.year;
        return getHeavenlyStemsName(year) + '' + getEarthlyBranchesName(year) + '' + getZodiacName(year) + '' + getLunarMonthName(year, lunar.month) + '' + getLunarDateName(lunar.date);
    }

    /**
     * 获取阳历
     * @param solar
     */
    function getSolarName(solar) {
        return solar.getFullYear() + '年' + (solar.getMonth() + 1) + '月' + solar.getDate() + '日';
    }

    var old = $.fn.solarLunarDate;
    $.fn.solarLunarDate = function (options) {
        return this.each(function () {
            var _this = $(this), data = _this.data('solarLunarDate');
            if (!data) _this.data('solarLunarDate', (data = new SolarLunarDate(_this, options)))
        });
    };
    $.fn.solarLunarDate.Constructor = SolarLunarDate;
    $.fn.solarLunarDate.noConflict = function () {$.fn.solarLunarDate = old;return this;};
    $.fn.solarLunarDate.defaults = {
        lunar: true,
        minDate: null,
        maxDate: null
    };

})(jQuery);