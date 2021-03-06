package cn.greenwishing.bms.dto.statistics;

import cn.greenwishing.bms.domain.billing.BillingType;

import java.math.BigDecimal;

/**
 * @author Frank wu
 * @date 2015/3/9.
 */
public class BillingStatisticsDTO {

    private BillingType type;
    private String categoryName;
    private String subcategoryName;
    private BigDecimal income;
    private BigDecimal expend;


}
