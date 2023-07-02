package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.AccountDAO;
import poly.store.dao.AuthorityDAO;
import poly.store.entity.Account;
import poly.store.entity.Authority;
import poly.store.service.AuthorityService;

@Service
public class AuthorityServiceImpl implements AuthorityService{

	@Autowired
	AuthorityDAO auDAO;
	
	@Autowired
	AccountDAO acDAO;
	
	public List<Authority> findAll(){
		return auDAO.findAll();
	}
	
	public Authority create(Authority auth) {
		return auDAO.save(auth);
	}
	
	public void delete(Integer id) {
		auDAO.deleteById(id);
	}
	
	public List<Authority> findAuthoritiesOfAdministrators(){
		List<Account> accounts = acDAO.getAdministrators();
		return auDAO.authoritiesOf(accounts);
	}

	@Override
	public List<Authority> getOneByRole(String username) {
		return auDAO.getOneByRole(username);
	}

	@Override
	public void deleteByUsername(String username) {
		auDAO.deleteByUserName(username);
	}
}
