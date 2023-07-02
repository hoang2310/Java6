package poly.store.service;

import java.util.List;

import poly.store.entity.Category;

public interface CategoryService {

	List<Category> findAll();

	Category findById(String id);

	Category create(Category category);

	Category update(Category category);

	void delete(String id);
	
}
