CREATE TABLE public.user(
    id SERIAL PRIMARY KEY,
	id_number_type VARCHAR(30) NOT NULL,
	id_document VARCHAR(100) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    cellphone VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    sesion BOOLEAN NOT NULL DEFAULT FALSE,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.admin(
    id  SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.user(id) ON DELETE CASCADE
);

CREATE TABLE public.supplier(
    id  SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.user(id) ON DELETE CASCADE
);


CREATE TABLE public.buyer(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.user(id) ON DELETE CASCADE
);

CREATE TABLE public.brand(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL
);

CREATE TABLE public.product_categories(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE public.products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    product_categories_id INTEGER NOT NULL,
    FOREIGN KEY (product_categories_id) REFERENCES public.product_categories(id) ON DELETE CASCADE,
    brand_id INTEGER NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES public.brand(id) ON DELETE CASCADE,
    supplier_id INTEGER NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES public.supplier(id) ON DELETE CASCADE,   
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.shopping_cars(
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES public.buyer(id) ON DELETE CASCADE,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.product_items(
    id SERIAL PRIMARY KEY,    
    product_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,  
    shopping_car_id INTEGER NOT NULL,
    FOREIGN KEY (shopping_car_id) REFERENCES public.shopping_cars(id) ON DELETE CASCADE,  
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.product_details(
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    size VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.checkout_process(
    id SERIAL PRIMARY KEY,
    shopping_car_id INTEGER NOT NULL,
    FOREIGN KEY (shopping_car_id) REFERENCES public.shopping_cars(id) ON DELETE CASCADE,
    buyer_id INTEGER NOT NULL,
    FOREIGN KEY (shopping_car_id) REFERENCES public.buyer(id) ON DELETE CASCADE,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.shippment_details(
    id SERIAL PRIMARY KEY,
    checkout_process_id INTEGER NOT NULL,
    adress VARCHAR(255) NOT NULL,
    shippment_type VARCHAR(255) NOT NULL,
    FOREIGN KEY (checkout_process_id) REFERENCES public.checkout_process(id) ON DELETE CASCADE,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.cards(
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    number_card VARCHAR(255) NOT NULL,
    expiration_month VARCHAR(255) NOT NULL,
    expiration_year VARCHAR(255) NOT NULL,
    cvv VARCHAR(255) NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES public.buyer(id) ON DELETE CASCADE,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.payment_type(
    id SERIAL PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.payment(
    id SERIAL PRIMARY KEY,
    payment_type_id INTEGER NOT NULL,
    FOREIGN KEY (payment_type_id) REFERENCES public.payment_type(id) ON DELETE CASCADE,
    card_id INTEGER,
    FOREIGN KEY (card_id) REFERENCES public.cards(id) ON DELETE CASCADE,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.order(
    id SERIAL PRIMARY KEY,
    payment_id INTEGER NOT NULL,
    FOREIGN KEY (payment_id) REFERENCES public.payment(id) ON DELETE CASCADE,
    buyer_id INTEGER NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES public.buyer(id) ON DELETE CASCADE,
    checkout_process_id INTEGER NOT NULL,
    FOREIGN KEY (checkout_process_id) REFERENCES public.checkout_process(id) ON DELETE CASCADE,
    shopping_car_id INTEGER NOT NULL,
    FOREIGN KEY (shopping_car_id) REFERENCES public.shopping_cars(id) ON DELETE CASCADE,
    status VARCHAR(255) NOT NULL DEFAULT 'pending',
    price DECIMAL(10,2) NOT NULL,
    created_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


insert into public.brand (id, name, country) values (default, 'Apple', 'Estados Unidos'),(default, 'Samsung', 'Corea del Sur'), (default, 'Adidas', 'Alemania'), (default, 'Microsft', 'Estados Unidos');


insert into public.product_categories (id, name, description) values 
	(default, 'Electrodomesticos', 'Productos que ofrecen soluciones tecnológicas a tu hogar'),
	(default, 'Ropa', 'Prendas de vestir de la mejor calidad'),
	(default, 'Celulares', 'Los mejores celulares para que nunca te desconectes'),
	(default, 'Chaquetas', 'Las nuevas tendencias de moda');



insert into public.products (id, name, price, product_categories_id, brand_id, supplier_id) values 
	(default, 'Iphone 13',3800000, 3, 1, 1),
	(default, 'Iphone 12',3000000, 3, 1, 1),
	(default, 'Iphone 11',2500000, 3, 1, 1),
	(default, 'Iphone X',2000000, 3, 1, 1),
	(default, 'Samsung galaxy a30',800000, 3, 2, 1),
	(default, 'Samsung galaxy flip',5800000, 3, 2, 1),
	(default, 'Samsung galaxy note',1800000, 3, 2, 1),
	(default, 'Samsung galaxy a70s',1400000, 3, 2, 1);



insert into public.product_details (id, product_id, size, color) values 
	(default, 1, 'Pro Max', 'Negro'),
	(default, 2, 'Pro', 'Blanco'),
	(default, 3, 'Standar', 'Rojo'),
	(default, 4, 'Pro Max', 'Negro'),
	(default, 5, 'Grande', 'Rosado'),
	(default, 6, 'Gris', 'Standar'),
	(default, 7, 'Mini', 'Blanco'),
	(default, 8, 'Grande', 'Gris');




/* borrar tablas */

DROP SCHEMA public CASCADE






