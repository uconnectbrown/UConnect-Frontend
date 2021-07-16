// import React from "react";
// import Cropper from "cropperjs";
// import "cropperjs/dist/cropper.min.css";
// import "./ImageCropper.css";

// class ImageCropper extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             imageDestination: ""
//         };
//         this.imageElement = React.createRef();
//     }

//     componentDidMount() {
//         const cropper = new Cropper(this.imageElement.current, {
//             zoomable: false,
//             scalable: false,
//             aspectRatio: 1,
//             crop: () => {
//                 const canvas = cropper.getCroppedCanvas();
//                 this.setState({ imageDestination: canvas.toDataURL("image/png") });
//             }
//         });
//     }

//     render() {
//         return (
//             <div>
//                 <div class="img-container">
//                     <img ref={this.imageElement} src={this.props.src} alt="Source" crossorigin />
//                 </div>
//                 {/* <img src={this.state.imageDestination} class="img-preview" alt="Destination" /> */}
//             </div>
//         );
//     }
// }

// export default ImageCropper;
