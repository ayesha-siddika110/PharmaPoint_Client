

const DiscountCard = ({item}) => {
    return (
        <div className='h-[420px]  p-5 shadow-sm shadow-black border space-y-2'>
            <img className='w-full h-[250px] object-cover' src={item?.productPhoto} alt="" />
            <div className='flex justify-between  pt-2'>
                <p className='w-[50%] text-lg font-semibold text-orange-500'>Discount :{item?.discount}%</p>
            </div>
            
            <p className='text-2xl text-black'>{item?.productName}</p>
            <p>Company: {item?.company}</p>
            <p>Category: {item?.category}</p>
        </div>
    );
};

export default DiscountCard;