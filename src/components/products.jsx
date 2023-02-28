import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import ProdImage from './image';

const Products = () => {

    const [item, setItem] = useState(); 
      
    const id = useLocation();
    const productId = id.state.id;
    const url = 'http://localhost:3001/products/';
    const getProdUrl = url + productId;

    useEffect(() => {
        fetch(getProdUrl)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            
        })
        .then(data => {
            
            setItem(data)
        })
        
    }, );

    

      const decimalCheck = (pris, campaign) => {  // kontrollerar prisets decimaler. Samt, om det är rea, så stryk över det gamla priset.
  
        if(pris % 1 === 0 ){
          if(campaign && campaign.discountPercent < 100){
            return <div className='strikeThrough'>{pris} Kr</div>
          }
          return pris + ' Kr'
        }
        if (!pris % 1 === 0) {
          pris = Math.round(pris)
          if(campaign && campaign.discountPercent < 100){
            return <div className='strikeThrough'>{pris} Kr</div>
          }
          return pris + ' Kr'
        }
       }
      
       const campaignPrice = (pris, campaign) => {  // uppdaterar priset med procentsats
        if(campaign){
          
          if(campaign.discountPercent < 100){
            const discount = (100 - campaign.discountPercent) / 100; 
            pris = pris * discount;
      
            if (!pris % 1 === 0) {
              pris = Math.round(pris)
              return pris + ' Kr'
            }    
          }
        }
       }

       const renderCampaign = (campaign) => {  // Kollar om det är en aktiv kampanj, samt att rabatten inte överstriger 100% ifall den gör det så kommer INTE en rea flagga presenteras
        for (const item in campaign) {  
          if(item && campaign.discountPercent < 100){
            return <div id="rea">Rea!</div>; 
          }
        }
   }

   const handleClick = () => {
    alert('Produkten ligger i korgen');
   }

    const mapData = (array) => {
       
        return (
            <div className='prodPageDiv'>

                {renderCampaign(item.campaign)}  
                <ProdImage imageUrl={item.productImage}/>
               
                <h3>{array.name}</h3>
                <div className='description'>{array.description}</div>
                <div className='fat'>{decimalCheck(item.price, item.campaign)}</div> 
                <div className='reaPris'>{campaignPrice(item.price, item.campaign)}</div> 
                <button className='buyMe' onClick={handleClick}>Lägg i Varukorg</button>
            
            </div>
            
    
            )
       
    }

    return (
    item && mapData(item)
   )
}
export default Products;