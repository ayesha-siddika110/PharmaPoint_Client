

const LiElement = ({name}) => {
    return (
        <div>
            <li className='hover:bg-white hover:py-3 py-2 rounded-xl cursor-pointer w-[120%]  hover:text-[#033B4C] pl-2'>{name}</li>
            
        </div>
    );
};

export default LiElement;