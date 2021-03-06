package cn.greenwishing.bms.persistence.hibernate;

import cn.greenwishing.bms.domain.Domain;
import cn.greenwishing.bms.domain.Repository;
import org.hibernate.query.Query;
import org.springframework.dao.support.DaoSupport;
import org.springframework.orm.hibernate5.HibernateCallback;
import org.springframework.orm.hibernate5.HibernateTemplate;

import javax.annotation.Resource;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * @author Frank wu
 */
public class AbstractRepositoryHibernate extends DaoSupport implements Repository {

    @Resource
    private HibernateTemplate hibernateTemplate;

    @Override
    public void save(Domain domain) {
        getHibernateTemplate().save(domain);
    }

    @Override
    public void saveOrUpdate(Domain domain) {
        getHibernateTemplate().saveOrUpdate(domain);
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T extends Domain> T findByGuid(Class<T> clazz, String guid) {
        List<T> list = (List<T>) getHibernateTemplate().find("select c from " + clazz.getSimpleName() + " as c where c.guid=?", guid);
        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public <T extends Domain> List<T> findAll(Class<T> clazz) {
        return getHibernateTemplate().loadAll(clazz);
    }

    @Override
    @SuppressWarnings("unchecked")
    public List<Object> find(String hql, Object... params) {
        return (List<Object>) getHibernateTemplate().find(hql, params);
    }

    @Override
    public Object singleResult(final String hql, final Object... params) {
        return getHibernateTemplate().execute(session -> {
            Query query = session.createQuery(hql);
            for (int i = query.getParameterMetadata().isOrdinalParametersZeroBased() ? 0 : 1; i < params.length; i++) {
                query = query.setParameter(i, params[i]);
            }
            return query.uniqueResult();
        });
    }

    @Override
    @SuppressWarnings("unchecked")
    public void update(final String hql, final Object... params) {
        getHibernateTemplate().execute((HibernateCallback) session -> {
            Query query = session.createQuery(hql);
            for (int i = query.getParameterMetadata().isOrdinalParametersZeroBased() ? 0 : 1; i < params.length; i++) {
                query = query.setParameter(i, params[i]);
            }
            return query.executeUpdate();
        });

    }

    @Override
    public void remove(Domain domain) {
        getHibernateTemplate().delete(domain);
    }

    @Override
    public <T extends Domain> void saveAll(Collection<T> domains) {
        domains.forEach(domain -> getHibernateTemplate().saveOrUpdate(domain));
    }

    @Override
    public void removeAll(Collection list) {
        getHibernateTemplate().deleteAll(list);
    }

    /**
     * 通过一系列的id去查询对应的一系列Domain
     *
     * @param clazz 查询的Domain类
     * @param guids guid集合
     * @param <T>   对应的类
     * @return 一系列Domain
     */
    @Override
    @SuppressWarnings("unchecked")
    public <T extends Domain> List<T> findByGuids(Class<T> clazz, final List<String> guids) {
        if (guids == null || guids.isEmpty()) {
            return Collections.emptyList();
        }
        final String hql = "from " + clazz.getName() + " t  where t.guid  in (:guids)";
        return getHibernateTemplate().execute(session -> {
            Query query = session.createQuery(hql).setParameterList("guids", guids);
            return query.list();
        });
    }


    @Override
    public <T extends Domain> void changeStatus(Class<T> clazz, final List<String> guids, final Enum status) {
        if (guids.isEmpty()) {
            return;
        }
        final String hql = "update " + clazz.getName() + " t set t.status=:status where t.guid in (:guids)";
        getHibernateTemplate().execute((HibernateCallback<Object>) session -> {
            Query query = session.createQuery(hql);
            query.setParameter("status", status);
            query.setParameterList("guids", guids);
            return query.executeUpdate();
        });
    }

    @Override
    public <T extends Domain> void remove(Class<T> clazz, final List<String> guids) {
        if (guids.isEmpty()) {
            return;
        }
        final String hql = "delete from " + clazz.getName() + " t where t.guid in (:guids)";
        getHibernateTemplate().execute((HibernateCallback<Object>) session -> {
            Query query = session.createQuery(hql);
            query.setParameterList("guids", guids);
            return query.executeUpdate();
        });
    }

    @Override
    public <T extends Domain> void remove(Class<T> clazz, String guid) {
        getHibernateTemplate().bulkUpdate("delete from " + clazz.getSimpleName() + " c where c.guid=?", guid);
    }

    public List find(final String hql, final Integer startIndex, final Integer pageCount, final Object... args) {
        return getHibernateTemplate().execute(session -> {
            Query query = session.createQuery(hql);
            for (int i = query.getParameterMetadata().isOrdinalParametersZeroBased() ? 0 : 1; i < args.length; i++) {
                query.setParameter(i, args[i]);
            }
            return query.setFirstResult(startIndex)
                    .setMaxResults(pageCount)
                    .list();
        });
    }

    public HibernateTemplate getHibernateTemplate() {
        return hibernateTemplate;
    }

    @Override
    protected void checkDaoConfig() throws IllegalArgumentException {
        if (this.hibernateTemplate == null) {
            throw new IllegalArgumentException("\'sessionFactory\' or \'hibernateTemplate\' is required");
        }
    }

}
