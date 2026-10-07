import { useState } from "react";
import "./PatientHome.css";

function PatientHome() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    concern: "",
    date: "",
    time: "",
    message: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://smart-clinic-backend-t8tf.onrender.com/api/appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to book appointment."
        );
      }

      setMessage(
        "✅ Appointment request submitted successfully!"
      );

      setFormData({
        name: "",
        phone: "",
        age: "",
        concern: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (error) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      title: "Acne Treatment",
      text: "Personalized treatment plans for acne, pimples and acne marks.",
      image:
        "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Hair & Scalp Care",
      text: "Professional evaluation and treatment for common hair and scalp concerns.",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Skin Rejuvenation",
      text: "Modern dermatology solutions to improve skin texture and appearance.",
      image:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="clinic-page">

      {/* NAVBAR */}
      <header className="clinic-navbar">
        <div className="clinic-logo">
          <span>Dr. Farhan's</span>
          <small>SKINCARE CLINIC</small>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#doctor">Doctor</a>
          <a href="#appointment">Appointment</a>
          <a href="#contact">Contact</a>
        </nav>

        <a
          href="#appointment"
          className="nav-button"
        >
          Book Appointment
        </a>
      </header>


      {/* HERO */}
      <section id="home" className="hero-section">

        <div className="hero-content">

          <span className="eyebrow">
            PROFESSIONAL DERMATOLOGY CARE
          </span>

          <h1>
            Healthy Skin.
            <br />
            Confident You.
          </h1>

          <p>
            Personalized dermatology care focused on
            healthier skin, hair and confidence.
          </p>

          <div className="hero-buttons">

            <a
              href="#appointment"
              className="primary-button"
            >
              Book an Appointment
            </a>

            <a
              href="#services"
              className="secondary-button"
            >
              Explore Services
            </a>

          </div>

          <div className="hero-trust">

            <div>
              <strong>10+</strong>
              <span>Services</span>
            </div>

            <div>
              <strong>Personalized</strong>
              <span>Care</span>
            </div>

            <div>
              <strong>Modern</strong>
              <span>Approach</span>
            </div>

          </div>

        </div>

        <div className="hero-image">

          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1000&q=85"
            alt="Dermatology doctor"
          />

          <div className="hero-card">
            <span>✦</span>
            <div>
              <strong>Expert Skin Care</strong>
              <small>Focused on your needs</small>
            </div>
          </div>

        </div>

      </section>


      {/* SERVICES */}
      <section id="services" className="services-section">

        <div className="section-heading">

          <span className="eyebrow">
            OUR SERVICES
          </span>

          <h2>
            Complete care for your
            <br />
            skin & hair
          </h2>

          <p>
            Treatment options designed around your
            individual concerns and goals.
          </p>

        </div>

        <div className="services-grid">

          {services.map((service) => (

            <article
              className="service-card"
              key={service.title}
            >

              <div className="service-image">

                <img
                  src={service.image}
                  alt={service.title}
                />

              </div>

              <div className="service-content">

                <h3>{service.title}</h3>

                <p>{service.text}</p>

                <a href="#appointment">
                  Book consultation →
                </a>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* DOCTOR */}
      <section id="doctor" className="doctor-section">

        <div className="doctor-image">

          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=900&q=85"
            alt="Doctor"
          />

        </div>

        <div className="doctor-content">

          <span className="eyebrow">
            MEET YOUR DOCTOR
          </span>

          <h2>
            Care that begins
            <br />
            with understanding.
          </h2>

          <p>
            Dr. Farhan's SkinCare Clinic focuses on
            understanding each patient's individual
            skin and hair concerns before recommending
            a treatment approach.
          </p>

          <p>
            Our goal is simple — provide thoughtful,
            personalized and comfortable dermatology care.
          </p>

          <div className="doctor-points">

            <div>
              <span>✓</span>
              Personalized consultation
            </div>

            <div>
              <span>✓</span>
              Individual treatment plans
            </div>

            <div>
              <span>✓</span>
              Patient-focused care
            </div>

          </div>

          <a
            href="#appointment"
            className="primary-button"
          >
            Schedule Consultation
          </a>

        </div>

      </section>


      {/* APPOINTMENT */}
      <section
        id="appointment"
        className="appointment-section"
      >

        <div className="appointment-intro">

          <span className="eyebrow">
            BOOK A VISIT
          </span>

          <h2>
            Take the first step
            <br />
            toward healthier skin.
          </h2>

          <p>
            Fill in your details and our clinic can
            review your appointment request.
          </p>

          <div className="appointment-note">
            <span>🔒</span>
            <div>
              <strong>Your information is private.</strong>
              <small>
                Your appointment details are sent securely
                to the clinic.
              </small>
            </div>
          </div>

        </div>


        <form
          className="appointment-form"
          onSubmit={handleSubmit}
        >

          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>

          </div>


          <div className="form-row">

            <div className="form-group">
              <label>Age</label>

              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Age"
                required
              />
            </div>

            <div className="form-group">
              <label>Concern</label>

              <select
                name="concern"
                value={formData.concern}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select concern
                </option>

                <option value="Acne Treatment">
                  Acne Treatment
                </option>

                <option value="Hair & Scalp Care">
                  Hair & Scalp Care
                </option>

                <option value="Skin Rejuvenation">
                  Skin Rejuvenation
                </option>

                <option value="Hair Fall">
                  Hair Fall
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

          </div>


          <div className="form-row">

            <div className="form-group">
              <label>Preferred Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Preferred Time</label>

              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select time
                </option>

                <option value="Morning">
                  Morning
                </option>

                <option value="Afternoon">
                  Afternoon
                </option>

                <option value="Evening">
                  Evening
                </option>

              </select>

            </div>

          </div>


          <div className="form-group">

            <label>Message</label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us briefly about your concern..."
              rows="4"
            />

          </div>


          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Request Appointment →"}
          </button>


          {message && (
            <div className="form-message">
              {message}
            </div>
          )}

        </form>

      </section>


      {/* CONTACT */}
      <section id="contact" className="contact-section">

        <div>
          <span className="eyebrow">
            VISIT THE CLINIC
          </span>

          <h2>
            Let's take care
            <br />
            of your skin.
          </h2>
        </div>

        <div className="contact-details">

          <div>
            <span>📍</span>
            <div>
              <strong>Clinic</strong>
              <p>
                Amravati, Maharashtra
              </p>
            </div>
          </div>

          <div>
            <span>📞</span>
            <div>
              <strong>Phone</strong>
              <p>
                Contact clinic for appointment
              </p>
            </div>
          </div>

          <div>
            <span>🕒</span>
            <div>
              <strong>Consultation</strong>
              <p>
                By appointment
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* FOOTER */}
      <footer className="clinic-footer">

        <div className="clinic-logo">
          <span>Dr. Farhan's</span>
          <small>SKINCARE CLINIC</small>
        </div>

        <p>
          © 2026 Dr. Farhan's SkinCare Clinic.
          All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default PatientHome;