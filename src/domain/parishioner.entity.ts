export interface Parishioner {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  baptized: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateParishionerInput {
  name: string;
  baptized: boolean;
  email?: string;
  phone?: string;
  address?: string;
}

export interface UpdateParishionerInput {
  name?: string;
  baptized?: boolean;
  email?: string;
  phone?: string;
  address?: string;
}
