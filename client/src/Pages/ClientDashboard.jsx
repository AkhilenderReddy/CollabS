import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import Loader from '../Components/Loader';
import ClientPromotionCard from '../Components/ClientPromotionCard';

const ClientDashboard = () => {
    const [promotions,setPromotions] = useState([]);
    const {currentUser} = useContext(UserContext);
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        const getPromotions = async()=>{
          try {
            setIsLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/promotions`);
            setPromotions(response?.data);
            setIsLoading(false);
          } catch (error) { 
            console.log(error)
            setIsLoading(false); 
          }
        }
        getPromotions();
      },[])


    const lightColors = [
        "#fcf372",
        "#9bebb0",
        "#ffb69a",
        "#f0cd86",
        "#bcc4ab",
        "#84eff4",
        "#e77f94",
        "#eac7f6",
    ];

    if (isLoading) {
        return (
          <div style={{height:'100vh',maxHeight: '100vh',}} className="w-full max-w-full grid place-items-center">
            <Loader />
          </div>
        );
      }

  return (
    <section className={`mt-16 w-full max-w-full px-3 rounded-3xl`}
    style={{ minHeight: "500px" }}>
        <div className="flex flex-col gap-3 pb-2">
          {promotions?.filter((p)=> p.clientId._id === currentUser?.id).length > 0 ? promotions?.filter((p)=> p.clientId?._id === currentUser?.id).map((promotion,index)=> (
            <div key={index}><ClientPromotionCard color={lightColors[index%lightColors.length]} promotion={promotion} /></div>
          )) : <p className="text-center mt-32 text-3xl">No promotions yet.</p>} 
        </div>
    </section>
  )
}

export default ClientDashboard