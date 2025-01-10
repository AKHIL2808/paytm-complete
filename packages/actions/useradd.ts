"use server";

import client from "@repo/database/client";
import { z } from "zod";
import bcrypt from "bcrypt";
// const inputSchema = z.object({
//   email : z.string().email(),
//   name : z.string(),
//   number : z.string().min(10).max(10),
//   password : z.string().min(8)
// })
const emailSchema = z.string().email();
const nameSchema = z.string();
const numberSchema = z.string().min(10).max(10);
const passwordSchema = z.string().min(8);
export default async function useradd(
  email: string,
  name: string,
  number: string,
  password: string
) {
  try {
    // const {success} = inputSchema.safeParse({email,name,number,password})
    const emailSuccess = emailSchema.safeParse(email);
    const nameSuccess = nameSchema.safeParse(name);
    const numberSuccess = numberSchema.safeParse(number);
    const passwordSuccess = passwordSchema.safeParse(password);
    if (emailSuccess && nameSuccess && numberSuccess && passwordSuccess) {
      const salt = 10;

      const hashedPassword = await bcrypt.hash(password, salt);

      await client.user.create({
        data: {
          email,
          name,
          number,
          password: hashedPassword,
        },
      });
    } else {
      console.log("validation failed");
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
