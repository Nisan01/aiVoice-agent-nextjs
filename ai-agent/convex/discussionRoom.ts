import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Create a new discussion room
export const CreateNewRoom = mutation({
  args: {
    coachingOptions: v.string(),
    topic: v.string(),
    expertName: v.string(),
    conversation: v.optional(v.any()),
    userId: v.optional(v.id("users"))
  },
  handler: async (ctx, args) => {
    try {
      const result = await ctx.db.insert("DiscussionRoom", {
        coachingOptions: args.coachingOptions,
        topic: args.topic,
        expertName: args.expertName,
        conversation: args.conversation,
        userId: args.userId
      });
      console.log("New Room Created:", result);
      return result;
    } catch (e) {
      console.error("CreateNewRoom failed:", e);
      throw e;
    }
  }
});

// Get a room by ID
export const getDiscussionRoomById = query({
  args: { id: v.id("DiscussionRoom") },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.id);
    if (!result) throw new Error(`DiscussionRoom with id ${args.id} not found`);
    return result;
  }
});

// Update conversation
export const updateConversation = mutation({
  args: { id: v.id("DiscussionRoom"), conversation: v.any() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { conversation: args.conversation });
  }
});

// Update summary
export const updateSummary = mutation({
  args: { id: v.id("DiscussionRoom"), summary: v.any() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { summary: args.summary });
  }
});

// Get all rooms by user
export const getAllDiscussionRoom = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.query("DiscussionRoom")
      .filter(q => q.eq(q.field("userId"), args.userId))
      .order("desc")
      .collect();
  }
});
