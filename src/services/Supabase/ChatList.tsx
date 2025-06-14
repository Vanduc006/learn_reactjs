import { useEffect, useState } from "react";
import supabase from "./ConnectSupabase";
// import { useUser } from "@clerk/clerk-react";

const ChatList = async (userID : string ,spaceID: string,cursor = null): Promise<any[]> => {
    // const {user} = useUser()
    let query = supabase
        .from('chat')
        .select('*')
        .eq('userid',userID)
        .eq('spaceid', spaceID)
        .order("created_at", { ascending: true})
        // .order("id", { ascending: false })
        .limit(10)
    if ( cursor ) {
        query = query.lt("created_at", cursor);
    }
    const { data, error } = await query

    if (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.message);
        return [];
    }

    return data || [];
}

export default ChatList;

export const sendingChat = async (userID: any,listImages: any,LLMsRespone: any):Promise<any[]> => {

    let query = supabase
        .from('translator')
        .insert({userid : userID,photos_prompt_url :listImages,api_respone_content :LLMsRespone})
    const { data,error } =  await query
    if (error) {
        console.log("new translator error",error)
    }
    return data || [];
  
}

export const isHaveChat = async(spaceID:string):Promise<boolean> => {
    const { count, error } = await supabase
        .from("chat")
        .select("*", { count: "exact", head: true })
        .eq("spaceid",spaceID)
    if (error) {
        console.error("Lỗi khi kiểm tra chat:", error);
        return false;
    }    
    return (count ?? 0) > 0
}

export interface Chat {
    id : string,
    messageid : string,
    userid : string,
    message : string,
    respone : string,
    created_at : string,
    spaceid : string,
    moderation : string,
    status : string,
}

export const useRealtimeChat = (userID : string | undefined,spaceID: string) => {
    const [chatList,setChatList] = useState<Chat[]>([]) 

    useEffect(() => {
        const fetchChatHistory = async() => {
            const {data} = await supabase
                .from('chat')
                .select('*')
                .eq('userid',userID)
                .eq('spaceid', spaceID)
                .order("created_at", { ascending: true })
                // .order("id", { ascending: true })
                // .limit(10)
            if (data) {
                setChatList(data as Chat[])
            }

        }
        fetchChatHistory()
    },[])

    // update realtime
    useEffect(() => {
    const channel = supabase
      .channel('realtime:chat')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'chat',
        },
        (payload) => {
          console.log(payload)
          const { eventType, new: newData, old: oldData } = payload;

          setChatList((prev) => {
            switch (eventType) {
              case 'INSERT':
                return [...prev, newData as Chat];

              case 'UPDATE':
                return prev.map((r) =>
                  r.id === (newData as Chat).id ? (newData as Chat) : r
                );

              case 'DELETE':
                return prev.filter((r) => r.id !== (oldData as Chat).id);

              default:
                return prev;
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return chatList
}

// import { useEffect, useState, useRef } from "react";
// import supabase from "./ConnectSupabase";

// const TranslatorList = ({ user }) => {
//   const [chatSession, setChatSession] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const lastItemRef = useRef(null);
//   let lastCreatedAt = null;

//   useEffect(() => {
//     if (user) {
//       fetchData(user.id);
//     } else {
//       console.log("User not exists");
//     }
//   }, [user]);

//   async function fetchData(clerkUserId) {
//     if (!hasMore) return;
//     setLoading(true);

//     let query = supabase
//       .from("translator")
//       .select("*")
//       .eq("userid", clerkUserId)
//       .order("created_at", { ascending: false })
//       .limit(20);

//     if (lastCreatedAt) {
//       query = query.lt("created_at", lastCreatedAt);
//     }

//     const { data: newData, error } = await query;

//     if (error) {
//       console.error("Lỗi khi lấy dữ liệu:", error.message);
//       setLoading(false);
//       return;
//     }

//     if (newData.length < 20) {
//       setHasMore(false);
//     }

//     if (newData.length > 0) {
//       lastCreatedAt = newData[newData.length - 1].created_at;
//       setChatSession((prev) => [...prev, ...newData]);
//     }

//     setLoading(false);
//   }

//   useEffect(() => {
//     if (!hasMore || !lastItemRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           fetchData(user.id);
//         }
//       },
//       { threshold: 1 }
//     );

//     observer.observe(lastItemRef.current);
//     return () => observer.disconnect();
//   }, [hasMore, user]);

//   return (
//     <div>
//       {chatSession.map((item, index) => (
//         <div key={item.id} ref={index === chatSession.length - 1 ? lastItemRef : null}>
//           <p>{item.translated_text}</p>
//         </div>
//       ))}
//       {loading && <p>Loading more...</p>}
//     </div>
//   );
// };

// export default TranslatorList;
