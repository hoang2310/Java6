package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.OrderDetailDAO;
import poly.store.entity.OrderDetail;
import poly.store.service.OrderDetailService;

@Service
public class OrderDetailServiceImpl implements OrderDetailService{
	
	@Autowired
	private OrderDetailDAO dao;

	@Override
	public List<OrderDetail> findByOrder(Integer order) {
		return dao.findByOrder(order);
	}

	@Override
	public Integer totalItem(Integer order) {
		return dao.totalItem(order);
	}

	@Override
	public Double totalPrice(Integer id) {
		return dao.totalPrice(id);
	}

	@Override
	public List<OrderDetail> getReport() {
		return dao.getReport();
	}

}
