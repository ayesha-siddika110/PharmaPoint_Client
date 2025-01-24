
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSign from "../../Share/LoadingSign/LoadingSign";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

const UpdateProfile = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {
        // console.log(data)
        const updatedata = {
            userName: data?.userName,
            photo: data?.photo,
        }
        axiosSecure.patch(`/users/${profile?._id}`,updatedata )
        .then(res=>{
            // console.log(res);
            if(res.data.modifiedCount>0){
                toast.success('Profile Updated')
                refetch()
            }
            
        })
      }

    const { refetch, data: profile = [], isLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })
    // console.log(profile);


    if (isLoading) {
        return <LoadingSign></LoadingSign>
    }

    




    return (
        <div className="bg-gray-100 pt-10 min-h-[80vh] flex justify-center items-center">
             <Helmet>
                <title>Profile - PharmaPoint</title>
            </Helmet>
            <div className="bg-white shadow-lg rounded-lg  w-[90%]">
                {/* Header Section */}
                <div className="relative">
                    <img
                        src="https://i.ibb.co.com/khMs5K7/285809807996bcc.jpg" // Replace with your background image URL
                        alt="Profile background"
                        className="w-full h-48 object-cover  rounded-t-lg"
                    />
                    <div className="absolute top-40 left-6 flex items-center">
                        <div className="relative">
                            <img
                                src={profile?.photo} // Replace with your profile image URL
                                alt="User"
                                className="w-32 h-32 object-cover rounded-full border-4 border-white"
                            />

                        </div>
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold">{profile?.userName}</h2>
                            <p className="text-sm text-green-500 uppercase font-semibold">
                                {profile?.role}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="p-6 mt-20">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold">Personal details</h3>

                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* First Name */}
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    {...register("userName")}
                                    defaultValue={profile?.userName}
                                    className="mt-1 input w-full max-w-[300px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                />
                            </div>

                        </div>



                        {/* photo */}
                        <div>
                            <label
                                htmlFor="url"
                                className=" text-sm font-medium text-gray-700"
                            >
                                Photo URL
                            </label><br />
                            <input
                                {...register("photo")}
                                type="url"
                                id="url"
                                defaultValue={profile?.photo}
                                className="mt-1 input w-full max-w-[300px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <button className="bg-[#033B4C] text-white px-4 py-2 rounded-md">
                            Save changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
