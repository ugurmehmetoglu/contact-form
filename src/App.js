import React, { useState } from 'react'
import './App.css';
import image from './IMG_3918.jpg'



function App() {

  const [formInputs, setFormInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    description: '',
    placement: '',
    size: '',
    skin: '',
    picture1: '',
    picture2: '',
    picture3: ''




  })

  const handleSubmit = (e) => {
    const {firstname,
      lastname,
      email,
      phone,
      description,
      placement,
      size,
      skin,
      picture1,
      picture2,
      picture3} = formInputs
    e.preventDefault();
    console.log(formInputs)
    fetch(
      "https://03unvo4g21.execute-api.us-east-1.amazonaws.com/sendEmail",
      {
        mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          phone,
          description,
          placement,
          size,
          skin,
          picture1,
          picture2,
          picture3,
          date: new Date(),
         
        }),
      }
    )
      .then((res) => console.log(res))
      .catch(err => console.log('error', err))
  };



  const handlePicture = (event) => {
   
    let files = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
  
    reader.onload = (e) => {
      setFormInputs({
        ...formInputs, [event.target.name]: reader.result,
      })


    }

  }
 
  const handlechange = (e) => {
    e.preventDefault();
    setFormInputs({
      ...formInputs, [e.target.name]: e.target.value,
    })
   
  }

  return (
    <div className="contact-form">
      <div className="contact-form-top">
        <img src={image} alt="" />
        <h2>Request Form</h2>
        <p>Ali Dundar</p>
        <hr />
      </div>
      <div className="contact-form-main">
        <form action="" onSubmit={handleSubmit}>
          <div className="contact-name">
            <label htmlFor="name">Name<span className="required">*</span></label>
            <br />

            <input onChange={handlechange} type="text" name="firstname" placeholder="First Name" />
            <input onChange={handlechange} type="text" name="lastname" placeholder="Last Name" />


          </div>
          <div className="contact-email">
            <label htmlFor="Email">Email<span className="required">*</span></label>
            <br />
            <input onChange={handlechange} type="text" name="email" placeholder="example@example.com" />
          </div>
          <div className="contact-phone">
            <label htmlFor="phone">Phone<span className="required">*</span></label>
            <br />
            <input onChange={handlechange} type="text" name="phone" placeholder="Phone Number" />

          </div>
          <div className="contact-tattoo-description">
            <label htmlFor="Message">Tattoo Description<span className="required">*</span></label>
            <br />
            <input onChange={handlechange} type="text" name="description" placeholder="" />

          </div>
          <div className="contact-placement">
            <label htmlFor="name">Placement<span className="required">*</span></label>
            <br />
            <input onChange={handlechange} type="text" name="placement" placeholder="" />
            <p>(Please be specific as possible. "Inner forearm" rather than just "forearm".)</p>


          </div>
          <div className="contact-size">
            <label htmlFor="name">Approximate Size<span className="required">*</span></label>
            <br />
            <input onChange={handlechange} type="text" name="size" placeholder="" />
            <p>(Inches)</p>
          </div>
          <div className="contact-skin-picture">
            <label htmlFor="name">Picture of Placement (YOUR Skin)<span className="required">*</span></label>
            <br />
            <input onChange={handlePicture} accept="application/image" type="file" id="myFile" name="skin"></input>
          </div>
          <div className="contact-availability">
            <label htmlFor="name">Availability<span className="required">*</span></label>
            <br />
            <input type="checkbox" name="checkbox1"></input>
            <label htmlFor="checkbox1">I have open availability</label><br></br>
            <input type="checkbox" name="checkbox2"></input>
            <label htmlFor="checkbox2">I have specific dates available</label><br></br>
          </div>
          <div className="contact-photo-reference-1">
            <label htmlFor="name">Photo Reference<span class="required">*</span></label>
            <br />
            <input onChange={handlePicture} type="file" id="myFile" name="picture1" ></input>

          </div>
          <div className="contact-photo-reference-2">
            <label htmlFor="name">Photo Reference</label>
            <br />
            <input onChange={handlePicture} type="file" id="myFile" name="picture2"></input>

          </div>
          <div className="contact-photo-reference-3">
            <label htmlFor="name">Photo Reference</label>
            <br />
            <input onChange={handlePicture} type="file" id="myFile" name="picture3"></input>

          </div>
          <div className="contact-travel">
            <label htmlFor="name">Traveling or Local?<span className="required">*</span></label>
            <br />
            <input type="checkbox" name="checkbox1"></input>
            <label htmlFor="checkbox1">I live in/around LA</label><br></br>
            <input type="checkbox" name="checkbox2"></input>
            <label htmlFor="checkbox2">I'm traveling to LA</label><br></br>
          </div>

          <div className="contact-submit">
            <input type="submit" value="Submit" />
          </div>

        </form>

      </div>


    </div>
  );
}

export default App;
