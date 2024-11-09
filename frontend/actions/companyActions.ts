'use server';

import prisma from '@/lib/db';
import { Entity } from '@/types/entities';

export async function fetchCompanies(): Promise<Entity[]> {
  const companies = await prisma.entity.findMany({
    select: { id: true, name: true, type: true },
  });
  return companies;
}

export async function createCompany(data: Omit<Entity, 'id' | 'type'>): Promise<Entity> {
  const company = await prisma.entity.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      country: data.country,
      registrationNumber: data.registrationNumber,
      isActive: data.isActive ?? true,
    },
  });
  return company;
}
