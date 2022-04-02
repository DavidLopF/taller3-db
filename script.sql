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

//borrar tablas
DROP TABLE public.admin;
DROP TABLE public.supplier;
DROP TABLE public.buyer;
DROP TABLE public.user;