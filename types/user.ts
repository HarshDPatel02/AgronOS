/**
 * @file user.ts
 * @path /types/user.ts
 * @project AgronOS - Precision Agriculture Platform
 * @description User identity, authentication context, and enterprise subscription types.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  role: "Producer" | "Agronomist" | "Admin";
  farmName: string;
  plan: "Free" | "Enterprise";
}