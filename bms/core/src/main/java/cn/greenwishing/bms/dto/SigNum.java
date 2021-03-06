package cn.greenwishing.bms.dto;

import cn.greenwishing.bms.utils.NumberUtils;

import java.math.BigDecimal;

/**
 * @author Frank wu
 * @date 2016/10/30
 */
public class SigNum {

    private BigDecimal value = BigDecimal.ZERO;

    public SigNum() {
    }

    public SigNum(BigDecimal value) {
        this.value = value;
    }

    public BigDecimal getValue() {
        return value;
    }

    public int getSignum() {
        return value == null ? 0 : value.signum();
    }

    @Override
    public String toString() {
        return NumberUtils.toString(value);
    }
}
