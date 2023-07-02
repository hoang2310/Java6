package poly.store.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import poly.store.entity.Account;
import poly.store.entity.Authority;

public interface AuthorityDAO extends JpaRepository<Authority, Integer>{
	
	@Query("SELECT DISTINCT a FROM Authority a WHERE a.account IN ?1")
	List<Authority> authoritiesOf(List<Account> accounts);
	
	@Query("Select a From Authority a where a.account.username like ?1")
	List<Authority> getOneByRole(String username);
	
	@Transactional
	@Modifying
	@Query("Delete from Authority where Username = ?1")
	void deleteByUserName(String username);
}
