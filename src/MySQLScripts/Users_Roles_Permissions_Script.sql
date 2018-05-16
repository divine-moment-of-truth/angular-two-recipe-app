USE recipesdb;

CREATE TABLE IF NOT EXISTS Users (
	user_id INTEGER NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

drop table Users;

CREATE TABLE IF NOT EXISTS roles (
  role_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  role_name VARCHAR(50) NOT NULL,

  PRIMARY KEY (role_id)
);

drop table roles;

CREATE TABLE IF NOT EXISTS permissions (
  perm_id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  perm_desc VARCHAR(50) NOT NULL,

  PRIMARY KEY (perm_id)
);

drop table permissions;

CREATE TABLE IF NOT EXISTS role_perm (
  role_perm_id INTEGER NOT NULL AUTO_INCREMENT,
  role_id INTEGER UNSIGNED NOT NULL,
  perm_id INTEGER UNSIGNED NOT NULL,

  PRIMARY KEY (role_perm_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (perm_id) REFERENCES permissions(perm_id)
);

drop table role_perm;

CREATE TABLE IF NOT EXISTS user_role (
  user_role_id INTEGER NOT NULL AUTO_INCREMENT,
  user_id INTEGER UNSIGNED NOT NULL,
  role_id INTEGER UNSIGNED NOT NULL,

  PRIMARY KEY (user_role_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

drop table user_role;