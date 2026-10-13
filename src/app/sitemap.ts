import { MetadataRoute } from 'next';
import { getHorses } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://horsecounty.com';
  const horses = await getHorses({ status: 'approved' });

  const staticRoutes = [
    '',
    '/horses',
    '/buy',
    '/sell',
    '/farmhouse',
    '/book',
    '/experiences',
    '/gallery',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/auth/login',
    '/auth/register'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8
  }));

  const horseRoutes = horses.map((horse) => ({
    url: `${baseUrl}/horses/${horse.id}`,
    lastModified: new Date(horse.updatedAt || horse.createdAt || new Date()),
    changeFrequency: 'daily' as const,
    priority: 0.9
  }));

  return [...staticRoutes, ...horseRoutes];
}
