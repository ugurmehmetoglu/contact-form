import React, { useState } from 'react'
import './App.css';
import image from './M93A6808.JPG'



function App() {

  const [formInputs, setFormInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    age: "",
    phone: '',
    description: '',
    placement: '',
    size: '',
    style: '',
    checkbox1:'',
    avaliabledate: '',
    skin: '',
    picture1: '',
    picture2: '',
    picture3: ''




  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)

  const [checked, setChecked] = useState(false);

  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    const { firstname,
      lastname,
      age,
      email,
      phone,
      description,
      placement,
      size,
      skin,
      style,
      checkbox1,
      avaliabledate,
      picture1,
      picture2,
      picture3 } = formInputs
    e.preventDefault();
    
    setLoading(true);
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
          age,
          email,
          phone,
          description,
          placement,
          size,
          skin,
          style,
          checkbox1,
          avaliabledate,
          picture1,
          picture2,
          picture3,
          date: new Date(),

        }),
      }
    )
      .then((res) => {

        setSuccess(true);
        setLoading(false)
        console.log(res)
        
        
        


      })
      .catch((err) => {
        setLoading(false);
        setError(true);


        console.log('error', err)
      })
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

  const handleChange = (e) => {
    e.preventDefault();
    setFormInputs({
      ...formInputs, [e.target.name]: e.target.value,
    })

  }


  const handleCheck = () => {
    console.log("it is checked")
    setChecked(!checked)
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

            <input required onChange={handleChange} type="text" name="firstname" placeholder="First Name" />
            <input required onChange={handleChange} type="text" name="lastname" placeholder="Last Name" />


          </div>
          <div className="contact-age">
            <label htmlFor="Age">Age<span className="required">*</span></label>
            <br />
            <input onChange={handleChange} type="text" name="age" placeholder="Age" />
          </div>
          <div className="contact-email">
            <label htmlFor="Email">Email<span className="required">*</span></label>
            <br />
            <input onChange={handleChange} type="text" name="email" placeholder="example@example.com" />
          </div>
          <div className="contact-phone">
            <label htmlFor="phone">Phone<span className="required">*</span></label>
            <br />
            <input required onChange={handleChange} type="text" name="phone" placeholder="Phone Number" />

          </div>
          <div className="contact-tattoo-description">
            <label htmlFor="Message">Tattoo Description<span className="required">*</span></label>
            <br />
            <input required onChange={handleChange} type="text" name="description" placeholder="" />

          </div>
          <div className="contact-placement">
            <label htmlFor="name">Placement<span className="required">*</span></label>
            <br />
            <input required onChange={handleChange} type="text" name="placement" placeholder="" />
            <p>(Please be specific as possible. "Inner forearm" rather than just "forearm".)</p>


          </div>

          <div className="contact-size">
            <label htmlFor="name">Approximate Size<span className="required">*</span></label>
            <br />
            <input required onChange={handleChange} type="text" name="size" placeholder="" />
            <p>(Inches)</p>
          </div>
          <div className="contact-skin-picture">
            <label htmlFor="name">Picture of Placement (YOUR Skin)<span className="required">*</span></label>
            <br />
            <input required onChange={handlePicture} accept="application/image" type="file" id="myFile" name="skin"></input>
          </div>
          <div className="contact-style-picture">
            <label htmlFor="name">Style Reference <span className="required">*</span></label>
            <br />
            <input required onChange={handlePicture} accept="application/image" type="file" id="myFile" name="style"></input>
            <p>(Please attach a screenshot of one of my previous works' photo as a reference.)</p>
          </div>
          <div className="contact-availability">
            <label htmlFor="name">Availability<span className="required">*</span></label>
            <br />
            <input onChange={handleChange} type="checkbox" name="checkbox1"></input>
            <label htmlFor="checkbox1">I have open availability</label><br></br>
            <input type="checkbox" name="checkbox2" onChange={handleCheck} ></input>
            <label htmlFor="checkbox2">I have specific dates available</label><br></br>

            <input className="avaliabledate"  onChange={handleChange} type="text" name="avaliabledate" style={{ display: checked ? "block" : "none" }} placeholder="please write your avaliable days" />
          </div>
          <div className="contact-photo-reference-1">
            <label htmlFor="name">Photo Reference<span class="required">*</span></label>
            <br />
            <input required onChange={handlePicture} type="file" id="myFile" name="picture1" ></input>

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
            <input type="checkbox" name="locationCheckbox1"></input>
            <label htmlFor="locationCheckbox1">I live in/around LA</label><br></br>
            <input type="checkbox" name="locationCheckbox2"></input>
            <label htmlFor="locationCheckbox2">I'm traveling to LA</label><br></br>
          </div>

          <div className="contact-submit">
            <input type="submit" value="Submit" />
            <span>{loading ? 
              "Loading..." : ""}</span>
            <span>
              {success ?
                "Your Request Has Been Submitted Successfully! We will respond within 48 hours! Thank you!!" : ""}

            </span>


          </div>

        </form>

      </div>


    </div>
  );
}

export default App;
