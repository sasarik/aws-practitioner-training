create extension if not exists "uuid-ossp";


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

create table if not exists users (
	id uuid not null default uuid_generate_v4() primary key,
	name varchar(100) not null,
	email varchar(120),
	password varchar(15),
	created_at date not null,
	updated_at date not null
)


insert into users(name, created_at, updated_at)
values
('Chuck', CURRENT_DATE, CURRENT_DATE),
('John', CURRENT_DATE, CURRENT_DATE),
('Jack', CURRENT_DATE, CURRENT_DATE)

drop table users

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

CREATE TYPE CartStatus AS ENUM ('OPEN', 'ORDERED');

/**
 * carts:
    id - uuid (Primary key)
    user_id - uuid, not null (It's not Foreign key, because there is no user entity in DB)
    created_at - date, not null
    updated_at - date, not null
 */
create table if not exists carts (
	id uuid not null default uuid_generate_v4(),
	user_id uuid not null,
	status CartStatus not null default 'OPEN',
	created_at date not null,
	updated_at date not null,
	primary KEY(id),
	constraint fk_users
		foreign key(user_id)
			references users(id)
)

insert into carts(user_id, created_at, updated_at)
select id, CURRENT_DATE, CURRENT_DATE from users where name in ('Chuck', 'John', 'Jack')


delete from carts

drop table carts

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */



/**
 * cart_items:
    cart_id - uuid (Foreign key from carts.id)
    product_id - uuid
    count - integer (Number of items in a cart)
 */
create table if not exists cart_items (
	id uuid not null default uuid_generate_v4(),
	cart_id uuid not null,
	product_id uuid unique not null,
	count integer,
	primary KEY(id),
	constraint fk_carts
		foreign key(cart_id)
			references carts(id)
)


SELECT i.id, i.cart_id, i.product_id, i.count
            FROM cart_items i
                WHERE i.cart_id = '83c18bb6-0bd5-41cd-872b-70d1a495f595'

delete from cart_items

drop table cart_items

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

CREATE TYPE OrderStatus AS ENUM ('OPEN', 'APPROVED', 'CONFIRMED','SENT','COMPLETED','CANCELLED');


/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

SELECT c.id, c.user_id
FROM carts c
WHERE
c.user_id ="024d607c-19bb-4b33-bd5b-dd356029b496"

INSERT INTO CARTS(user_id,created_at,updated_at)
      VALUES ('',CURRENT_DATE,CURRENT_DATE)
      RETURNING id

