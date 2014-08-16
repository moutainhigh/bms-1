package cn.greenwishing.test;

import cn.greenwishing.test.annotation.SyncColumn;
import cn.greenwishing.test.annotation.SyncTable;

import java.lang.reflect.Field;
import java.util.*;

/**
 * @author Wufan
 * @datetime 2014-08-16 10:44
 */
public class TempTable {

    public static final String CREATE_PREFIX = "create temporary table ";
    public static final String DROP_PREFIX = "drop temporary table ";

    private Class<?> clazz;
    private String table;

    private List<Column> columns = new ArrayList<>();

    private String createSql;
    private String dropSql;

    public TempTable(Class<?> clazz) {
        this.clazz = clazz;

        init();
    }

    private void init() {
        if (clazz.isAnnotationPresent(SyncTable.class)) {
            SyncTable table = clazz.getAnnotation(SyncTable.class);
            this.table = table.value();
            Field[] fields = clazz.getDeclaredFields();
            for (Field field : fields) {
                String name = field.getName();
                if (field.isAnnotationPresent(SyncColumn.class)) {
                    SyncColumn syncColumn = field.getAnnotation(SyncColumn.class);
                    Column column = new Column(name, syncColumn.value(), syncColumn.types());
                    this.columns.add(column);
                }
            }
        }
        generateCreateSql();
        generateDropSql();
    }

    private void generateCreateSql() {
        StringBuilder sql = new StringBuilder(CREATE_PREFIX);
        sql.append(this.table);
        sql.append(" (");
        int index = 0;
        for (Column column : columns) {
            if (index ++ != 0) sql.append(", ");
            sql.append(column.getSqlDefine());
        }
        sql.append(")");
        this.createSql =  sql.toString();
    }

    private void generateDropSql() {
        this.dropSql = DROP_PREFIX + this.table;
    }

    public String createSql() {
        return createSql;
    }

    public String dropSql() {
        return dropSql;
    }
}