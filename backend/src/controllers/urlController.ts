import { Request, Response } from 'express';
import { prisma } from '../prismaClient';
import { nanoid } from 'nanoid';

function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export const createUrl = async (req: Request, res: Response) => {
  const { longUrl } = req.body;
  if (!longUrl || !isValidUrl(longUrl)) return res.status(400).json({ error: 'URL inválida' });

  const slug = nanoid(6);

  try {
    const url = await prisma.url.create({ data: { longUrl, slug } });
    return res.json(url);
  } catch (err: any) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'Slug duplicado, tente novamente' });
    return res.status(500).json({ error: 'Erro interno', details: err });
  }
};

export const getAllUrls = async (req: Request, res: Response) => {
  try {
    const urls = await prisma.url.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar URLs' });
  }
};

export const redirectUrl = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const url = await prisma.url.findUnique({ where: { slug } });
    if (!url) return res.status(404).json({ error: 'URL não encontrada' });

    await prisma.url.update({ where: { slug }, data: { clicks: url.clicks + 1 } });
    res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao redirecionar URL' });
  }
};
