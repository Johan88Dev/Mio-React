import React, {Component} from "react";

class ProdImage extends Component {
    
  constructor (props){
      super(props);
      this.state = { 
        baseUrl: 'https://www.mcdn.net',
        url: this.props.imageUrl, 
     }
    } 

  getImages(imageUrl){ 

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
        render() { 
            return this.getImages(this.state.baseUrl + this.state.url);
        }
}
export default ProdImage;