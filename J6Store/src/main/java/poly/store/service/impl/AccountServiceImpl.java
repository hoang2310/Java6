package poly.store.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import poly.store.dao.AccountDAO;
import poly.store.entity.Account;
import poly.store.service.AccountService;

@Service
public class AccountServiceImpl implements AccountService{
	@Autowired
	AccountDAO accDAO;

	@Override
	public Account findById(String username) {
		return accDAO.findById(username).get();
	}

	@Override
	public List<Account> findAll() {
		return accDAO.findAll();
	}

	@Override
	public List<Account> getAdministrators() {
		return accDAO.getAdministrators();
	}

	@Override
	public Account create(Account account) {
		return accDAO.save(account);
	}

	@Override
	public Account update(Account account) {
		return accDAO.save(account);
	}

}
