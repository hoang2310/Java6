package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.CategoryDAO;
import poly.store.entity.Category;
import poly.store.service.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService{
	@Autowired
	CategoryDAO cateDao;

	@Override
	public List<Category> findAll() {
		return cateDao.findAll();
	}

	@Override
	public Category findById(String id) {
		return cateDao.findById(id).get();
	}

	@Override
	public Category create(Category category) {
		return cateDao.save(category);
	}

	@Override
	public Category update(Category category) {
		return cateDao.save(category);
	}

	@Override
	public void delete(String id) {
		cateDao.deleteById(id);
	}
	
}
