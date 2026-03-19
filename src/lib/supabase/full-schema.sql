
/*
    A Supabase schema tailored to your use case. 
    We'll start with a single lessons table that tracks everything: lesson type, status, payment info, etc.
    🧠 Why this structure?

    Uses normalized, minimal schema (no need to split into lesson + payment tables at this scale).

    All enums use check() constraints—easy to work with in Supabase.

    Ready to extend later (e.g. add trainer sharing, recurring lessons, etc.)

    notes gives you flexibility for one-off comments like "cancelled due to rain".
*/
enum LessonStatus {
  SCHEDULED,
  COMPLETED,
  CANCELLED
}
enum LessonType {
  ONE_ON_ONE,
  GROUP
}
enum PaymentStatus {
  PAID,
  UNPAID,
  EXEMPT
}
enum PaymentMethod {
  CASH,
  TRANSFER,
  OTHER 
}

create table lesson (
  id text primary key,
  user_id text not null references "user"(id) on delete cascade,
  organization_id text not null references organization(id) on delete cascade,

  -- Core lesson info
  date timestamptz not null,
  duration_minutes int not null default 60,
  type text not null check (type in ('1on1', 'group')),
  status text not null default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled')),
  notes text,

  -- Payment info
  price numeric(10, 2) not null,
  payment_status text not null default 'unpaid' check (payment_status in ('paid', 'unpaid', 'exempt')),
  paid_at timestamptz,
  payment_method text check (payment_method in ('cash', 'transfer', 'other')),

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Indexes for lesson
create index lesson_organization_id_idx on lesson(organization_id);
create index lesson_user_id_idx on lesson(user_id);

-- Indexes for organization
create index organization_user_id_idx on organization(user_id);


-- Organization table
create table organization (
  id text primary key,
  user_id text not null references "user"(id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Membership table (composite primary key)
-- Membership role enum (using check constraint for Supabase compatibility)
-- Note: Use 'MEMBER' or 'ADMIN' as text values
create table membership (
  user_id text not null references "user"(id) on delete cascade,
  organization_id text not null references organization(id) on delete cascade,
  joined_at timestamptz not null default now(),
  is_active boolean not null,
  role text not null default 'MEMBER' check (role in ('MEMBER', 'ADMIN')),
  primary key (user_id, organization_id)
);

-- Indexes for membership
create index membership_user_id_idx on membership(user_id);
create index membership_organization_id_idx on membership(organization_id);
create index membership_user_id_is_active_idx on membership(user_id, is_active); -- Critical for getActiveOrganization performance

-- User table
create table "user" (
  id text primary key,
  username text not null unique,
  email text not null unique,
  email_verified boolean not null default false,
  password_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Password reset token table
create table password_reset_token (
  token_hash text primary key,
  expires_at timestamptz not null,
  user_id text not null references "user"(id) on delete cascade
);

create index password_reset_token_user_id_idx on password_reset_token(user_id);

-- Email verification token table
create table email_verification_token (
  id text primary key,
  code text not null,
  email text not null,
  expires_at timestamptz not null,
  user_id text not null references "user"(id) on delete cascade
);

create index email_verification_token_user_id_idx on email_verification_token(user_id);

-- Session table
create table session (
  id text primary key,
  user_id text not null references "user"(id) on delete cascade,
  expires_at timestamptz not null
);

create index session_user_id_idx on session(user_id);

-- Trigger function for updated_at columns
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger update_user_updated_at before update on "user"
  for each row execute function update_updated_at_column();

create trigger update_organization_updated_at before update on organization
  for each row execute function update_updated_at_column();

create trigger update_lesson_updated_at before update on lesson
  for each row execute function update_updated_at_column();

