create extension if not exists "uuid-ossp";

create table if not exists users (
	id uuid not null default uuid_generate_v4() primary key,
	user_name varchar(100) not null,
	created_at date not null,
	updated_at date not null
)


delete from users where user_name in ('Chuck', 'John', 'Jack')

insert into users(user_name, created_at, updated_at)
values
('Chuck', CURRENT_DATE, CURRENT_DATE),
('John', CURRENT_DATE, CURRENT_DATE),
('Jack', CURRENT_DATE, CURRENT_DATE)



/**
 * carts:
    id - uuid (Primary key)
    user_id - uuid, not null (It's not Foreign key, because there is no user entity in DB)
    created_at - date, not null
    updated_at - date, not null
 */
create table if not exists carts (
	id uuid not null default uuid_generate_v4() primary key,
	user_id uuid not null,
	created_at date not null,
	updated_at date not null
)

delete from carts

insert into carts(user_id, created_at, updated_at)
select id, CURRENT_DATE, CURRENT_DATE from users where user_name in ('Chuck', 'John', 'Jack')

/**
 * cart_items:
    cart_id - uuid (Foreign key from carts.id)
    product_id - uuid
    count - integer (Number of items in a cart)
 */
create table if not exists cart_items (
	id uuid not null default uuid_generate_v4(),
	cart_id uuid not null,
	product_id uuid not null,
	count integer,
	primary KEY(id),
	constraint fk_carts
		foreign key(cart_id)
			references carts(id)
)

insert into cart_items(cart_id, product_id, count)
select id, '7567ec4b-b10c-48c5-9345-fc73c48a80a3' as product_id, 3
from carts c
where c.user_id in (select id from users where user_name in ('Chuck'))

insert into cart_items(cart_id, product_id, count)
select id, '7567ec4b-b10c-48c5-9445-fc73c48a80a2' as product_id, 2
from carts c
where c.user_id in (select id from users where user_name in ('Chuck'))


insert into cart_items(cart_id, product_id, count)
select id, '7567ec4b-b10c-48c5-9345-fc73c48a80aa' as product_id, 7
from carts c
where c.user_id in (select id from users where user_name in ('John'))


