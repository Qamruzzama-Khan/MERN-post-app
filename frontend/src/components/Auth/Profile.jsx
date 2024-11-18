import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../hooks/useAuth"
import { updateUser } from "../../services/api";

const Profile = () => {
    const { user, dispatch } = useAuthContext();
    const [profileForm, setProfileForm] = useState();
    const [profileImg, setProfileImg] = useState(false);
    const fileRef = useRef(null);
    const [edit, setEdit] = useState(false);
    const [updating, setUpdating] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProfileForm((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    }

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        localStorage.removeItem('user');
    };

    const handleEditProfile = () => {
        console.log(user.user)
        setProfileForm(user.user)
        setEdit(true)
        setProfileImg(true)
    }

    const handleUpdateProfile = async (e, id) => {
        e.preventDefault();
        setUpdating(true)
        const formDataToSend = new FormData();
        Object.keys(profileForm).forEach(key => formDataToSend.append(key, profileForm[key]));
        const response = await updateUser(id, formDataToSend, user.accessToken);
        dispatch({ type: 'UPDATE_PROFILE', payload: response.data.data })
        localStorage.setItem('user', JSON.stringify(response.data.data))
        setUpdating(false)
    }

    return (
        <div className=" flex flex-col items-center p-2 bg-gray-50 border-r-2 border-gray-500 md:w-[40%] md:h-[93.5vh] md:items-start relative">

            {updating && <div>Updating...</div>}

            {
                edit ?
                    // if edit is true show this 
                    <form className="flex flex-col items-center">
                        {/* Profile Image Container */}
                        <div className="relative">
                            {profileImg ? <div>
                                <input type="file" ref={fileRef} onChange={handleChange} name="profileImage" className="hidden" />
                                <div className="h-24 w-24 flex justify-center items-center rounded-full border-2 border-gray-500 overflow-hidden md:mt-6">
                                    <img
                                        src={user.user.profileImage.imageUrl}
                                        alt="profile-img"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                                : <div className="h-24 w-24 flex justify-center items-center rounded-full border-2 border-gray-500 overflow-hidden md:mt-6"><img
                                    src={user.user.profileImage.imageUrl}
                                    alt="profile-img"
                                    className="w-full h-full object-cover"
                                /> </div>}
                            <span className="material-symbols-outlined text-3xl md:text-4xl  absolute top-16 md:top-20 md:left-16 right-0 cursor-pointer" onClick={() => fileRef.current.click()}>
                                add_a_photo
                            </span>
                        </div>
                        <input className="font-semibold text-lg md:ml-3 md:text-2xl md:mt-3 text-center border border-gray-400 rounded-md mt-2" type="text" name="username" placeholder="username" value={profileForm.username} onChange={handleChange} />
                        <input className="font-semibold md:ml-3 md:text-xl text-center border border-gray-400 rounded-md mt-2" type="email" name="email" placeholder="email" value={profileForm.email} onChange={handleChange} />
                    </form>
                    :
                    // otherwise show this 
                    <div className="flex flex-col items-center">
                        {/* Profile Image Container */}
                        <div className="h-24 w-24 flex justify-center items-center rounded-full border-2 border-gray-500 overflow-hidden md:mt-6">
                            <img
                                src={user?.user?.profileImage.imageUrl}
                                alt="profile-img"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <p className="font-semibold text-lg text-blue-700 md:ml-3 md:text-2xl md:mt-3 mt-2">{user.user?.username}</p>
                        <p className="font-semibold text-gray-500 md:ml-3 md:text-xl mt-2">{user.user?.email}</p>
                    </div>
            }
            {
                !edit ?
                    // if edit false show Edit Button
                    <button className="absolute top-5 right-5" onClick={handleEditProfile}>
                        <span className="material-symbols-outlined text-3xl">
                            edit
                        </span>
                    </button>
                    :
                    // otherwise show Close Button
                    <button onClick={() => setEdit(false)} className="absolute top-5 right-5" >
                        <span className="material-symbols-outlined text-3xl">
                            close
                        </span>
                    </button>
            }

            <div className="flex flex-col justify-between w-full md:absolute bottom-5 left-0 gap-2 p-2">
                {
                    edit &&
                    // if edit true then only show Update Button otherwise not
                    <button className="bg-blue-600 text-white font-semibold p-3 rounded-full hover:bg-blue-700" onClick={(e) => handleUpdateProfile(e, profileForm._id)}>Update</button>
                }
                <button onClick={handleLogout} className="bg-red-600 text-white font-semibold p-3 rounded-full hover:bg-red-700">
                    Logout
                </button>
            </div>
        </div>

    )
}

export default Profile

