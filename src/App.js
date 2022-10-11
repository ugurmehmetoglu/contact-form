import React, { useEffect, useState } from "react";
import "./App.css";
import image from "./M93A6808.JPG";
import Compressor from 'compressorjs';



function App() {
  const [formInputs, setFormInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    phone: "",
    description: "",
    placement: "",
    size: "",
    style: "",
    skin: "",
    picture1: "",
    picture2: "",
    picture3: "",
    location: "",
    availability: "Available",
    availabledate: "",
  });
  const [defaultState, setDefaultState] = useState(false)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);


  const handleSubmit = (e) => {
    const {
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
      picture1,
      picture2,
      picture3,
      location,
      availability,
      availabledate,
    } = formInputs;
    e.preventDefault();

    const { REACT_APP_EMAIL, REACT_APP_URL } = process.env;
    setLoading(true);
    fetch(`${REACT_APP_URL}`, {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senderEmail: REACT_APP_EMAIL,
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
        picture1,
        picture2,
        picture3,
        location,
        availability,
        availabledate,
        date: new Date(),
      }),
    })
      .then((res) => {
        setSuccess(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
      });
  };

  const handlePicture = (event) => {
    let quality = 0.7;
    let maxWidth = 500;
    let files = event.target.files;
    let image = files[0];
    if (!image) {
      return;
    }
    if (event.target.name === 'picture1' || event.target.name === 'skin' || event.target.name === 'style') {
      quality = 1;
      maxWidth = 1000;
    }

    new Compressor(image, {
      quality: quality, // 0.6 can also be used, but its not recommended to go below.
      maxWidth: maxWidth,
      success: (compressedResult) => {
        // compressedResult has the compressed file.
        // Use the compressed file to upload the images to your server. 
        let reader = new FileReader();
        reader.readAsDataURL(compressedResult);
        reader.onload = (e) => {
          setFormInputs({
            ...formInputs,
            [event.target.name]: reader.result,
          });
        };
      },
    });

  };

  const handleChange = (e) => {
    setFormInputs({
      ...formInputs,
      [e.target.name]: e.target.value,
    });
    e.preventDefault();
  };
  useEffect(() => {
    setDefaultState(!defaultState)
  }, [formInputs.location, formInputs.availability])


  return (
    <div className="contact-form">
      <div className="contact-form-top">
        <img src={image} alt="" />
        <h2>Request Form</h2>
        <p>Ali Dundar</p>
        <hr />
      </div>
      <div className="contact-form-main">
        {success ? (
          <span className="success-message">
            Your Request Has Been Submitted Successfully! We will respond within
            48 hours! Thank you!!"
</span>
        ) : (
            <form action="" onSubmit={handleSubmit}>
              <div className="contact-name">
                <label htmlFor="name">
                  Name<span className="required">*</span>
                </label>
                <br />

                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                />
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                />
              </div>
              <div className="contact-age">
                <label htmlFor="Age">
                  Age<span className="required">*</span>
                </label>
                <br />
                <input
                  onChange={handleChange}
                  type="text"
                  name="age"
                  placeholder="Age"
                  required
                />
              </div>
              <div className="contact-email">
                <label htmlFor="email">
                  Email<span className="required">*</span>
                </label>
                <br />
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div className="contact-phone">
                <label htmlFor="phone">
                  Phone<span className="required">*</span>
                </label>
                <br />
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                />
              </div>
              <div className="contact-tattoo-description">
                <label htmlFor="description">
                  Tattoo Description<span className="required">*</span>
                </label>
                <br />
                <textarea
                  required
                  onChange={handleChange}
                  rows="8"
                  cols="50"
                  name="description"
                  placeholder="Tattoo Description"
                  maxLength="400"
                ></textarea>
              </div>
              <div className="contact-placement">
                <label htmlFor="name">
                  Placement<span className="required">*</span>
                </label>
                <br />
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="placement"
                  placeholder=""
                />
                <p>
                  (Please be specific as possible. "Inner forearm" rather than
                  just "forearm".)
</p>
              </div>

              <div className="contact-size">
                <label htmlFor="name">
                  Approximate Size<span className="required">*</span>
                </label>
                <br />
                <input
                  required
                  onChange={handleChange}
                  type="text"
                  name="size"
                  placeholder=""
                />
                <p>(Inches)</p>
              </div>
              <div className="contact-skin-picture">
                <label htmlFor="name">
                  Picture of Placement (YOUR Skin)
<span className="required">*</span>
                </label>
                <br />
                <input
                  required
                  onChange={handlePicture}
                  accept="image/png,image/jpeg"
                  type="file"
                  id="myFile"
                  name="skin"
                ></input>
              </div>
              <div className="contact-style-picture">
                <label htmlFor="name">
                  Style Reference <span className="required">*</span>
                </label>
                <br />
                <input
                  required
                  onChange={handlePicture}
                  accept="image/png,image/jpeg"
                  type="file"
                  id="myFile"
                  name="style"
                ></input>
                <p>
                  (Please attach a screenshot of one of my previous works' photo
                  as a reference.)
</p>
              </div>
              <div className="contact-availability">
                <label htmlFor="availability">
                  Availability<span className="required">*</span>
                </label>
                <br />
                <input
                  onChange={handleChange}
                  type="radio"
                  name="availability"
                  value="Available"
                  checked={formInputs.availability === 'Available'}
                ></input>
                <label htmlFor="availability">I have open availability</label>
                <br></br>
                <input
                  type="radio"
                  name="availability"
                  onChange={handleChange}
                  value="Specific dates"
                  checked={formInputs.availability === 'Specific dates'}
                  required
                ></input>
                <label htmlFor="availability">I have specific dates available</label>
                <br></br>

                <input
                  className="avaliabledate"
                  onChange={handleChange}
                  type="text"
                  name="availabledate"
                  style={{ display: formInputs.availability === 'Specific dates' ? "block" : "none" }}
                  placeholder="please write your available days"
                />
              </div>
              <div className="contact-photo-reference-1">
                <label htmlFor="name">
                  Photo Reference<span className="required">*</span>
                </label>
                <br />
                <input
                  required
                  onChange={handlePicture}
                  accept="image/png,image/jpeg"
                  type="file"
                  id="myFile"
                  name="picture1"
                ></input>
              </div>
              <div className="contact-photo-reference-2">
                <label htmlFor="name">Photo Reference</label>
                <br />
                <input
                  onChange={handlePicture}
                  accept="image/png,image/jpeg"
                  type="file"
                  id="myFile"
                  name="picture2"
                ></input>
              </div>
              <div className="contact-photo-reference-3">
                <label htmlFor="name">Photo Reference</label>
                <br />
                <input
                  onChange={handlePicture}
                  accept="image/png,image/jpeg"
                  type="file"
                  id="myFile"
                  name="picture3"
                ></input>
              </div>
              <div className="contact-travel">
                <label htmlFor="location">
                  Traveling or Local?<span className="required">*</span>
                </label>
                <br />
                <input type="radio" name="location" value="I live in/around LA" onChange={handleChange} checked={formInputs.location === "I live in/around LA"} required />
                <label htmlFor="location">I live in/around LA</label>
                <br></br>
                <input type="radio" name="location" value="I'm traveling to LA" onChange={handleChange} checked={formInputs.location === "I'm traveling to LA"} required />
                <label htmlFor="location">I'm traveling to LA</label>
                <br></br>
              </div>
              <div className="contact-submit">
                <input type="submit" value={loading ? "Sending..." : "Submit"} />
              </div>
              {error ? <span className="error-message">There has been an error. We are sorry for the inconvince. Please try again</span> : <></>}
            </form>
          )}
      </div>
    </div>
  );
}

export default App;