import React from "react";

const ContactUs = () => {
  return (
    <div id="contact-us" className="dark:bg-gray-700" style={contactUsStyle}>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or inquiries, feel free to get in touch with
        us!
      </p>
      <div style={contactDetailsStyle}>
        <p>
          <strong>Email:</strong> info@greenharvest.com
        </p>
        <p>
          <strong>Phone:</strong> 123-456-7890
        </p>
        <p>
          <strong>Address:</strong> 123 Green Harvest Lane, Organic City, OGN
          12345
        </p>
      </div>
    </div>
  );
};

const contactUsStyle = {
  padding: "20px",
  borderRadius: "5px",
  marginTop: "20px",
};

const contactDetailsStyle = {
  marginTop: "10px",
};

export default ContactUs;
