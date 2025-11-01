import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Check if user already exists
      const existing = await ctx.db
        .query("users")
        .filter(q => q.eq(q.field("email"), args.email))
        .collect();

      if (existing.length > 0) {
        console.log("User already exists:", existing[0]);
        return existing[0];
      }

      // Insert new user
      const insertData = {
        name: args.name,
        email: args.email,
        credits: 5,
        subscriptionID: "",
      };

      const newUserId = await ctx.db.insert("users", insertData);
      console.log("New user created with ID:", newUserId);

      // Return Convex-friendly object
      return { id: newUserId, ...insertData };

    }catch (e) {
  if (e instanceof Error) {
    console.error("createUser failed:", e);
    throw new Error(`createUser error: ${e.message}`);
  } else {
    console.error("createUser failed with non-error value:", e);
    throw new Error("createUser failed with unknown error");
  }
}

  },
});
