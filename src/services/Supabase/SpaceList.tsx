// import React from 'react'

import supabase from './ConnectSupabase'

const SpaceList = async(clerkUserId: string, cursor = null):Promise<any[]> => {
    let query = supabase
        .from("space")
        .select("*")
        .eq("userid",clerkUserId)
        .order("created_at", {ascending : false})
        .limit(20)
    if (cursor) {
        query = query.lt("created_at", cursor);
    }    
    const { data, error } = await query
    if ( error) {
        console.log("query space")
        return [];
    }
    return data || [];
}
export default SpaceList

// const SpaceNew = async(clerkUserId : string, topic : string,spaceID : number):Promise<any[]> => {
//     const { data, error } = await supabase
//     .from('space')
//     .insert({ spaceID: spaceID, topic : topic, userid: clerkUserId})  
//     .select()
//     if (error) {
//         console.log("Create new space fail")
//         return []
//     }

//     return data || []
// }