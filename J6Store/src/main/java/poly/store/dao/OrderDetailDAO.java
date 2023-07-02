package poly.store.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import poly.store.entity.OrderDetail;

public interface OrderDetailDAO extends JpaRepository<OrderDetail, Integer>{
	@Query("SELECT od FROM OrderDetail od WHERE od.order.id = ?1")
	List<OrderDetail> findByOrder(Integer order);

	@Query("SELECT SUM(od.quantity) FROM OrderDetail od WHERE od.order.id = ?1")
	Integer totalItem(Integer order);
	
	@Query("SELECT SUM(od.price * od.quantity) FROM OrderDetail od WHERE od.order.id = ?1")
	Double totalPrice(Integer id);

	@Query(value = "SELECT o.Product_id, p.name, SUM(o.Quantity), SUM(o.price) FROM Order_details o "
			+ "INNER JOIN Products p "
			+ "ON o.Product_id = p.Id "
			+ "GROUP BY Product_id, p.Name, o.Quantity", nativeQuery = true)
	List<OrderDetail> getReport();
}
