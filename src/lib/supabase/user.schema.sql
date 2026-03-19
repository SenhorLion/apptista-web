-- User table
create table "user" (
  id text primary key,
  username text not null unique,
  email text not null unique,
  email_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);