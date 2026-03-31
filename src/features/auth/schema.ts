import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "名前を入力してください。"),
    email: z.email("正しいメールアドレスを入力してください。"),
    password: z.string().min(8, "パスワードは8文字以上にしてください。"),
    confirmPassword: z.string().min(8, "確認用パスワードを入力してください。"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "確認用パスワードが一致しません。",
  });

export const loginSchema = z.object({
  email: z.email("正しいメールアドレスを入力してください。"),
  password: z.string().min(1, "パスワードを入力してください。"),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
