package poly.store.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import poly.store.entity.Order;
import poly.store.entity.OrderDetail;
import poly.store.service.OrderDetailService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/details")
public class OrderDetailRestController {
	@Autowired
	OrderDetailService orderDetailService;
	
	@GetMapping()
	public List<OrderDetail> getByOrder(@RequestParam Integer id) {
		return orderDetailService.findByOrder(id);
	}
	
	@GetMapping("/report")
	public List<OrderDetail> getReport(){
		return orderDetailService.getReport();
	}
}
