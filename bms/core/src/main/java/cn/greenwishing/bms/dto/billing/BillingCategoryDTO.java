package cn.greenwishing.bms.dto.billing;

import cn.greenwishing.bms.domain.billing.BillingCategory;
import cn.greenwishing.bms.domain.billing.BillingType;
import cn.greenwishing.bms.dto.AbstractDTO;
import cn.greenwishing.bms.dto.Selectable;
import cn.greenwishing.bms.utils.parser.SqlResultParser;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Frank wu
 * @date 2015/3/7.
 */
public class BillingCategoryDTO extends AbstractDTO implements Selectable {

    private Integer id;
    private String guid;
    private BillingType type;
    private String name;

    public BillingCategoryDTO() {
    }

    public BillingCategoryDTO(BillingCategory category) {
        this.id = category.id();
        this.guid = category.guid();
        this.type = category.type();
        this.name = category.name();
    }

    private BillingCategoryDTO(SqlResultParser category) {
        this.id = category.nextInt();
        this.guid = category.nextString();
        this.type = category.nextEnumWithName(BillingType.class);
        this.name = category.nextString();
    }

    public static List<BillingCategoryDTO> toDTOs(List<SqlResultParser> categories) {
        List<BillingCategoryDTO> categoryDTOs = new ArrayList<>();
        categories.forEach(category -> categoryDTOs.add(new BillingCategoryDTO(category)));
        return categoryDTOs;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public BillingType getType() {
        return type;
    }

    public void setType(BillingType type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public Serializable getValue() {
        return guid;
    }

    @Override
    public String getLabel() {
        return name;
    }
}
