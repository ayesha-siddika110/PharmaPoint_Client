import { Link, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";
import LightButton from "../../Share/LightButton/LightButton";
import { FaRegEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";


const CategoryDatas = () => {

    const { category } = useParams()

    const axiospublic = useAxiosPublic()
    const [categoryData, setCategoryData] = useState([])

    useEffect(() => {
        axiospublic(`/products/${category}`)
            .then(res => {
                setCategoryData(res.data);

            })
    }, [category, setCategoryData, axiospublic])
    console.log(categoryData);


    // purchase quantity
    const [purchaseQuantity, setPurchaseQuantity] = useState(1);

    const handlepurchaseQuantity = (event) => {
      const value = event.target.value; // Get the current input value
      setPurchaseQuantity(value); // Update the state with the input value
    //   console.log("Purchase Quantity:", value); // Log the current value
    };

    // add to cart 

    const handleSelectToCart = (item) => {
        Swal.fire({
            title: "Add to Cart?",
            text: "You won't be able to revert this!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add!"
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(item);
                // const { data: carts, isLoading, refetch } = useQuery({
                //     queryKey: ['carts'],
                //     queryFn: async () => {
                //       const res = await axiospublic.get('/cart'); // Adjust the endpoint as necessary
                //       return res.data;
                //     },
                //   });

                // const mutation = useMutation({

                //     mutationFn: async()=>{
                //         const res = await axiospublic.post('/cart', item)
                //         return res.data
                //     },
                //     onSuccess: (data) => {
                //         console.log('Item added:', data);
                //         refetch(); // Refetch the cart data after successfully adding the item
                //       },
                // })

                const itemData = {
                    productName : item?.productName,
                    category : item?.category,
                    price : item?.price,
                    quantity, //TODO: quantity set increase decrease
                    productPhoto: item?.productPhoto,
                    sellerName : item?.sellerName,
                    productId: item?._id,
                    sellerEmail: item?.sellerEmail,
                }
                console.log(itemData);
                
                axiospublic.post('/cart', itemData)
                    .then(res => {

                        if (res.data.insertedId) {
                            Swal.fire({
                                title: "Added to Cart!",
                                text: "Product add to cart.",
                                icon: "success"
                            });
                        }
                        if (res.data?.message) {
                            toast.error(res.data?.message);
                        }

                    })
            }
        });
    }

    // details data 

    const [detailItem, setDetailsItem] = useState([])
    const handleViewDetails = (_id) => {
        console.log(_id);

        axiospublic(`/products/${_id}`)
            .then(res => {
                setDetailsItem(res.data);

            })
    }
    console.log(detailItem);

    const { category: itemCategory, description, price, productName, productPhoto, quantity, sellerName } = detailItem || {}


    return (
        <div className="w-[80%] m-auto">
            <div className="overflow-x-auto w-full">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>image</th>
                            <th>Name</th>
                            <th>Company</th> {/**TODO: include the database company field */}
                            {/* <th>quantity</th> */}
                            <th>Add To Cart</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categoryData?.map((item, index) => <tr key={index}>
                                <th>{index + 1}</th>
                                <td><img src={item?.productPhoto} className="h-16 w-24 object-cover" alt="" /></td>
                                <td>{item?.productName}</td>
                                <td>Dynamic company</td>
                                {/* <td><input type="number" value={purchaseQuantity} onChange={()=>handlepurchaseQuantity(index)} /></td> */}
                                <td><p className="bg-[#4bb4d4a1] w-20 text-center py-1 rounded-full text-[#033B4C] cursor-pointer" onClick={() => handleSelectToCart(item)}>Select</p></td>

                                <td><label htmlFor="my_modal_6" ><FaRegEye onClick={() => handleViewDetails(item?._id)} className="bg-[#033B4C] text-white h-10 w-10 p-[10px] rounded-lg  cursor-pointer" /></label></td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-[60%] max-w-5xl relative">
                    <div className="flex">
                        <div className="w-[50%] mt-16">
                            <h1 className="">Medicine Name : {productName}</h1>
                            <p>Category : {itemCategory}</p>
                            <p>Price : {price} TK</p>
                            <p>Quantity : {quantity} TK</p>
                            <p>Seller Name : {sellerName} TK</p>
                            <h1 className="text-justify pr-6">Details : {description}</h1>
                        </div>
                        <img className="w-[50%] mt-16" src={productPhoto} alt="" />

                    </div>
                    <div className="modal-action absolute top-0 right-4 ">
                        <label htmlFor="my_modal_6" className=" text-4xl cursor-pointer"><IoMdClose className="bg-[#4bb4d4a1] text-[#033B4C]" /></label>
                    </div>

                    {/* Close button */}

                </div>
            </div>

        </div>
    );
};

export default CategoryDatas;