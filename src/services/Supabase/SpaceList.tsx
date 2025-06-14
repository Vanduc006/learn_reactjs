// import React from 'react'

import supabase from './ConnectSupabase'

const SpaceList = async(userID: string, cursor = null):Promise<any[]> => {
    let query = supabase
        .from("space")
        .select("*")
        .eq("userid",userID)
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

export const isOwnerSpace = async(userID:string, spaceID: string) => {
    const { data, error } = await supabase
    .from("space")
    .select("userid")
    .eq("spaceid",spaceID)
    .maybeSingle()

    if ( error ) {
        return false
    }

    return data?.userid ===  userID
}

export const newSpace = async(userID : string | undefined, topic : string, spaceID : string):Promise<any[]> => {
    const { data, error } = await supabase
    .from('space')
    .insert({ spaceid: spaceID, topic : topic, userid: userID, icon : "LibraryBig"})  
    .select()
    if (error) {
        console.log("Create new space fail")
        return []
    }
    return data || []
}