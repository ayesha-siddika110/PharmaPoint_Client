import DashboardHeading from "../../../Share/dashboardHeading/DashboardHeading";
import doctors from '../../../assets/banner/doctors.jpg'

const AdviceDoctor = () => {
    return (
        <div className="w-[90%] m-auto">
            <DashboardHeading title={"Advice From Our Specialist"}></DashboardHeading>
            <div className="w-[70%] m-auto">
                <img src={doctors} className="h-[400px] m-auto border object-cover rounded-3xl" alt="" />
            </div>
            <div className="bg-[#144c5e21] text-black w-[80%] m-auto p-6 -mt-52 rounded-3xl">
                <h1 className="text-black font-semibold text-2xl text-center pt-52 ">How to Lead a Healthy Life and Follow Prescriptions Effectively</h1>
                <p className="text-justify pt-2 pb-8">Living a healthy life is not just about avoiding illness—it’s about thriving physically, mentally, and emotionally. Incorporating healthy habits and responsibly following prescriptions can enhance your overall well-being and prevent long-term health complications. Include a variety of fresh fruits, vegetables, lean proteins, whole grains, and healthy fats in your meals. Avoid excessive sugar, salt, and processed foods.
                    Regular exercise strengthens your muscles, improves heart health, and reduces stress. Aim for at least 30 minutes of activity, such as walking, cycling, or yoga, every day. Practice mindfulness, meditation, or other stress-relief techniques to maintain emotional balance. Stay socially connected and seek support when needed.
                    Say no to smoking, limit alcohol intake, and avoid drug misuse. These habits can lead to severe health problems over time. Always follow the doctor’s instructions regarding dosage, timing, and duration. Skipping doses or stopping medication prematurely can lead to complications.</p>
            </div>
        </div>
    );
};

export default AdviceDoctor;