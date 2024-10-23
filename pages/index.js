import React,{useEffect,useState} from 'react';
import { postLoginRequest } from './api/api';
import { useRouter } from 'next/router';

function App() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
      const reqData = { email, password };
  
      try {
          const result = await postLoginRequest(reqData);
          setData(result);
          // เก็บโทเคนใน localStorage
          if(result.status && result.status.code === 200){
            if (result.token) {
              localStorage.setItem('authToken', result.token);
              router.push('/listUser');
          }
          }else{
            alert('"Please log in with an existing account.');
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  };
  
  return (
    
    <div class="flex items-center justify-center min-h-screen">
      <div class="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div class="w-full">
          <div class="text-center">
            <img class="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />
            <h1 class="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p class="mt-2 text-gray-500">Sign in below to access your account</p>
          </div>
          <div class="mt-5">
            <form onSubmit={handleSubmit}>
                <div class="relative mt-6">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <label for="email" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                </div>
                <div class="relative mt-6">
                    <input 
                      type="password" 
                      name="password" 
                      id="password" 
                      placeholder="Password" 
                      class="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      />
                    <label for="password" class="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                </div>
                <div class="my-6">
                    <button type="submit" class="w-full rounded-md  px-3 py-4  bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Sign in</button>
                </div>
                <p class="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
                    <a href="./register"
                        class="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">
                        Sign up.
                    </a>
                </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
