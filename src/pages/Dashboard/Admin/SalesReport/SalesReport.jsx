import React, { useRef } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../../../../assets/Logo/darklogo.png'

const SalesReport = () => {
    const axiosSecure = useAxiosSecure()
    const { data: payments = [], isLoading, refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`)
            return res.data
        }
    })
    const salesRef = useRef()


    //download sales report
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
        const input = salesRef.current;
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
            pdf.save('SalesReport.pdf');
        });

    }
    return (
        <div>
            <div className="w-[100%] m-auto">
                <div className="overflow-x-auto">

                    <div className="flex justify-end items-center mt-10 mb-8">
                        <div>
                            <button onClick={downloadPdf} className="bg-[#033B4C] text-white py-3 px-4">+ Download Report</button>
                        </div>
                    </div>
                    <div>
                        <div ref={salesRef}>
                            <div className="bg-[#033B4C] flex flex-col justify-center items-center h-[170px] text-white">
                                <img src={logo} className='' alt="" />

                            </div>
                            <p className="text-center text-3xl font-semibold py-10 uppercase">Sales Report</p>
                            <table  className="table table-zebra ">
                                {/* head */}
                                <thead className="bg-[#033B4C] rounded-lg text-white">
                                    <tr className="h-12 font-normal text-center text-[14px]">
                                        <th>#</th>
                                        <th>Medicine name</th>
                                        {/* <th >seller email</th> */}
                                        <th>Total Price</th>
                                        <th>Transaction Id</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        payments.map((item, index) => (
                                            <tr key={index} className='textcenter'>
                                                <td>{index + 1}</td>
                                                <td>ousodh er name</td>

                                                {/* <td>
                                                    <p>{item?.sellerEmail}</p>
                                                </td> */}
                                                <td>
                                                    <p>{item?.price / 100}</p>
                                                </td>
                                                <td>
                                                    <p>{item?.transactionId}</p>
                                                </td>
                                                <td>


                                                    <p className={`text-red-900 font-semibold text-center rounded-full py-1 cursor-pointer w-24 m-auto ${item?.status === 'pending' && 'text-green-900'}`}
                                                    >{item?.status}</p>
                                                </td>
                                                {/* <td>
                                                    <button disabled={item?.status === 'paid'} className={`bg-green-300  text-green-800 text-center rounded-full py-1 cursor-pointer  w-32 m-auto ${item?.status === 'paid' ? 'bg-gray-400 text-gray-500' : ''}`} >accept payment</button>
                                                </td> */}
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>

                        </div>

                    </div>


                </div>

            </div>
        </div>
    );
};

export default SalesReport;