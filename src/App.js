import { Container, Grid, Item, Image, Button } from "semantic-ui-react";
import './App.css';
import React, { useState } from 'react';
import imageCompression from 'browser-image-compression'; 


function App() {

  const [originalImage, setOriginalImage] = useState("");         //This one is for original image
  const [originalImageFile, setOriginalImageFile] = useState(""); //This one is for original image

  const [compressedImage, setCompressedImage] = useState("");     //This one is for compressed image
  const [fileName, setFileName] = useState("");                   //This one is for compressed image

  const handle = (e) =>{
      const imageFile = e.target.files[0];
      setOriginalImage(imageFile);
      setOriginalImageFile(URL.createObjectURL(imageFile));
      setFileName(imageFile.name);
  };

  const handleCompressImage = (e) => {
    e.preventDefault();
    const options = {
      maxSizeMB:1,
      maxWidthOrHeight:500,
      useWebWorker: true
    }

    if(options.maxSizeMB >= originalImage/1024){
      alert('Image is too small,can not be compressed');
      return 0
    }

    let output;
    imageCompression(originalImage,options).then((x)=>{
      output = x;

      const downloadLink = URL.createObjectURL(output);
      setCompressedImage(downloadLink);   
    })

  };
  console.log(compressedImage);

  return (
    <div className="App">
      <h1>Image Compressor</h1>
    <Container>
      <Grid>
        <Grid.Column width={6}>
          <Item>
            {
              originalImageFile ? 
              (<img src={originalImageFile} />
                ) : (
                <Image src="https://www.photoshopessentials.com/newsite/wp-content/uploads/2018/08/resize-images-print-photoshop-f.jpg"></Image>)
            }
            
          </Item>
        </Grid.Column>
        <Grid.Column width={4}></Grid.Column>
        <input
          type="file"
          accept="image/*"
          className="mt-2 btn btn-dark w-75"
          onChange={(e) => handle(e)}
          />
          <h1></h1>
          {originalImageFile && <Button primary onClick={(e)=>{handleCompressImage(e);
          }}
          >
            {""}
            Compress Image</Button>}
        <h1></h1>
        {compressedImage && <Button primary>
          <a href={compressedImage} download={fileName}>
            {""}
            Download Image
          </a>
          </Button>}
        <Grid.Column width={6}>
        <Item>
        {
              compressedImage ? 
              // <img className="preview" src={previewImage} alt="" />
              (<img src={compressedImage}/>
                ) : (
                // <Image src="https://www.photoshopessentials.com/newsite/wp-content/uploads/2018/08/resize-images-print-photoshop-f.jpg"></Image>)
                <img src="https://www.photoshopessentials.com/newsite/wp-content/uploads/2018/08/resize-images-print-photoshop-f.jpg"  />)
            }
          </Item>
        </Grid.Column>
      </Grid>
    </Container>
    </div>
  );
}

export default App;
