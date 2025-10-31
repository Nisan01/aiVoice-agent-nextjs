

import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";


export const CreateNewRoom=mutation({
    args:{
       coachingOptions:v.string(),
    topic:v.string(),
    expertName:v.string(),
    conversation:v.optional(v.any()),
    userId:v.id("users")
    },

    handler:async(ctx,args)=>{
const result=await ctx.db.insert("DiscussionRoom",{
    coachingOptions:args.coachingOptions,
    topic:args.topic,
    expertName:args.expertName,
    userId:args.userId
 

});
return result;
}

})


export const getDiscussionRoomById=query({
    args:{
        id:v.id("DiscussionRoom")
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.get(args.id);
        return result;
    }
})



export const updateConversation=mutation({

    args:{
        id:v.id("DiscussionRoom"),
        conversation:v.any()
    },
    handler:async(ctx,args)=>{
        await ctx.db.patch(args.id,{
            conversation:args.conversation
        })
    }

})

export const updateSummary=mutation({

    args:{
        id:v.id("DiscussionRoom"),
        summary:v.any()
    },
    handler:async(ctx,args)=>{
        await ctx.db.patch(args.id,{
            summary:args.summary
        })
    }

})


export const getAllDiscussionRoom=query({
    args:{
        userId:v.id("users")
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.query("DiscussionRoom")
        .filter(q=>q.eq(q.field("userId"),args.userId))
        .order('desc')
        .collect();
        return result;
    }
})
