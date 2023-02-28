import React, {Component} from 'react';
import { Link} from 'react-router-dom';
import SearchBar from './searchBar';
import '../App.css';

class Home extends Component {

constructor(props) {
    super(props);

    this.state = {
      items: [],
      err: null,
      isLoaded: false,
      baseUrl: 'https://www.mcdn.net',
     
    }
}

componentDidMount(){

    fetch('http://localhost:3001/products')
    .then((response) => {
      if(response.status >= 400) {
        throw new Error("Server responds with error!");
    }
    return response.json();
    })
    .then((json) => {

      let filteredProducts = json.filter(product => product.price > 0 ); // tar bort produkter med pris som understiger 0 kr. 
      
      this.setState({
        isLoaded: true,
        items: filteredProducts, 
      })

     for (let i = 0; i < this.state.items.length; i++) {
          this.filterImages(this.state.items[i].productImage);
     }
    }, err => {
      this.setState({
          err,
          isLoading: false
      });
  });
}

filterImages(url){  // tar bort produkter som inte har en ok bild

  let picture = new Image();
  picture.src = this.state.baseUrl + url;

  if(picture.height === 0){   // kolla om bilden har en höjd eller inte
          let products = this.state.items;
          for (let i = 0; i < products.length; i++) {
            
            if(products[i].productImage === url || products[i].productImage === null ){
              products.splice(i, 1);   
            }
          }
          this.setState({
            items: products,  // Uppdatera state efter borttagning
          });
      }
}

 renderCampaign(campaign){  // Kollar om det är en aktiv kampanj, samt att rabatten inte överstriger 100% ifall den gör det så kommer INTE en rea flagga presenteras
      if(campaign){
          if(campaign.discountPercent < 100){
            return <div id="rea">Rea!</div>; 
          }
      }   
 }
 
getImages(imageUrl, productImageUrl){  // Hämtar bilder efter kombinerad URL - hanterar också ogiltiga bilder
  
    let picture = new Image();
    picture.src = imageUrl;

    if(picture && picture.height > 0){
   
    if(picture.height > picture.width){
      const imgRatio = picture.height/picture.width;
  
      let newHeight = 275;
      let newWidth = newHeight / imgRatio;

      return (
      <img style={{ width: newWidth, height: newHeight}} className="imgPort" src={imageUrl} alt={imageUrl}></img>
      );
    }

    if(picture.height < picture.width){
      
      const imgRatio = picture.width/picture.height;
      const maxWidth = 275;
      let newHeight = 175;
      let newWidth = newHeight * (imgRatio);
      if(newWidth > maxWidth){
        newWidth = maxWidth;
        newHeight = newWidth / imgRatio;
      }
    
      return (<img style={{ width: newWidth, height: newHeight}}  src={imageUrl} alt={imageUrl}></img>);
    }
  }
}

 inputHandler = (searchWord) => {  // Hanterar sök-event från SearchBar-component och filtrerar samt uppdaterar state
  if(searchWord){
      const searchedFor = this.state.items.filter(i => i.name.includes(searchWord))   
      this.setState({items: searchedFor});
    } 
    else this.componentDidMount();
 };

 decimalCheck(pris, campaign){  // kontrollerar prisets decimaler. Samt, om det är rea, så stryk över det gamla priset.
  
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

 campaignPrice(pris, campaign){  // uppdaterar priset med procentsats
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

render(){

  if (!this.state.isLoaded) {
    return <div>Laddar...</div>;
  }
  else if(this.state.items.length === 0){
    return (
    <div className="App">
      <SearchBar onChange={this.inputHandler}/>
      <div className='noProd'>Tyvärr, Produkten Finns inte</div>
    </div>);
  }
  else if (this.state.items.length > 0){

    return (  
      <div className="App">
        <SearchBar onChange={this.inputHandler}/>
        
        <div id="displayOrder">
        
        
          {this.state.items.map((item, index) =>(

                <Link key={index}  to="/products" state={{id: item.id, url: this.baseUrl + item.productImage}} >
                
                  <div id="prodContainer">
                    <div id="innerProdDiv">
                        {this.renderCampaign(item.campaign)}

                            {this.getImages(this.state.baseUrl + item.productImage, item.productImage)}
                            <div className='fat'>{item.name}</div>
                            <div className='fat'>{this.decimalCheck(item.price, item.campaign)}</div> 
                            <div className='reaPris'>{this.campaignPrice(item.price, item.campaign)}</div>
                    </div>                   
                  </div>
                </Link>

        ))}
        </div>
      </div>
    );
  }
}
}

export default Home;