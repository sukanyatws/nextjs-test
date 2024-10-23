import React,{useEffect,useState} from 'react';
import { postRegisterRequest } from './api/api';
import { useRouter } from 'next/router';


function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reqData = { email, password};
    
        try {
            const result = await postRegisterRequest(reqData);
            setData(result);
            // เก็บโทเคนใน localStorage
            if (result.token) {
                localStorage.setItem('authToken', result.token);
                router.push('/listUser');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        if (newPassword === confirmPassword) {
            setPassword(newPassword);
            setErrorMessage('');
        } else {
            setErrorMessage('รหัสผ่านไม่ตรงกัน กรุณาลองอีกครั้ง');
            setPassword('');
        }
    }, [password, confirmPassword]);
    
  
  return (
    <div class="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
        <div class="bg-white shadow-md rounded-md p-6">

            <img class="mx-auto h-12 w-auto" src="https://www.svgrepo.com/show/499664/user-happy.svg" alt="" />

            <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign up for an account
            </h2>


            <form onSubmit={handleSubmit} class="space-y-6">

                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Username</label>
                    <div class="mt-1">
                        <input name="email" type="email" required
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                    <div class="mt-1">
                        <input name="password" type="password" autocomplete="password" required
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)}/>
                    </div>
                </div>

                <div>
                    <label for="confrim-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div class="mt-1">
                        <input name="confirm_password" type="password" autocomplete="confirm-password" required
                            class="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                        {errorMessage && (
                            <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                        )}
                </div>

                <div>
                    <button type="submit"
                        class="flex w-full justify-center rounded-md border border-transparent bg-sky-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2">Register
                        Account
                        </button>
                </div>
            </form>
        </div>
    </div>
</div>
  );
}

export default Register;
