import { useSignIn,useSignUp } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
const MindAuth = () => {
    const { signIn } = useSignIn();
    const { signUp } = useSignUp()
    const handleSocialSignIn = async (provider: "oauth_google" | "oauth_github" | "oauth_facebook" | "oauth_apple") => {
      try {
        await signIn?.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: "/", // Tùy route bạn xử lý
          redirectUrlComplete: "/", // Sau đăng nhập thành công
        });
      } catch (err) {
        console.error("Social sign-in error:", err);
      }
    };

    const handleSocialSignUp = async (provider: "oauth_google" | "oauth_github" | "oauth_facebook" | "oauth_apple") => {
      try {
        await signUp?.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: "/", // Tùy route bạn xử lý
          redirectUrlComplete: "/", // Sau đăng nhập thành công
        });
      } catch (err) {
        console.error("Social sign-up error:", err);
      }
    };

    const [typeAuth,setTypeAuth] = useState<string>("Sign In")

    // const handleSocialSignUp = async (provider: "oauth_google" | "oauth_github" | "oauth_facebook" | "oauth_apple") => {
    //   try {
    //     await signIn?.authenticateWithRedirect({
    //       strategy: provider,
    //       redirectUrl: "/", // Tùy route bạn xử lý
    //       redirectUrlComplete: "/", // Sau đăng nhập thành công
    //     });
    //   } catch (err) {
    //     console.error("Social sign-in error:", err);
    //   }
    // };

  return (
    <div className="min-h-screen flex flex-col">
        <main className="flex-1 flex items-center justify-center p-4 bg-gray-50 text-black">
            <div className="w-full max-w-md ">
                <a href='/' className='font-semibold text-2xl flex items-center justify-content-center border-b cursor-pointer'>
                    <img src="/favicon.svg" className="w-6 h-6 rounded-md mr-2"/>
                    MIND
                </a>
                <Card className='p-5 w-[100%] mt-5'>
                    <CardHeader className='space-y-1'>
                        
                        <CardTitle className='text-2xl font-semibold flex'>
                          {typeAuth}

                        </CardTitle>
                        <CardDescription>{typeAuth == "Sign In" ? 
                          <>
                            Welcome back, have a good day !
                          </>
                          : 
                          <>
                            Click one of auth provider below to use MIND
                          </>
                        
                        }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className=''>
                        { typeAuth == "Sign In" ?
                          <>
                            <div className="">
                              <button onClick={() => handleSocialSignIn("oauth_google")} className="mt-2 w-full pl-5 pr-5 pt-2 pb-2 hover:bg-gray-200 rounded-xl hover:bg-gray-300 transition-transform  hover:scale-[1.02] flex items-center justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className='w-5 h-5 mr-2'><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"/><path fill="#e33629" d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"/><path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"/><path fill="#587dbd" d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"/><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"/></svg>
                              Continue with Google
                              </button>
                              <button onClick={() => handleSocialSignIn("oauth_apple")} className="mt-2 w-full pl-5 pr-5 pt-2 pb-2 hover:bg-gray-200 rounded-xl hover:bg-gray-300 transition-transform  hover:scale-[1.02] flex items-center justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className='w-5 h-5 mr-2'><path d="M97.905 67.885c.174 18.8 16.494 25.057 16.674 25.137-.138.44-2.607 8.916-8.597 17.669-5.178 7.568-10.553 15.108-19.018 15.266-8.318.152-10.993-4.934-20.504-4.934-9.508 0-12.479 4.776-20.354 5.086-8.172.31-14.395-8.185-19.616-15.724C15.822 94.961 7.669 66.8 18.616 47.791c5.438-9.44 15.158-15.417 25.707-15.571 8.024-.153 15.598 5.398 20.503 5.398 4.902 0 14.106-6.676 23.782-5.696 4.051.169 15.421 1.636 22.722 12.324-.587.365-13.566 7.921-13.425 23.639M82.272 21.719c4.338-5.251 7.258-12.563 6.462-19.836-6.254.251-13.816 4.167-18.301 9.416-4.02 4.647-7.54 12.087-6.591 19.216 6.971.54 14.091-3.542 18.43-8.796"/></svg>
                              Continue with Apple
                              </button>
                              <button onClick={() => handleSocialSignIn("oauth_facebook")} className="mt-2 w-full pl-5 pr-5 pt-2 pb-2 hover:bg-gray-200 rounded-xl hover:bg-gray-300 transition-transform  hover:scale-[1.02] flex items-center justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className='w-5 h-5 mr-2'><rect fill="#3d5a98" x="4.83" y="4.83" width="118.35" height="118.35" rx="6.53" ry="6.53"/><path fill="#fff" d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0091 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"/></svg>
                              Continue with Facebook
                              </button>
                            </div>

                            <div className='flex items-center justify-content-center mt-5'>
                              You don't have a account ?
                              <div className='font-bold ml-2 px-2 bg-gray-200 rounded-md cursor-pointer' 
                              onClick={() => {
                                setTypeAuth("Sign Up")
                              }}>SignUp</div>
                            </div>
                          </> 
                          
                          : 

                          <>
                            <div className="">
                              <button onClick={() => handleSocialSignUp("oauth_google")} className="mt-2 w-full pl-5 pr-5 pt-2 pb-2 hover:bg-gray-200 rounded-xl hover:bg-gray-300 transition-transform  hover:scale-[1.02] flex items-center justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className='w-5 h-5 mr-2'><path fill="#fff" d="M44.59 4.21a63.28 63.28 0 004.33 120.9 67.6 67.6 0 0032.36.35 57.13 57.13 0 0025.9-13.46 57.44 57.44 0 0016-26.26 74.33 74.33 0 001.61-33.58H65.27v24.69h34.47a29.72 29.72 0 01-12.66 19.52 36.16 36.16 0 01-13.93 5.5 41.29 41.29 0 01-15.1 0A37.16 37.16 0 0144 95.74a39.3 39.3 0 01-14.5-19.42 38.31 38.31 0 010-24.63 39.25 39.25 0 019.18-14.91A37.17 37.17 0 0176.13 27a34.28 34.28 0 0113.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0087.2 4.59a64 64 0 00-42.61-.38z"/><path fill="#e33629" d="M44.59 4.21a64 64 0 0142.61.37 61.22 61.22 0 0120.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 00-13.64-8 37.17 37.17 0 00-37.46 9.74 39.25 39.25 0 00-9.18 14.91L8.76 35.6A63.53 63.53 0 0144.59 4.21z"/><path fill="#f8bd00" d="M3.26 51.5a62.93 62.93 0 015.5-15.9l20.73 16.09a38.31 38.31 0 000 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 01-5.5-40.9z"/><path fill="#587dbd" d="M65.27 52.15h59.52a74.33 74.33 0 01-1.61 33.58 57.44 57.44 0 01-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0012.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68z"/><path fill="#319f43" d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0044 95.74a37.16 37.16 0 0014.08 6.08 41.29 41.29 0 0015.1 0 36.16 36.16 0 0013.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 01-25.9 13.47 67.6 67.6 0 01-32.36-.35 63 63 0 01-23-11.59A63.73 63.73 0 018.75 92.4z"/></svg>
                              Create account with Google
                              </button>
                              <button onClick={() => handleSocialSignUp("oauth_apple")} className="mt-2 w-full pl-5 pr-5 pt-2 pb-2 hover:bg-gray-200 rounded-xl hover:bg-gray-300 transition-transform  hover:scale-[1.02] flex items-center justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className='w-5 h-5 mr-2'><path d="M97.905 67.885c.174 18.8 16.494 25.057 16.674 25.137-.138.44-2.607 8.916-8.597 17.669-5.178 7.568-10.553 15.108-19.018 15.266-8.318.152-10.993-4.934-20.504-4.934-9.508 0-12.479 4.776-20.354 5.086-8.172.31-14.395-8.185-19.616-15.724C15.822 94.961 7.669 66.8 18.616 47.791c5.438-9.44 15.158-15.417 25.707-15.571 8.024-.153 15.598 5.398 20.503 5.398 4.902 0 14.106-6.676 23.782-5.696 4.051.169 15.421 1.636 22.722 12.324-.587.365-13.566 7.921-13.425 23.639M82.272 21.719c4.338-5.251 7.258-12.563 6.462-19.836-6.254.251-13.816 4.167-18.301 9.416-4.02 4.647-7.54 12.087-6.591 19.216 6.971.54 14.091-3.542 18.43-8.796"/></svg>
                              Create account with Apple
                              </button>
                              <button onClick={() => handleSocialSignUp("oauth_facebook")} className="mt-2 w-full pl-5 pr-5 pt-2 pb-2 hover:bg-gray-200 rounded-xl hover:bg-gray-300 transition-transform  hover:scale-[1.02] flex items-center justify-content-center">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className='w-5 h-5 mr-2'><rect fill="#3d5a98" x="4.83" y="4.83" width="118.35" height="118.35" rx="6.53" ry="6.53"/><path fill="#fff" d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0091 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z"/></svg>
                              Create account with Facebook
                              </button>
                            </div>

                            <div className='flex items-center justify-content-center mt-5'>
                              You already have a account
                              <div className='font-bold ml-2 px-2 bg-gray-200 rounded-md cursor-pointer' 
                              onClick={() => {
                                setTypeAuth("Sign In")
                              }}>Sign In</div>
                            </div>
                          </>
                        }
                    </CardContent>
                </Card>
            </div>
        </main>

        <footer className="border-t bg-white p-4 text-center text-sm text-gray-500">
            <div className="container mx-auto max-w-6xl">
                © {new Date().getFullYear()} IMASIS MIND. All rights reserved.
            </div>
        </footer>
  </div>
  )
}

export default MindAuth