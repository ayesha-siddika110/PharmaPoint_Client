
import { useQuery } from "@tanstack/react-query";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import logo from '../../assets/Logo/darklogo.png'
import useAuth from "../../Hooks/useAuth";

const Invoice = () => {
    const pdfRef = useRef()
    const axiospublic = useAxiosPublic()
    const {user:buyer} = useAuth()

    const { refetch, data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiospublic.get(`/payments/${buyer?.email}`)
            return res.data
        }
    })
    // console.log(payments);
    const {user} = useAuth()
    
    const totalPrice = payments.reduce((acc, item) => (acc + parseFloat(item.price / 100)), 0)
    



    // pdf downloading
    // const preprocessStyles = () => {
    //     const elements = document.querySelectorAll("*");
    //     elements.forEach((el) => {
    //         const computedStyle = window.getComputedStyle(el);
    //         if (computedStyle.backgroundColor.includes("oklch") || computedStyle.color.includes("oklch")) {
                
    //             el.style.backgroundColor = "#ffffff";
    //             el.style.color = "#000000"; 
    //         }
    //     });
    // };
    const preprocessStyles = () => {
        const elements = document.querySelectorAll("*");
        elements.forEach((el) => {
            const computedStyle = window.getComputedStyle(el);
            const propsToCheck = ["backgroundColor", "color", "borderColor", "boxShadow"];
    
            propsToCheck.forEach((prop) => {
                if (computedStyle[prop] && computedStyle[prop].includes("oklch")) {
                    if (prop === "backgroundColor" || prop === "color") {
                        el.style[prop] = prop === "backgroundColor" ? "#ffffff" : "#000000";
                    } else {
                        el.style[prop] = "transparent"; 
                    }
                }
            });
        });
    }
    const downloadPdf = () => {
        preprocessStyles()
        const input = pdfRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 50;
            pdf.addImage(
                imgData,
                'PNG',
                imgX,
                imgY,
                imgWidth * ratio,
                imgHeight * ratio,
            );
            pdf.save('invoice.pdf');
        });

    }
    return (
        <>

            <div ref={pdfRef} className="w-[70%] m-auto">
                <div>
                <div className="bg-[#033B4C] flex flex-col justify-center items-center h-[200px] text-white">
                    <img src={logo} alt="" />
                    
                </div>
                <p className="text-center text-3xl font-semibold py-10">Payment Invoice</p>
                <div className="flex gap-3 mt-2 pl-10">

                    <div className="font-semibold">
                        <div><p>Buyer Name </p></div>
                        <div><p>Email </p></div>
                        <div><p>Total Price </p></div>
                        <div><p>Total item </p></div>
                    </div>
                    <div>
                        <div><p>: {user?.displayName}</p></div>
                        <div><p>: {user?.email}</p></div>
                        <div><p>: {totalPrice}</p></div>
                        <div><p>: {payments.length}</p></div>
                    </div>
                </div>
                <div className="mt-10">
                    <table className="w-full">
                        <thead>
                            <tr className="text-center">
                                <th className="border border-gray-400">Sl</th>
                                <th className="border border-gray-400">Product Name</th>
                                <th className="border border-gray-400">Price</th>
                                <th className="border border-gray-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="text-center">
                                    <td className="border border-gray-400">{index + 1}</td>
                                    <td className="border border-gray-400">{payment.productsName}</td>
                                    <td className="border border-gray-400">{parseFloat(payment.price) / 100}tk</td>
                                    <td className="border border-gray-400">{payment.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            <div className="flex justify-end mt-5 w-[70%] m-auto">

            <button onClick={downloadPdf} className="bg-[#033B4C] py-2 px-8 rounded-lg text-white font-semibold">download</button>
            </div>
        </>
    );
};

export default Invoice;