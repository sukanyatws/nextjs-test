import React,{useEffect,useState} from 'react';
import Navbar from './components/navbar';
import 
{ 
    getListUser,
    putListUser,
    deleteListUser
} 
from './api/api';

function ListUser() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editData, setEditData] = useState({ name: '' });

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            if(editData){
                const fetchListUserData = async () => {
                    try {
                        const result = await getListUser();
                        setData(result?.data);
                    } catch (error) {
                        setError(error);
                    }
                };
                fetchListUserData();
            }
        }else{
            router.push('/');
        }
    }, []);

     const handleUserClick = (user) => {
        setSelectedUser(user);
        setEditData({ first_name: user.first_name });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const reqData = { ...editData, id: selectedUser.id };
        try {
            const result = await putListUser(reqData);
            console.log("test",result)
            setData((prevData) =>
                prevData.map((user) =>
                    user.id === selectedUser.id ? { ...user, first_name: result.first_name } : user
                )
            );
            setSelectedUser(null); 
        } catch (error) {
            setError(error);
        }
    };
    

    const handleDeleteUser = async () => {
        if (!selectedUser) {
            return;
        }
    
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if (confirmed) {
            try {
                await deleteListUser(selectedUser.id); 
                setData((prevData) => prevData.filter((user) => user.id !== selectedUser.id));
                setSelectedUser(null);
            } catch (error) {
                setError(error);
            }
        }
    };

    if (error) return <p>Error: {error.message}</p>;

    return (
        <section class="bg-white dark:bg-gray-900">
            <Navbar />
            <div class="container px-6 py-10 mx-auto">
                <h1 class="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl dark:text-white">Users List</h1>
                <p class="max-w-2xl mx-auto my-6 text-center text-gray-500 dark:text-gray-300">
                    You can edit & delete users list so easy from you hands.
                </p>
                {selectedUser && (
                    <div className="mt-8 p-4 border rounded-lg shadow-md bg-gray-100">
                        <h2 className="text-xl font-semibold">Edit User</h2>
                        <form onSubmit={handleEditSubmit}>
                            <input
                                type="text"
                                name="first_name"
                                value={editData.first_name}
                                onChange={handleEditChange}
                                placeholder="First Name"
                                className="block w-full mt-2 p-2 border rounded"
                            />
                            <div className="flex space-x-4 mt-4">
                                <button type="submit" className="p-2 bg-blue-500 text-white rounded">Save Changes</button>
                                <button onClick={handleDeleteUser} type="button" className="p-2 bg-red-500 text-white rounded">Delete User</button>
                            </div>
                        </form>
                    </div>
                )}
                <div class="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 xl:grid-cols-3">
                {data && data.map(user => (
                     <
                        div key={user?.id} class="flex flex-col items-center p-8 transition-colors duration-200 transform cursor-pointer group hover:bg-sky-400 rounded-xl relative"
                        onClick={() => handleUserClick(user)}
                     >
                     <img 
                     class="object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" 
                     src={user?.avatar} alt="" />
                     <h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-white">
                     {user && selectedUser && user.id === selectedUser.id ? editData.first_name : user.first_name} {user.last_name}
                    </h1>
                     <p class="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-300">
                     {user?.email}
                    </p>
                 </div>
                ))}
                </div>

            </div>
        </section>
    );
}

export default ListUser;