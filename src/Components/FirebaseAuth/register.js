import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import './register.css'

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: "",
        });
      }
      toast.success("User Registered Successfully!!", {
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="container-fluid bg-white d-flex justify-content-center align-items-center vh-100 register-bg">
      <div className="card card-color" style={{ width: "400px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4 text-white">Sign Up</h3>

          <form onSubmit={handleRegister}>
            {/* First Name Input */}
            <div className="mb-3">
              <label htmlFor="fname" className="form-label text-white">First Name</label>
              <input
                type="text"
                className="form-control"
                id="fname"
                placeholder="First Name"
                onChange={(e) => setFname(e.target.value)}
                required
              />
            </div>

            {/* Last Name Input */}
            <div className="mb-3">
              <label htmlFor="lname" className="form-label text-white">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lname"
                placeholder="Last Name"
                onChange={(e) => setLname(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>

            {/* Already Registered Link */}
            <div className="d-flex justify-content-between mt-3">
              <p className="mb-0 text-white">
                Already registered? <a href="/login" className="text-white">Login Here</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
