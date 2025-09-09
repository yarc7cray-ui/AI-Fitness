import { z } from 'zod'

export const ProfileCreateSchema = z.object({
  displayName: z.string().min(1).max(100).optional(),
  avatarUrl: z.string().url().optional(),
  goals: z.any().optional(),
  prefs: z.any().optional(),
})

export const ProfileUpdateSchema = ProfileCreateSchema

export const WorkoutSessionSchema = z.object({
  id: z.string().optional(),
  templateId: z.string().optional(),
  date: z.string().optional(),
  exercises: z.any(),
  duration: z.number().int().optional(),
  notes: z.string().optional(),
})

export const MealLogSchema = z.object({
  id: z.string().optional(),
  date: z.string().optional(),
  items: z.any(),
  total: z.any().optional(),
  notes: z.string().optional(),
})

export const CommunityPostSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  content: z.string().min(1),
  metadata: z.any().optional(),
})
