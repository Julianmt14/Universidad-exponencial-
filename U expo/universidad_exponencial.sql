-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.inscripciones (
  id integer NOT NULL DEFAULT nextval('inscripciones_id_seq'::regclass),
  nombre text NOT NULL,
  edad integer NOT NULL,
  telefono text NOT NULL,
  programa text NOT NULL,
  correo text NOT NULL,
  fecha timestamp with time zone DEFAULT now(),
  CONSTRAINT inscripciones_pkey PRIMARY KEY (id)
);