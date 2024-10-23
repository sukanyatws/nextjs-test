import { useRouter } from 'next/router';

const Navbar = () => {
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem('authToken');
        router.push('/'); 
    }

    return (
        <nav className="bg-sky-400 p-4">
    <div className="flex items-center justify-between container mx-auto">
        <img 
            className="h-12 filter invert" 
            src="https://www.svgrepo.com/show/499664/user-happy.svg" 
            alt="User Icon" 
        />
        <button 
            onClick={logout} 
            className="logout text-white"
        >
            Log out
        </button>
    </div>
</nav>

    );
};

export default Navbar;
