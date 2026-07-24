import { z } from "zod";

export const OrderPlaqueSchema = z.object({
  businessName: z.string().min(1),
  contactName: z.string().min(1),
  phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  commune: z.string().min(1),
  deliveryAddress: z.string().min(1),
  callTime: z.string().optional(),
  backupName: z.string().min(1),
  backupPhone: z.string().min(6),
  notes: z.string().optional(),
});

export type OrderPlaqueSchemaType = z.infer<typeof OrderPlaqueSchema>;
