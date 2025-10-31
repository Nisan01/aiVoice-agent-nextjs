import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const createUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
    },

    handler:async(ctx,args)=>{

        const userData=await ctx.db.query('users').filter(q=>q.eq(q.field("email"),args.email)).collect();

        if(userData?.length===0){

            const insertData={
                name:args.name,
                email:args.email,
                credits:5,
                subscriptionID:""
            }

            const newUSer=await ctx.db.insert("users",{
                ...insertData

            })
            return insertData;
            console.log("New User Created:",newUSer);

    }
    return userData[0];
}

})