package poly.store.service;

import java.util.List;

import poly.store.entity.OrderDetail;

public interface OrderDetailService {
	
	List<OrderDetail> findByOrder(Integer order);

	Integer totalItem(Integer order);

	Double totalPrice(Integer id);

	List<OrderDetail> getReport();
}
