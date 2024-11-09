'use server';

import { ENTERPRISE_COMPANY_ID } from '@/config/constants';
import prisma from '@/lib/db';
import { Entity } from '@/types/entities';

export async function fetchCompany(): Promise<Entity | null> {
  const company = await prisma.entity.findUnique({
    where: { id: ENTERPRISE_COMPANY_ID }, // Assuming the company has an ID of 1
  });
  return company;
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
