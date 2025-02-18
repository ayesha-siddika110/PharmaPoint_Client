import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate} from "react-router-dom";
// import { useEffect } from "react";
import { FaRegEye } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSign from "../../Share/LoadingSign/LoadingSign";
import useCart from "../../Hooks/useCart";
import useAuth from "../../Hooks/useAuth";

const PaginatedProducts = () => {
  const axiosPublic = useAxiosPublic();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('')
  const itemsPerPage = 8;
  const [sortedProducts, setSortedProducts] = useState([]);
  const [cart,refetch] = useCart()
  const {user} = useAuth()
  
  


  

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", currentPage,search],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/products?page=${currentPage}&limit=${itemsPerPage}&search=${search}`
      );
      setSortedProducts(res.data.products)
      return res.data;
    },
    keepPreviousData: true,
    
  });



  
  

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1); // ReactPaginate uses zero-based indexing
  };

  // const { category } = useParams()

  const axiospublic = useAxiosPublic()
  // const [categoryData, setCategoryData] = useState([])

 

  // useEffect(() => {
  //   axiospublic.get(`/products/${category}`)
  //     .then(res => {
  //       setCategoryData(res.data);

  //     })
  // }, [category, setCategoryData, axiospublic])
  // console.log(categoryData);


  const handleSortChange =(e)=>{
    const value = e.target.value
    // console.log(value);
    let sortArray = [...sortedProducts]
    if(value === 'lowToHigh'){
      sortArray?.sort((a,b)=> parseFloat(a.price) - parseFloat(b.price))
    }
    if(value === 'highToLow'){
       sortArray?.sort((a,b)=> parseFloat(b.price) - parseFloat(a.price))
    }
    setSortedProducts(sortArray);
    
  }
  // console.log('sorted data ',sortedProducts);
  
  

  

  // add to cart 
const navigate = useNavigate()
  const handleSelectToCart = (item) => {
    if(!user){
        return navigate("/login")
    }

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


        const itemData = {
          productName: item?.productName,
          category: item?.category,
          price: item?.price,
          quantity: item?.quantity, //TODO: quantity set increase decrease
          productPhoto: item?.productPhoto,
          sellerName: item?.sellerName,
          productId: item?._id,
          sellerEmail: item?.sellerEmail,
          buyerEmail: user?.email
        }
        // console.log(itemData);

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
            refetch()

          })
      }
    });
  }

  const [detailItem, setDetailsItem] = useState([])
  const handleViewDetails = (_id) => {
    // console.log(_id);

    axiospublic(`/products/${_id}`)
      .then(res => {
        setDetailsItem(res.data);

      })
  }
  // console.log(detailItem);

  const { category: itemCategory, description, price, productName, productPhoto, quantity, sellerName } = detailItem || {}

  if (isLoading)
    return <LoadingSign></LoadingSign>
  if (error )
    return <div className="text-center text-gray-500 py-32 text-5xl">NO DATA FOUND</div>;

  return (
    <div className="">
     
      <div className="md:flex justify-end w-[90%] m-auto pb-8 gap-8">
        {/* search */}
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" onChange={e => setSearch(e.target.value)} value={search} className="" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd" />
          </svg>
        </label>
        <select
          className="select select-bordered w-[200px]"
        
          onChange={handleSortChange}
        >
          <option value="" disabled>
            Sort By Price
          </option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {
          data?.products?.length === 0 ? <div className="text-center text-gray-500 py-32 text-5xl">NO DATA FOUND</div> : <>
           <div className="overflow-x-auto w-[90%] m-auto border">
       
       <table className="table">
         <thead>
           <tr>
             <th></th>
             <th>image</th>
             <th>Name</th>
             <th>Company</th> {/**TODO: include the database company field */}
             <th>Price</th>
             <th>Add To Cart</th>
             <th>Details</th>
           </tr>
         </thead>
         <tbody>
           {
             sortedProducts?.map((item, index) => <tr key={index}>
               <th>{index + 1}</th>
               <td><img src={item?.productPhoto} className="h-16 w-24 object-cover" alt="" /></td>
               <td>{item?.productName}</td>
               <td>{item?.company}</td>
               <td>{item?.price}</td>
               {/* <td><input type="number" value={purchaseQuantity} onChange={()=>handlepurchaseQuantity(index)} /></td> */}
               <td><p className="bg-[#4bb4d4a1] w-20 text-center py-1 rounded-full text-[#033B4C] cursor-pointer" onClick={() => handleSelectToCart(item)}>Select</p></td>

               <td><label htmlFor="my_modal_6" ><FaRegEye onClick={() => handleViewDetails(item?._id)} className="bg-[#033B4C] text-white h-10 w-10 p-[10px] rounded-lg  cursor-pointer" /></label></td>
             </tr>)
        
           }

         </tbody>
       </table>
     </div>
          
          
          </>
        }
      {/* Sort */}
     
      
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box md:w-[60%] max-w-5xl relative">
          <div className="md:flex">
            <div className="w-[50%] mt-16 font-semibold space-y-3">
              <h1 className="">Medicine Name : {productName}</h1>
              <p>Category : {itemCategory}</p>
              <p>Price : {price} TK</p>
              <p>Quantity : {quantity} </p>
              <p>Seller Name : {sellerName}</p>
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
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={data.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center mt-6 space-x-2"
        pageClassName="group"
        pageLinkClassName="px-3 py-2 border rounded-md text-gray-600 hover:bg-blue-100 hover:text-blue-600 group-focus:bg-blue-100"
        previousClassName="group"
        previousLinkClassName="px-3 py-2 border rounded-md text-gray-600 hover:bg-blue-100 hover:text-blue-600 group-focus:bg-blue-100"
        nextClassName="group"
        nextLinkClassName="px-3 py-2 border rounded-md text-gray-600 hover:bg-blue-100 hover:text-blue-600 group-focus:bg-blue-100"
        breakClassName="group"
        breakLinkClassName="px-3 py-2 border rounded-md text-gray-600"
        activeLinkClassName="bg-blue-500 text-white border-blue-500"
      />
    </div>
  );
};

export default PaginatedProducts;
